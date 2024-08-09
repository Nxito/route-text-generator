# Route text generator

## Ejemplo de script

`node index.js "D:\03 SOFTWARE\Código\d3d_xeokit"`

## Ejemplo con NPM

NPM usa dos guiones "--" para añadir comandos extra

`npm run tree -- "D:\03 SOFTWARE\Código\d3d_xeokit"`

## Filtro de direcciones

Al igual que se hace comunmente con .gitignore, se utiliza un archivo `.ignore` para filtrar direcciones o archivos
## Ejemplo resultado

El resultado irá a  `./outDir` :

``` txt
ProjectName
├── outDir/
│   └── out.txt
├── .ignore
├── index.js
├── package.json
└── Readme.md

```
