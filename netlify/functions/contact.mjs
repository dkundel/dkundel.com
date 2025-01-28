
import { Resend } from 'resend';

import fetch, {
  Headers,
  Request,
  Response,
} from 'node-fetch'

if (!globalThis.fetch) {
  globalThis.fetch = fetch
  globalThis.Headers = Headers
  globalThis.Request = Request
  globalThis.Response = Response
}

export const handler = async function(event, context) {
  // Check if the request is coming from a browser
  const isBrowser = event.headers['user-agent']?.includes('Mozilla') || 
                    event.headers['user-agent']?.includes('Chrome') || 
                    event.headers['user-agent']?.includes('Safari');
  
  // If it's a browser request, redirect to Rick Roll
  if (isBrowser) {
    return {
      statusCode: 302,
      headers: {
        Location: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      }
    };
  }
  
  // For POST requests (like curl), check auth and handle email
  if (event.httpMethod === 'POST') {
    // Get credentials from environment variables
    const expectedUsername = process.env.CONTACT_USERNAME;
    const expectedPassword = process.env.CONTACT_PASSWORD;
    const resendApiKey = process.env.RESEND_API_KEY;

    // Check if environment variables are set
    if (!expectedUsername || !expectedPassword) {
      return {
        statusCode: 500,
        body: 'Server configuration error: Missing authentication credentials'
      };
    }

    if (!resendApiKey) {
      return {
        statusCode: 500,
        body: 'Server configuration error: Missing Resend API key'
      };
    }

    // Get Authorization header
    const authHeader = event.headers.authorization || event.headers.Authorization;
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return {
        statusCode: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Contact API"'
        },
        body: 'Unauthorized'
      };
    }

    // Decode and verify credentials
    try {
      const base64Credentials = authHeader.split(' ')[1];
      const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
      const [username, password] = credentials.split(':');

      if (username === expectedUsername && password === expectedPassword) {
        // Parse the request body based on content type
        let params;
        const contentType = event.headers['content-type'] || '';
        
        if (contentType.includes('application/json')) {
          params = JSON.parse(event.body);
        } else if (contentType.includes('application/x-www-form-urlencoded')) {
          params = Object.fromEntries(new URLSearchParams(event.body));
        } else {
          return {
            statusCode: 400,
            body: 'Invalid content type. Please use application/json or application/x-www-form-urlencoded'
          };
        }

        // Validate required parameters
        const { From, Subject, Body } = params;
        if (!From || !Subject || !Body) {
          return {
            statusCode: 400,
            body: 'Missing required parameters. Please provide From, Subject, and Body'
          };
        }

        // Initialize Resend
        const resend = new Resend(resendApiKey);

        try {
          // Send email
          await resend.emails.send({
            from: 'contact@email.dominik.dev',
            to: 'hi@dkundel.com',
            replyTo: From,
            subject: `From ${From}: ${Subject}`,
            text: Body
          });

          return {
            statusCode: 200,
            headers: {
              'Content-Type': 'text/plain'
            },
            body: 'Ahoy! We sent an email to Dominik and he will get back to you :)'
          };
        } catch (error) {
          console.error('Resend API error:', error);
          return {
            statusCode: 500,
            body: 'Failed to send email'
          };
        }
      }
    } catch (error) {
      // Invalid base64 or malformed credentials
      console.error('Auth error:', error);
    }

    return {
      statusCode: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Contact API"'
      },
      body: 'Unauthorized'
    };
  }
  
  // For any other request method
  return {
    statusCode: 405,
    body: 'Method Not Allowed'
  };
}; 