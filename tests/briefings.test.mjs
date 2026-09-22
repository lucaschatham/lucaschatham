import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createCipheriv, randomBytes } from 'node:crypto';
import { materialize } from '../scripts/materialize-briefings.mjs';

function encrypt(value, key) {
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', Buffer.from(key, 'hex'), iv);
  const data = Buffer.concat([cipher.update(JSON.stringify(value)), cipher.final()]);
  return { iv: iv.toString('hex'), tag: cipher.getAuthTag().toString('hex'), data: data.toString('base64') };
}
test('encrypted briefings require the correct key and preserve file bytes', () => {
  const root = mkdtempSync(join(tmpdir(), 'briefing-test-'));
  const key = randomBytes(32).toString('hex');
  const packet = { slug: 'sample-report', files: { 'business.html': Buffer.from('report').toString('base64'), 'sources/data.json': Buffer.from('{}').toString('base64') } };
  const encrypted = encrypt(packet, key);
  assert.throws(() => materialize(encrypted, randomBytes(32).toString('hex'), root));
  assert.equal(existsSync(join(root, packet.slug)), false);
  materialize(encrypted, key, root);
  assert.equal(readFileSync(join(root, packet.slug, 'business.html'), 'utf8'), 'report');
  assert.equal(readFileSync(join(root, packet.slug, 'sources/data.json'), 'utf8'), '{}');
});
test('rejects paths outside the report directory', () => {
  const root = mkdtempSync(join(tmpdir(), 'briefing-test-'));
  const key = randomBytes(32).toString('hex');
  assert.throws(() => materialize(encrypt({ slug: 'sample', files: { '../outside': 'eA==' } }, key), key, root));
  assert.throws(() => materialize(encrypt({ slug: '../outside', files: {} }, key), key, root));
});
