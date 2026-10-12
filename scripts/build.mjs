import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'dist');

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

const index = await readFile(path.join(root, 'index.html'), 'utf8');
await writeFile(path.join(out, 'index.html'), index, 'utf8');
await cp(path.join(root, 'src', 'app.js'), path.join(out, 'app.js'));
await cp(path.join(root, 'src', 'styles.css'), path.join(out, 'styles.css'));
await cp(path.join(root, 'public', 'assets'), path.join(out, 'assets'), { recursive: true });
await cp(path.join(root, 'data'), path.join(out, 'data'), { recursive: true });

console.log(`Built RATA into ${out}`);
