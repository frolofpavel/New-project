/**
 * IndexNow submit for pavelfrolof.ru (Bing + Yandex).
 * Usage: node scripts/indexnow-submit.mjs
 */
const KEY = "5df4b29f827d4d28";
const HOST = "pavelfrolof.ru";
const BASE = `https://${HOST}`;

const urls = [
  `${BASE}/`,
  `${BASE}/ai-agenty/`,
  `${BASE}/ai-dlya-prodazh/`,
  `${BASE}/ai-avtomatizaciya-marketinga/`,
  `${BASE}/services/`,
  `${BASE}/blog/`,
  `${BASE}/blog/daydzhest-15-statey-ai-agenty/`,
  `${BASE}/blog/ai-agent-dlya-otdela-prodazh-za-30-dney/`,
  `${BASE}/blog/vnedrenie-ai-agenta-v-kompanii-poshagovo/`,
  `${BASE}/blog/nayti-ai-specialista-ili-vnedrenie-pod-klyuch/`,
  `${BASE}/blog/ai-agent-i-crm-minimalnye-integracii/`,
  `${BASE}/blog/kak-izmerit-roi-ai-agenta/`,
  `${BASE}/blog/oshibki-vnedreniya-ai-v-biznes/`,
  `${BASE}/blog/ai-agent-vs-chat-bot/`,
  `${BASE}/blog/skolko-stoit-vnedrenie-ai-agenta-2026/`,
  `${BASE}/blog/ai-agent-dlya-marketinga-pervyy-shag/`,
  `${BASE}/blog/rag-baza-znaniy-dlya-ai-agenta/`,
  `${BASE}/blog/ai-agent-152-fz-on-premise/`,
  `${BASE}/blog/ai-agent-dlya-hr-i-rekrutinga/`,
  `${BASE}/blog/kak-vybrat-podryadchika-ai-agentov/`,
  `${BASE}/blog/keys-kvalifikaciya-lidov-ai-agentom/`,
  `${BASE}/blog/ai-agenty-dlya-b2b-dlinnyy-cikl/`,
  `${BASE}/sitemap.xml`,
];

const endpoints = [
  "https://api.indexnow.org/indexnow",
  "https://yandex.com/indexnow",
  "https://www.bing.com/indexnow",
];

async function submit(endpoint) {
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: `${BASE}/${KEY}.txt`,
    urlList: urls,
  };
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  console.log(endpoint, res.status, text.slice(0, 200));
}

(async () => {
  for (const ep of endpoints) {
    try {
      await submit(ep);
    } catch (e) {
      console.log(ep, "ERR", e.message);
    }
  }
})();
