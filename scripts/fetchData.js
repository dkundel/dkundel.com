const {
  parse,
  defaultReplaceFunction,
  updateRelativeLinksFromBase,
} = require('about-json');
const got = require('got');
const { resolve, extname, relative } = require('path');
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
        const image = $('meta[property="og:image"]').attr('content');
        out.image = image;
        const localImageFile = localImageId + (extname(image) || '.jpg');

        const imageDownloadStream = got.stream(image);
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
