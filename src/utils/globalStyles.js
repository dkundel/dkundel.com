import { purpleShades } from 'anker-colors';
import { createGlobalStyle } from 'styled-components';
import tw from 'tailwind.macro';

export default createGlobalStyle`
  html {
    height: 100%;
    width: 100%;
    min-height: 100vh;
    min-width: 250px;
    ${tw`font-sans`}
  }

  body, #___gatsby {
    height: 100%;
    width: 100%;
  }

  a {
    color: ${purpleShades['300']};
    text-decoration: none;
    &:hover, &:focus {
      color: ${purpleShades['700']};
      text-decoration: underline;
    }
  }



  h1 {
    ${tw`font-light `}
  }
`;
