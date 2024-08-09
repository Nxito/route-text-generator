const fs = require("fs");
const path = require("path");

function loadIgnorePatterns(ignoreFilePath) {
  if (!fs.existsSync(ignoreFilePath)) return [];
  const content = fs.readFileSync(ignoreFilePath, "utf-8");
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
}

function shouldIgnore(item, ignorePatterns) {
  return ignorePatterns.some((pattern) => {
    return item === pattern || item.startsWith(pattern + path.sep);
  });
}

function printTree(dirPath, prefix = "", ignorePatterns = []) {
  const items = fs.readdirSync(dirPath);

  const directories = [];
  const files = [];

  items.forEach((item) => {
    const relativePath = path.relative(rootDir, path.join(dirPath, item));

    if (shouldIgnore(relativePath, ignorePatterns)) {
      console.log(`Ignorando: ${relativePath}`);
      return;
    }

    const fullPath = path.join(dirPath, item);
    if (fs.statSync(fullPath).isDirectory()) {
      directories.push(item);
    } else {
      files.push(item);
    }
  });

  directories.forEach((directory, index) => {
    const isLast = index === directories.length - 1 && files.length === 0;
    const connector = isLast ? "└── " : "├── ";

    //console.log(prefix + connector + directory)
    aux = aux.concat("\n" + prefix + connector + directory+"/");
    printTree(
      path.join(dirPath, directory),
      prefix + (isLast ? "    " : "│   "),
      ignorePatterns
    );
  });

  files.forEach((file, index) => {
    const isLast = index === files.length - 1;
    const connector = isLast ? "└── " : "├── ";

    // console.log(prefix + connector + file);
    aux = aux.concat("\n" + prefix + connector + file);
  });
}

const rootDir = process.argv[2] || ".";
const ignoreFilePath = path.join(rootDir, ".ignore");
const ignorePatterns = loadIgnorePatterns(ignoreFilePath);

ignorePatterns.push(".git");

console.log(`Patrones de ignorar: ${ignorePatterns.join(", ")}`);
var aux = path.basename(rootDir);
printTree(rootDir, "", ignorePatterns);
console.log(aux);
fs.writeFileSync("./outDir/out.txt", aux, "utf-8");

console.log("Archivo guardado en  ./outDir/out.txt");
