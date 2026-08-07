import { access, readdir, readFile, stat } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';

const root = resolve(process.cwd(), 'dist');
const htmlFiles = [];
const assets = [];
const errors = [];
const referencedJavaScript = new Set();

await walk(root);

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const relativeFile = file.slice(root.length + 1);
  const mainCount = (html.match(/<main\b/gi) || []).length;

  if (mainCount !== 1) {
    errors.push(`${relativeFile}: expected one <main>, found ${mainCount}`);
  }
  if (!/<h1\b/i.test(html)) {
    errors.push(`${relativeFile}: missing <h1>`);
  }

  const references = [...html.matchAll(/(?:href|src)=["']([^"']+)["']/gi)]
    .map(match => match[1])
    .filter(value => value.startsWith('/') && !value.startsWith('//'));

  for (const reference of references) {
    const cleanPath = reference.split(/[?#]/)[0];
    if (!cleanPath || cleanPath === '/contact') continue;
    if (cleanPath.endsWith('.js')) referencedJavaScript.add(cleanPath);
    if (!(await localTargetExists(cleanPath))) {
      errors.push(`${relativeFile}: missing local target ${cleanPath}`);
    }
  }
}

const oversizedGif = assets.find(
  asset => extname(asset.path).toLowerCase() === '.gif' && asset.size > 6_000_000
);
if (oversizedGif) {
  errors.push(
    `${oversizedGif.path.slice(root.length + 1)}: GIF exceeds the 6 MB performance budget`
  );
}

const javascriptBytes = assets
  .filter(asset => {
    if (extname(asset.path).toLowerCase() !== '.js') return false;
    const publicPath = `/${asset.path.slice(root.length + 1).replaceAll('\\', '/')}`;
    return referencedJavaScript.has(publicPath);
  })
  .reduce((total, asset) => total + asset.size, 0);
if (javascriptBytes > 100_000) {
  errors.push(`JavaScript budget exceeded: ${javascriptBytes} bytes (limit: 100000)`);
}

if (errors.length > 0) {
  console.error(`Site checks failed:\n- ${errors.join('\n- ')}`);
  process.exit(1);
}

console.log(
  `Site checks passed: ${htmlFiles.length} HTML pages, ${javascriptBytes} bytes of JavaScript.`
);

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await walk(path);
      continue;
    }
    const info = await stat(path);
    assets.push({ path, size: info.size });
    if (entry.name.endsWith('.html')) htmlFiles.push(path);
  }
}

async function localTargetExists(urlPath) {
  const relativePath = urlPath.replace(/^\/+/, '');
  const candidates = [
    join(root, relativePath),
    join(root, relativePath, 'index.html'),
    join(root, `${relativePath}.html`),
  ];

  for (const candidate of candidates) {
    try {
      await access(candidate);
      return true;
    } catch {
      // Try the next generated-file shape.
    }
  }

  return false;
}
