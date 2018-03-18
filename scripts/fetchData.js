const {
  parse,
  defaultReplaceFunction,
  updateRelativeLinksFromBase,
} = require('about-json');
const got = require('got');
const { resolve } = require('path');
const { writeFile: fsWriteFile } = require('fs');
const { promisify } = require('util');

const writeFile = promisify(fsWriteFile);

const RAW_GITHUB = `https://raw.githubusercontent.com/dkundel/about-me`;
const PAGE_GITHUB = `https://github.com/dkundel/about-me/blob`;
const DATA_URL = `${RAW_GITHUB}/master/README.md`;
const OUTPUT = resolve(process.cwd(), 'data/about/dkundel.json');

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

  writeFile(OUTPUT, JSON.stringify(data), 'utf8');
}

function linkMarkdownToGitHub(url) {
  url = updateRelativeLinksFromBase(DATA_URL, url);
  if (url.endsWith('.md') && url.startsWith(RAW_GITHUB)) {
    url = url.replace(RAW_GITHUB, PAGE_GITHUB);
  }
  return url;
}

run();
