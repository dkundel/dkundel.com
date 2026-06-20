const { resolve, extname, relative, basename } = require('path');
const { createWriteStream } = require('fs');
const { mkdir, writeFile } = require('fs/promises');
const { Readable } = require('stream');
const { pipeline } = require('stream/promises');
const crypto = require('crypto');
const { glob } = require('glob');
const cheerio = require('cheerio');

const RAW_GITHUB = `https://raw.githubusercontent.com/dkundel/about-me`;
const PAGE_GITHUB = `https://github.com/dkundel/about-me/blob`;
const DATA_URL = `${RAW_GITHUB}/master/README.md`;
const OUTPUT = resolve(process.cwd(), 'data/about/dkundel.json');
const OUTPUT_MD = resolve(process.cwd(), 'data/dkundel-md.json');
const OUTPUT_IMAGES = resolve(process.cwd(), 'public/blog-headers/external/');

const sectionKeys = {
  '👨‍💻 Biography': 'biography',
  '🎤 Examples of Previous Talks': 'examplesOfPreviousTalks',
  '👥 Social Channels': 'socialChannels',
  '💬 Current Talk Topics': 'currentTalkTopics',
  '💻 Open Source Projects': 'openSourceProjects',
  '🗣 Past Presentations': 'pastPresentations',
  '✏️ Technical Writing': 'technicalWriting',
  '🌐 Online': 'online',
  '📰 Print': 'print',
};

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
      resp = await fetch(statusUrl, {
        headers: {
          'user-agent': userAgent,
        },
      });
    } catch (err) {
      continue;
    }

    if (!resp.ok) {
      continue;
    }

    const image = getPreviewImage(cheerio.load(await resp.text()));
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
  await mkdir(OUTPUT_IMAGES, { recursive: true });
  await writeFile(
    resolve(OUTPUT_IMAGES, localImageFile),
    createXArticlePreviewSvg(getEntryTitle(entry)),
    'utf8'
  );
  return '/blog-headers/external/' + localImageFile;
}

async function run() {
  const resp = await fetch(DATA_URL);
  if (!resp.ok) {
    console.error('Could not fetch data');
    process.exit(1);
  }
  const readme = await resp.text();

  const data = parseReadme(readme, { asHtml: true });
  const mdData = parseReadme(readme, { asHtml: false });

  data.technicalWriting.online._listExtended = await Promise.all(
    data.technicalWriting.online._list.map(async entry => {
      const out = {
        html: entry,
      };
      const url = entry.match(/href="(.+?)"/)[1];
      out.url = url;
      const localImageId = getLocalImageFileName(url);

      const existingImageResults = await glob(
        OUTPUT_IMAGES + '/' + localImageId + '.*'
      );

      if (existingImageResults.length < 1) {
        const resp = await fetch(url);
        if (!resp.ok) {
          throw new Error(`Unable to fetch ${url}: ${resp.status}`);
        }
        const $ = cheerio.load(await resp.text());
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

        const imageResponse = await fetch(imageUrl);
        if (!imageResponse.ok || !imageResponse.body) {
          return out;
        }
        await mkdir(OUTPUT_IMAGES, { recursive: true });
        const imageWriteStream = createWriteStream(
          OUTPUT_IMAGES + '/' + localImageFile
        );
        await pipeline(Readable.fromWeb(imageResponse.body), imageWriteStream);
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

function parseReadme(markdown, { asHtml }) {
  const [rawHeader] = markdown.split(/\n---\n/);
  const lines = markdown.split(/\r?\n/);
  const root = { _raw: rawHeader.trim() };
  const stack = [{ depth: 1, value: root }];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const heading = line.match(/^(#{2,3})\s+(.+)$/);

    if (!heading) {
      continue;
    }

    const depth = heading[1].length;
    const title = heading[2].trim();
    const key = sectionKeys[title];
    if (!key) {
      continue;
    }

    while (stack.length > 0 && stack[stack.length - 1].depth >= depth) {
      stack.pop();
    }

    const section = { _heading: title };
    stack[stack.length - 1].value[key] = section;
    stack.push({ depth, value: section });

    const body = [];
    index += 1;
    while (index < lines.length && !/^#{2,3}\s+/.test(lines[index])) {
      body.push(lines[index]);
      index += 1;
    }
    index -= 1;

    populateSection(section, body, { asHtml });
  }

  return root;
}

function populateSection(section, lines, { asHtml }) {
  const paragraphs = getParagraphs(lines, { asHtml });
  if (paragraphs.length > 0) {
    section._paragraphs = paragraphs;
  }

  const list = getListItems(lines, { asHtml });
  if (list.length > 0) {
    section._list = list;
  }

  const entries = getTableEntries(lines, { asHtml });
  if (entries.length > 0) {
    section._entries = entries;
  }
}

function getParagraphs(lines, { asHtml }) {
  const paragraphs = [];
  let pending = [];

  for (const line of lines) {
    if (line.trim() === '') {
      flush();
      continue;
    }

    if (isListItem(line) || isTableLine(line) || isTableDivider(line)) {
      flush();
      continue;
    }

    pending.push(line.trim());
  }
  flush();

  return paragraphs;

  function flush() {
    if (pending.length === 0) {
      return;
    }
    paragraphs.push(formatInline(pending.join(' '), { asHtml }));
    pending = [];
  }
}

function getListItems(lines, { asHtml }) {
  return lines
    .filter(isListItem)
    .map(line => formatInline(line.replace(/^-\s+/, ''), { asHtml }));
}

function getTableEntries(lines, { asHtml }) {
  return lines
    .filter(line => isTableLine(line) && !isTableDivider(line))
    .map(line => {
      const [event, location, date, topic, other] = line
        .replace(/^\|/, '')
        .replace(/\|$/, '')
        .split('|')
        .map(cell => formatInline(cell.trim(), { asHtml }));

      return { event, location, date, topic, other };
    })
    .filter(entry => entry.event !== 'Event');
}

function isListItem(line) {
  return /^-\s+/.test(line);
}

function isTableLine(line) {
  return /^\|/.test(line.trim());
}

function isTableDivider(line) {
  return /^\|\s*-+/.test(line.trim());
}

function formatInline(value, { asHtml }) {
  let output = value
    .replace(/:octocat:/g, '🐙🐱')
    .replace(/&nbsp;/g, ' ');

  output = unescapeMarkdown(output);

  output = output.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, href) => {
    const url = linkMarkdownToGitHub(href);
    return asHtml ? `<a href="${url}">${text}</a>` : `[${text}](${url})`;
  });

  return output;
}

function unescapeMarkdown(value) {
  return value.replace(/\\([\\`*{}\[\]()#+\-.!_>])/g, '$1');
}

function linkMarkdownToGitHub(url) {
  let output = url;
  if (!/^[a-z]+:/i.test(output)) {
    output = new URL(output, DATA_URL).toString();
  }
  if (output.endsWith('.md') && output.startsWith(RAW_GITHUB)) {
    output = output.replace(RAW_GITHUB, PAGE_GITHUB);
  }
  return output;
}

run();
