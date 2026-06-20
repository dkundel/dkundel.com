const {
  parse,
  defaultReplaceFunction,
  updateRelativeLinksFromBase,
} = require('about-json');
const got = require('got');
const { resolve, extname, relative, basename } = require('path');
const { writeFile: fsWriteFile, createWriteStream } = require('fs');
const stream = require('stream');
const crypto = require('crypto');
const globLib = require('glob');
const { promisify } = require('util');
const cheerio = require('cheerio');

const writeFile = promisify(fsWriteFile);
const pipeline = promisify(stream.pipeline);
const glob = promisify(globLib);

const RAW_GITHUB = `https://raw.githubusercontent.com/dkundel/about-me`;
const PAGE_GITHUB = `https://github.com/dkundel/about-me/blob`;
const DATA_URL = `${RAW_GITHUB}/master/README.md`;
const OUTPUT = resolve(process.cwd(), 'data/about/dkundel.json');
const OUTPUT_MD = resolve(process.cwd(), 'data/dkundel-md.json');
const OUTPUT_IMAGES = resolve(process.cwd(), 'public/blog-headers/external/');

function getLocalImageFileName(baseUrl) {
  return crypto
    .createHash('sha256')
    .update(baseUrl)
    .digest('hex');
}

function getPreviewImage($) {
  return (
    $('meta[property="og:image"]').attr('content') ||
    $('meta[property="og:image:url"]').attr('content') ||
    $('meta[property="og:image:secure_url"]').attr('content') ||
    $('meta[name="twitter:image"]').attr('content') ||
    $('meta[property="twitter:image"]').attr('content') ||
    $('meta[name="twitter:image:src"]').attr('content')
  );
}

function isXArticleUrl(rawUrl) {
  try {
    const url = new URL(rawUrl);
    return (
      ['x.com', 'www.x.com', 'twitter.com', 'www.twitter.com'].includes(
        url.hostname
      ) && /^\/(?:i\/article|[^/]+\/article)\/\d+\/?$/.test(url.pathname)
    );
  } catch (err) {
    return false;
  }
}

function isGenericXPreviewImage(rawUrl) {
  try {
    const url = new URL(rawUrl);
    return (
      url.hostname === 'abs.twimg.com' &&
      url.pathname.includes('/rweb/ssr/default/') &&
      url.pathname.endsWith('/og/image.png')
    );
  } catch (err) {
    return false;
  }
}

function getXArticleStatusUrl(rawUrl) {
  try {
    const url = new URL(rawUrl);
    const match = url.pathname.match(/^\/([^/]+)\/article\/(\d+)\/?$/);

    if (!match) {
      return undefined;
    }

    const [, screenName, tweetId] = match;
    return `https://x.com/${screenName}/status/${tweetId}`;
  } catch (err) {
    return undefined;
  }
}

async function getXArticleStatusPreviewImage(rawUrl) {
  const statusUrl = getXArticleStatusUrl(rawUrl);
  if (!statusUrl) {
    return undefined;
  }

  for (const userAgent of [
    'Twitterbot/1.0',
    'Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)',
  ]) {
    let resp;
    try {
      resp = await got(statusUrl, {
        headers: {
          'user-agent': userAgent,
        },
        throwHttpErrors: false,
      });
    } catch (err) {
      continue;
    }

    if (resp.statusCode >= 400) {
      continue;
    }

    const image = getPreviewImage(cheerio.load(resp.body));
    if (image && !isGenericXPreviewImage(image)) {
      return new URL(image, statusUrl).toString();
    }
  }

  return undefined;
}

function getImageFileExtension(imageUrl) {
  const ext = extname(new URL(imageUrl).pathname);
  return (ext ? ext.replace(/:.+$/, '') : '') || '.jpg';
}

function getEntryTitle(entry) {
  return cheerio.load(entry)('a').first().text().trim();
}

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function wrapText(value, maxLineLength = 34, maxLines = 4) {
  const words = value.replace(/\s+/g, ' ').trim().split(' ');
  const lines = [];
  let line = '';

  words.forEach(word => {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxLineLength && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  });

  if (line) {
    lines.push(line);
  }

  if (lines.length > maxLines) {
    lines.length = maxLines;
    lines[maxLines - 1] = `${lines[maxLines - 1].replace(/[.。]+$/, '')}...`;
  }

  return lines;
}

