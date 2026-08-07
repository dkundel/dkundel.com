import { readFile } from 'node:fs/promises';
import { extname, resolve } from 'node:path';

const metadataCache = new Map();

export default function rehypePerformanceImages() {
  return async tree => {
    const images = [];
    visit(tree, images);
    await Promise.all(images.map(addDimensions));
  };
}

function visit(node, images) {
  if (!node || typeof node !== 'object') return;

  if (node.type === 'element' && node.tagName === 'img') {
    node.properties ||= {};
    node.properties.loading ||= 'lazy';
    node.properties.decoding ||= 'async';
    images.push(node);
  }

  if (Array.isArray(node.children)) {
    node.children.forEach(child => visit(child, images));
  }
}

async function addDimensions(node) {
  if (node.properties.width && node.properties.height) return;

  const source = node.properties.src;
  if (typeof source !== 'string' || !source.startsWith('/') || source.startsWith('//')) {
    return;
  }

  const publicPath = resolve(process.cwd(), 'public', source.replace(/^\/+/, ''));
  let metadataPromise = metadataCache.get(publicPath);

  if (!metadataPromise) {
    metadataPromise = readDimensions(publicPath);
    metadataCache.set(publicPath, metadataPromise);
  }

  const dimensions = await metadataPromise;
  if (!dimensions) return;
  node.properties.width ||= dimensions.width;
  node.properties.height ||= dimensions.height;
}

async function readDimensions(path) {
  try {
    const buffer = await readFile(path);
    const extension = extname(path).toLowerCase();

    if (extension === '.png' && buffer.length >= 24) {
      return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
    }

    if (extension === '.gif' && buffer.length >= 10) {
      return { width: buffer.readUInt16LE(6), height: buffer.readUInt16LE(8) };
    }

    if (extension === '.jpg' || extension === '.jpeg') {
      return readJpegDimensions(buffer);
    }

    if (extension === '.svg') {
      const svg = buffer.toString('utf8', 0, Math.min(buffer.length, 4096));
      const width = Number(svg.match(/\bwidth=["']([\d.]+)/i)?.[1]);
      const height = Number(svg.match(/\bheight=["']([\d.]+)/i)?.[1]);
      return width && height ? { width, height } : undefined;
    }
  } catch {
    return undefined;
  }

  return undefined;
}

function readJpegDimensions(buffer) {
  let offset = 2;
  while (offset + 8 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);
    if (marker >= 0xc0 && marker <= 0xc3) {
      return {
        height: buffer.readUInt16BE(offset + 5),
        width: buffer.readUInt16BE(offset + 7),
      };
    }
    if (length < 2) break;
    offset += length + 2;
  }
  return undefined;
}
