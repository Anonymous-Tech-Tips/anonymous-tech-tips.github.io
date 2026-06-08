const fs = require('fs');
const https = require('https');
const Packager = require('@turbowarp/packager');

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {headers: {'User-Agent': 'Mozilla/5.0'}}, res => {
      if (res.statusCode >= 300 && res.statusCode < 400) {
        return resolve(httpsGet(res.headers.location));
      }
      const chunks = [];
      res.on('data', d => chunks.push(d));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

const run = async () => {
  const projectId = '314694783';
  console.log('Fetching project token...');
  const meta = JSON.parse(await httpsGet(`https://trampoline.turbowarp.org/api/projects/${projectId}`));
  const token = meta.project_token;
  console.log('Fetching project data...');
  const projectData = await httpsGet(`https://projects.scratch.mit.edu/${projectId}?token=${token}`);
  console.log(`Got ${projectData.length} bytes`);

  const loadedProject = await Packager.loadProject(projectData, (type, a, b) => {
    process.stdout.write(`\r${type}: ${a}/${b}   `);
  });
  console.log('\nProject loaded. Packaging...');

  const packager = new Packager.Packager();
  packager.project = loadedProject;
  packager.options.target = 'html';

  const result = await packager.package();
  const outPath = 'public/games/html/Bloxorz/game/index.html';
  fs.writeFileSync(outPath, result.data);
  console.log(`Saved to ${outPath} (${result.data.length} bytes)`);
};

run().catch(err => { console.error(err); process.exit(1); });
