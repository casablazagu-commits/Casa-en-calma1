import { getStore } from '@netlify/blobs';

export default async (req) => {
  const headers = { 'content-type': 'application/json', 'cache-control': 'no-store', 'access-control-allow-origin': '*' };
  const url = new URL(req.url);
  const code = (url.searchParams.get('code') || '').replace(/[^A-Z0-9]/gi, '').toUpperCase();
  if (code.length < 4) return new Response(JSON.stringify({ error: 'Código familiar no válido' }), { status: 400, headers });
  const store = getStore({ name: 'casa-en-calma-family', consistency: 'strong' });
  const key = 'family-' + code;
  if (req.method === 'GET') {
    const data = await store.get(key, { type: 'json' });
    return new Response(JSON.stringify(data || {}), { headers });
  }
  if (req.method === 'POST') {
    const body = await req.json();
    await store.setJSON(key, { data: body.data, stamp: body.stamp || Date.now() });
    return new Response(JSON.stringify({ ok: true }), { headers });
  }
  return new Response('Method not allowed', { status: 405 });
};
