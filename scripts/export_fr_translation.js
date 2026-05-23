const fs = require('fs');
const path = require('path');
const sourcePath = path.join(__dirname, '..', 'src', 'translations', 'fr.ts');
const outPath = path.join(__dirname, '..', 'CONTENU_SITE.md');

let source = fs.readFileSync(sourcePath, 'utf8');
source = source.replace(/\/\*[\s\S]*?\*\//g, '');
source = source.replace(/\/\/.*$/gm, '');
source = source.replace(/export const fr\s*=\s*/m, 'module.exports = ');
if (!source.trim().endsWith(';')) source += ';';
fs.writeFileSync(path.join(__dirname, 'tmp_fr.js'), source, 'utf8');

const obj = require('./tmp_fr.js');
fs.unlinkSync(path.join(__dirname, 'tmp_fr.js'));

function walk(node, pathKeys = []) {
    const entries = [];
    if (typeof node === 'string') {
        entries.push({ key: pathKeys.join('.'), value: node });
    } else if (Array.isArray(node)) {
        entries.push({ key: pathKeys.join('.'), value: null });
        node.forEach((item) => {
            if (typeof item === 'string') {
                entries.push({ key: pathKeys.join('.'), value: item, isListItem: true });
            } else {
                entries.push(...walk(item, pathKeys.concat(['[item]'])));
            }
        });
    } else if (node && typeof node === 'object') {
        Object.keys(node).forEach((key) => {
            entries.push(...walk(node[key], pathKeys.concat(key)));
        });
    }
    return entries;
}

const lines = ['# Contenu du site Ubuntu Business Builders (UBB)', '', 'Ce document regroupe tout le contenu textuel du site web en français, extrait de `src/translations/fr.ts`.', '', '---', ''];
let lastSection = '';
let lastSubsection = '';
let lastSubsubsection = '';

for (const item of walk(obj)) {
    const keys = item.key.split('.');
    if (keys.length === 1) {
        if (keys[0]) {
            lines.push(`## ${keys[0]}`);
            lastSection = keys[0];
            lastSubsection = '';
            lastSubsubsection = '';
        }
    } else if (keys.length === 2) {
        const title = keys[1].replace(/([A-Z])/g, ' $1').replace(/^./, (m) => m.toUpperCase());
        lines.push(`### ${title}`);
        lastSubsection = keys[1];
        lastSubsubsection = '';
    } else if (keys.length === 3) {
        const title = keys[2].replace(/([A-Z])/g, ' $1').replace(/^./, (m) => m.toUpperCase());
        lines.push(`#### ${title}`);
        lastSubsubsection = keys[2];
    }

    if (item.value !== null) {
        if (item.isListItem) {
            lines.push(`- ${item.value}`);
        } else {
            lines.push(`- ${item.value}`);
        }
    }
}

fs.writeFileSync(outPath, lines.join('\n') + '\n', 'utf8');
console.log('Wrote', outPath);