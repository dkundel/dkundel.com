const {
  parse,
  defaultReplaceFunction,
  updateRelativeLinksFromBase,
} = require('about-json');
const got = require('got');
const { resolve } = require('path');
const { writeFile: fsWriteFile } = require('fs');
const { promisify } = require('util');
const cheerio = require('cheerio');

const writeFile = promisify(fsWriteFile);

const RAW_GITHUB = `https://raw.githubusercontent.com/dkundel/about-me`;
const PAGE_GITHUB = `https://github.com/dkundel/about-me/blob`;
const DATA_URL = `${RAW_GITHUB}/master/README.md`;
const OUTPUT = resolve(process.cwd(), 'data/about/dkundel.json');
const OUTPUT_MD = resolve(process.cwd(), 'data/dkundel-md.json');

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
      const resp = await got(url);
      const $ = cheerio.load(resp.body);
      const image = $('meta[property="og:image"]').attr('content');
      out.image = image;
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
