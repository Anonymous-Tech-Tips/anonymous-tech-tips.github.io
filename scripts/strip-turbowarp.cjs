const fs = require('fs');
const path = require('path');

const gamesDir = path.resolve(__dirname, '../public/games');

console.log(`Scanning for TurboWarp games in: ${gamesDir}`);

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith('.html')) {
                arrayOfFiles.push(path.join(dirPath, file));
            }
        }
    });

    return arrayOfFiles;
}

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // 1. Remove the "Cloud Blocker" script
    const cloudBlockerRegex = /<script>\s*\(function \(\) \{\s*\/\/ 🛡️ BLOCK CLOUD DATA 🛡️[\s\S]*?\}\)\(\);\s*<\/script>/;
    if (cloudBlockerRegex.test(content)) {
        console.log(`[Cleaned] Cloud Blocker removed from ${path.basename(filePath)}`);
        content = content.replace(cloudBlockerRegex, '');
        modified = true;
    }

    // 2. Remove the obfuscated "STOP" message script
    // We try multiple patterns to catch different variations.
    const obfuscatedPatterns = [
        // Pattern 1: Standard var assignment (worked for Appel)
        /<script>\s*\(function\s*\(\)\s*\{[\s\S]*?var\s+[a-zA-Z0-9]+\s*=\s*'[^']*',\s*[a-zA-Z0-9]+\s*=\s*[0-9]+\s*-\s*[0-9]+;[\s\S]*?\}\)\(\)[\s\S]*?<\/script>/,
        // Pattern 2: Return 9309 signature (worked for Arcuz)
        /<script>\s*\(function\s*\(\)\s*\{[\s\S]*?return\s+9309[\s\S]*?\}\)\(\)[\s\S]*?<\/script>/,
        // Pattern 3: xsh decrypter function (most reliable for SWF games)
        /<script>\s*\(function\s*\(\)\s*\{[\s\S]*?function\s+xsh\s*\([\s\S]*?\}\)\(\)[\s\S]*?<\/script>/
    ];

    for (const regex of obfuscatedPatterns) {
        if (regex.test(content)) {
            console.log(`[Cleaned] Obfuscated protection script removed from ${path.basename(filePath)} (Pattern matched)`);
            content = content.replace(regex, '');
            modified = true;
            break; // Cleaned once, stop checking other patterns for this step
        }
    }

    // 3. Explicit "STOP!" logic
    const stopMsgRegex = /<script>[\s\S]*?console\.log\("%c STOP!"[\s\S]*?<\/script>/;
    if (stopMsgRegex.test(content)) {
        console.log(`[Cleaned] Explicit STOP message script removed from ${path.basename(filePath)}`);
        content = content.replace(stopMsgRegex, '');
        modified = true;
    }

    // 4. TurboWarp Comment
    if (content.includes('<!-- Created with https://packager.turbowarp.org/ -->')) {
        content = content.replace('<!-- Created with https://packager.turbowarp.org/ -->', '');
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Saved changes to ${path.basename(filePath)}`);
    }
}

try {
    const allHtmlFiles = getAllFiles(gamesDir);
    console.log(`Found ${allHtmlFiles.length} HTML files.`);
    allHtmlFiles.forEach(processFile);
    console.log("Done.");
} catch (e) {
    console.error("Error:", e);
}
