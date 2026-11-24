import { mkdir, realpath, rm, stat, writeFile } from 'fs/promises';
import path from 'path';

const IMAGE_TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/avif': 'avif',
};

export function policeStorageRoot() {
  return process.env.POLICE_CHECK_STORAGE || 'C:\\xampp\\htdocs\\bansal-immigration\\storage\\app';
}

export async function savePublicImage(file: File, folder: 'blog' | 'success-stories') {
  if (!file || file.size === 0) return null;
  if (file.size > 5 * 1024 * 1024) throw new Error('Image must be 5 MB or smaller.');
  const ext = IMAGE_TYPES[file.type];
  if (!ext) throw new Error('Use a JPG, PNG, WEBP, GIF, or AVIF image.');
  const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const dir = path.join(process.cwd(), 'public', 'img', folder);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
  return folder === 'blog' ? name : `/img/success-stories/${name}`;
}

export async function savePublicPdf(file: File, folder: 'blog' | 'success-stories') {
  if (!file || file.size === 0) return null;
  if (file.size > 8 * 1024 * 1024) throw new Error('PDF must be 8 MB or smaller.');
  if (file.type !== 'application/pdf') throw new Error('The document must be a PDF.');
  const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.pdf`;
  const dir = path.join(process.cwd(), 'public', 'docs', folder);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
  return `/docs/${folder}/${name}`;
}

async function rootPath() {
  const root = policeStorageRoot();
  try {
    return await realpath(/*turbopackIgnore: true*/ root);
  } catch {
    return path.resolve(/*turbopackIgnore: true*/ root);
  }
}

function insideRoot(root: string, target: string) {
  const rel = path.relative(root, target);
  return rel !== '' && !rel.startsWith('..') && !path.isAbsolute(rel);
}

export async function resolvePoliceFile(relativePath: string) {
  if (!relativePath || relativePath.includes('\0')) return null;
  const root = await rootPath();
  const target = path.resolve(root, relativePath);
  if (!insideRoot(root, target)) return null;
  try {
    const real = await realpath(/*turbopackIgnore: true*/ target);
    if (!insideRoot(root, real)) return null;
    const info = await stat(real);
    if (!info.isFile()) return null;
    return real;
  } catch {
    return null;
  }
}

export async function removePoliceDirectory(kind: 'afp' | 'indian', reference: string) {
  if (!/^[A-Za-z0-9_-]+$/.test(reference)) return;
  const root = await rootPath();
  const folder = kind === 'afp' ? 'afp-applications' : 'indian-police-applications';
  const target = path.resolve(root, folder, reference);
  if (!insideRoot(root, target)) return;
  await rm(target, { recursive: true, force: true });
}
