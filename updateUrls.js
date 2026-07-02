const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else if (file.endsWith('.js') || file.endsWith('.jsx')) { 
            results.push(file);
        }
    });
    return results;
}

const files = walk('./src');
let updatedCount = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Replace 'http://localhost:5000/...' with `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/...`
    content = content.replace(/'http:\/\/localhost:5000(.*?)'/g, "`\\${process.env.REACT_APP_API_URL || 'http://localhost:5000'}$1`");
    
    // Replace "http://localhost:5000/..." with `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/...`
    content = content.replace(/"http:\/\/localhost:5000(.*?)"/g, "`\\${process.env.REACT_APP_API_URL || 'http://localhost:5000'}$1`");
    
    // Replace `http://localhost:5000/...` with `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/...`
    content = content.replace(/`http:\/\/localhost:5000(.*?)`/g, "`\\${process.env.REACT_APP_API_URL || 'http://localhost:5000'}$1`");

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        updatedCount++;
        console.log(`Updated ${file}`);
    }
});

console.log(`Finished updating ${updatedCount} files.`);
