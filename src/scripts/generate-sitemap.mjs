import { writeFileSync } from 'node:fs';

const origin = 'https://allied-plumbing.ca';
const paths = [
  '/', '/about', '/services',
  '/services/residential-plumbing', '/services/commercial-plumbing',
  '/services/hvac', '/services/boilers', '/services/maintenance', '/services/emergency',
  '/projects', '/projects/garibaldi', '/projects/ridgeview', '/projects/leigh', '/projects/haro',
  '/rfp', '/careers', '/contact'
];

const lastmod = new Date().toISOString().slice(0,10);
const items = paths.map(p => `  <url><loc>${origin}${p}</loc><lastmod>${lastmod}</lastmod></url>`).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</urlset>
`;
writeFileSync('public/sitemap.xml', xml);
console.log('sitemap.xml generated');