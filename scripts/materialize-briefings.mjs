import { createDecipheriv } from 'node:crypto';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';

export function materialize(encrypted, key, root) {
  if (!/^[a-f0-9]{64}$/.test(key ?? '')) throw new Error('A valid BRIEFINGS_KEY is required');
  const decipher = createDecipheriv('aes-256-gcm', Buffer.from(key, 'hex'), Buffer.from(encrypted.iv, 'hex'));
  decipher.setAuthTag(Buffer.from(encrypted.tag, 'hex'));
  const packet = JSON.parse(Buffer.concat([decipher.update(Buffer.from(encrypted.data, 'base64')), decipher.final()]).toString());
  if (!/^[a-z0-9-]+$/.test(packet.slug)) throw new Error('Invalid report path');
  const base = resolve(root, packet.slug);
  const entries = Object.entries(packet.files).map(([name, data]) => {
    const target = resolve(base, name);
    if (!target.startsWith(base + '/')) throw new Error('Invalid asset path');
    return [target, Buffer.from(data, 'base64')];
  });
  for (const [target, bytes] of entries) {
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, bytes);
  }
  console.log(`Prepared ${entries.length} unlisted report assets.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const key = process.env.BRIEFINGS_KEY;
  if (!key) {
    if (process.env.VERCEL_ENV === 'production') throw new Error('BRIEFINGS_KEY is required for production');
    console.log('Skipping unlisted reports: BRIEFINGS_KEY is not configured.');
  } else {
    materialize(JSON.parse(readFileSync(new URL('../private-content/briefings.enc.json', import.meta.url))), key, resolve('public/briefings'));
  }
}
