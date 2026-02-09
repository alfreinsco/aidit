/**
 * Client untuk Do AI Agent.
 * Di dev: request ke /api/agent (proxy Vite meneruskan ke Do AI + menambah Authorization).
 * Menghindari CORS 403 karena browser hanya hit same-origin.
 */

/** URL yang dipanggil browser: proxy (same-origin) atau backend kamu di production */
const getAgentUrl = (): string => {
  const explicit = import.meta.env.VITE_AGENT_API_URL as string | undefined;
  if (explicit) return explicit;
  return '/api/agent';
};

export async function callAgent(prompt: string): Promise<string> {
  const url = getAgentUrl();
  const isProxy = url === '/api/agent';

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (!isProxy) {
    const key = import.meta.env.VITE_DO_AGENT_KEY as string | undefined;
    if (key) headers.Authorization = `Bearer ${key}`;
  }

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      messages: [{ role: 'user', content: prompt }],
      stream: false,
    }),
    signal: AbortSignal.timeout(120_000),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Agent error ${res.status}: ${text}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== 'string') {
    throw new Error('Invalid response: missing choices[0].message.content');
  }
  return content;
}
