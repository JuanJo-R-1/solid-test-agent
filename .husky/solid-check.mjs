import { execSync } from 'node:child_process';

const URL = process.env.SOLID_WEBHOOK_URL;
const TOKEN = process.env.SOLID_TOKEN;
if (!URL) process.exit(0);

const re = /(\/models\/|\/interfaces\/|\.model\.(ts|js)$|\.interface\.(ts|js)$)/i;
const files = execSync('git diff --cached --name-only --diff-filter=ACM', { encoding: 'utf8' })
  .split('\n').filter(f => f && re.test(f));
if (!files.length) process.exit(0);

const diff = execSync(`git diff --cached -U3 -- ${files.map(f => `"${f}"`).join(' ')}`,
  { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 }).slice(0, 12000);


async function main() {
  try {
    const res = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
      body: JSON.stringify({ files, diff }),
      signal: AbortSignal.timeout(30000),
    });
    const r = await res.json();

    if (!res.ok || r.cumple === undefined) {
      console.warn('⚠️ Respuesta inesperada de n8n:', res.status, JSON.stringify(r));
      return;
    }

    if (r.cumple) {
      console.log('✅ SOLID OK');
      return;
    }

    console.error(`\n❌ SOLID: ${r.resumen} (riesgo ${r.riesgo})\n`);
    for (const v of r.violaciones || []) {
      console.error(`[${v.principio}] ${v.linea}\n  Motivo: ${v.motivo}\n  Sugerencia:\n${v.refactorSugerido}\n`);
    }
    process.exitCode = 1;
  } catch (e) {
    console.warn('⚠️ No se pudo validar SOLID, se permite el commit:', e.message);
  }
}
main();