function createXArticlePreviewSvg(title) {
  const safeTitle = title || 'X Article';
  const lines = wrapText(safeTitle)
    .map(
      (line, idx) =>
        `<tspan x="96" dy="${idx === 0 ? 0 : 82}">${escapeXml(line)}</tspan>`
    )
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${escapeXml(
    safeTitle
  )}">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#101820"/>
      <stop offset="0.55" stop-color="#172333"/>
      <stop offset="1" stop-color="#111111"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <path d="M0 505C175 456 334 455 477 502c172 56 344 44 516-37 84-40 153-61 207-65v230H0Z" fill="#1d9bf0" opacity="0.18"/>
  <text x="96" y="126" fill="#8ecdf8" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="700" letter-spacing="4">X ARTICLE</text>
  <text x="96" y="246" fill="#f7f9f9" font-family="Inter, Arial, sans-serif" font-size="66" font-weight="800">${lines}</text>
  <text x="96" y="548" fill="#8b98a5" font-family="Inter, Arial, sans-serif" font-size="30">dkundel on X</text>
  <text x="1040" y="548" fill="#f7f9f9" font-family="Arial, sans-serif" font-size="96" font-weight="800">X</text>
</svg>`;
}

async function writeXArticlePreview(localImageId, entry) {
  const localImageFile = `${localImageId}.svg`;
  await writeFile(
    resolve(OUTPUT_IMAGES, localImageFile),
    createXArticlePreviewSvg(getEntryTitle(entry)),
    'utf8'
  );
  return '/blog-headers/external/' + localImageFile;
}

async function run() {
  const resp = await got(DATA_URL);
  if (resp.statusCode !== 200) {
    console.error('Could not fetch data');
    process.exit(1);
  }

  const data = parse(resp.body, {
    asHtml: true,
    updateRelativeLinks: linkMarkdownToGitHub,
  });
  const mdData = parse(resp.body, {
    asHtml: false,
    updateRelativeLinks: linkMarkdownToGitHub,
  });

  data.technicalWriting.online._listExtended = await Promise.all(
    data.technicalWriting.online._list.map(async entry => {
      const out = {
        html: entry,
      };
      const url = entry.match(/href="(.+)"/)[1];
      out.url = url;
      const localImageId = getLocalImageFileName(url);

      const existingImageResults = await glob(
        OUTPUT_IMAGES + '/' + localImageId + '.*'
      );

      if (existingImageResults.length < 1) {
        const resp = await got(url);
        const $ = cheerio.load(resp.body);
        let image = getPreviewImage($);

        if (
          isXArticleUrl(url) &&
          (!image || isGenericXPreviewImage(new URL(image, url).toString()))
        ) {
          image = await getXArticleStatusPreviewImage(url);
        }

        if (!image) {
          if (isXArticleUrl(url)) {
            out.image = await writeXArticlePreview(localImageId, entry);
          }
          return out;
        }

        const imageUrl = new URL(image, url).toString();
        if (isGenericXPreviewImage(imageUrl)) {
          return out;
        }

        const localImageFile =
          localImageId + getImageFileExtension(imageUrl);

        const imageDownloadStream = got.stream(imageUrl);
        const imageWriteStream = createWriteStream(
          OUTPUT_IMAGES + '/' + localImageFile
        );
        await pipeline(imageDownloadStream, imageWriteStream);
        out.image = '/blog-headers/external/' + localImageFile;
      } else {
        out.image =
          '/blog-headers/external/' +
          relative(OUTPUT_IMAGES, existingImageResults[0]);
      }

      if (out.url.startsWith('https://moin.world')) {
        out.url = '/blog/' + basename(out.url);
        out.html = out.html.replace(/href="(.*?)"/, `href="${out.url}"`);
      }

      return out;
    })
  );

  return Promise.all([
    writeFile(OUTPUT, JSON.stringify(data), 'utf8'),
    writeFile(OUTPUT_MD, JSON.stringify(mdData), 'utf8'),
  ]);
}

function linkMarkdownToGitHub(url) {
  url = updateRelativeLinksFromBase(DATA_URL, url);
  if (url.endsWith('.md') && url.startsWith(RAW_GITHUB)) {
    url = url.replace(RAW_GITHUB, PAGE_GITHUB);
  }
  return url;
}

run();
