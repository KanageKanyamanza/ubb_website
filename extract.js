const fs = require('fs');
const path = require('path');

const dirs = [
    path.join(__dirname, 'src', 'pages'),
    path.join(__dirname, 'src', 'components'),
    path.join(__dirname, 'src', 'data')
];

let result = "========================================\n";
result += " TEXTES DU SITE UBB POUR REDACTION WEB\n";
result += "========================================\n\n";

function processDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            const content = fs.readFileSync(fullPath, 'utf-8');
            
            // Enlever les imports
            let clean = content.replace(/^import.*$/gm, '');
            
            // Enlever les balises HTML/JSX mais garder le texte
            let textWithoutTags = clean.replace(/<[^>]+>/g, '\n');
            
            // Diviser par lignes
            let lines = textWithoutTags.split('\n');
            
            let extracted = [];
            for (let line of lines) {
                line = line.trim();
                
                // Filtrer les lignes de code
                if (!line) continue;
                if (line.match(/^[{}()[\];,./]+$/)) continue; // Juste de la ponctuation
                if (line.match(/^[a-zA-Z0-9_]+:$/)) continue; // Clés d'objets seules
                if (line.startsWith('className=')) continue;
                if (line.includes('=>')) continue;
                if (line.includes('`')) continue;
                if (line.includes('px-') || line.includes('py-') || line.includes('bg-')) continue; // Classes CSS résiduelles
                if (line.startsWith('return ')) continue;
                if (line.startsWith('export ')) continue;
                if (line.startsWith('const ')) continue;
                if (line.startsWith('let ')) continue;
                if (line.startsWith('function ')) continue;
                if (line.startsWith('//')) continue;
                if (line.includes('http://') || line.includes('https://')) continue; // URLs
                
                // Extraire les valeurs des propriétés de type string ex: title: "Mon titre"
                const propMatch = line.match(/^\w+:\s*["']([^"']+)["'],?/);
                if (propMatch) {
                    if (propMatch[1].length > 2 && !propMatch[1].includes('.png') && !propMatch[1].includes('.jpg')) {
                        extracted.push(propMatch[1]);
                    }
                    continue;
                }
                
                // Nettoyer les quotes et virgules à la fin
                line = line.replace(/^["']|["'],?$/g, '');
                
                if (line.length > 2) {
                    extracted.push(line);
                }
            }
            
            // Éliminer les doublons
            extracted = [...new Set(extracted)];
            
            if (extracted.length > 0) {
                result += `\n\n[ PAGE / FICHIER : ${file} ]\n`;
                result += `----------------------------------------\n`;
                result += extracted.join('\n\n') + '\n';
            }
        }
    }
}

for (let d of dirs) {
    processDir(d);
}

fs.writeFileSync('textes_site_ubb.txt', result, 'utf-8');
console.log('Extraction terminée. Fichier textes_site_ubb.txt généré.');
