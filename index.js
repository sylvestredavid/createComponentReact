#! /usr/bin/env node
const fs = require('fs')
const rl = require('readline-sync')
const utils = require('./src/utils')
const functionsForTs = require('./src/functionsForTs')
const functionsForJs = require('./src/functionsForJs')

const componentName = rl.question('Quel est le nom du composant ? ')

const inFolder = utils.promptBoolean('Le composant est-il dans un dossier ?')

if (inFolder) {
    fs.mkdirSync(componentName)
    process.chdir(`./${componentName}`)
}

const isTypescript = utils.promptBoolean('Utilsez-vous typeScript ?')

stylesheets = ['.css', '.scss', '.less', '.sass']
index = rl.keyInSelect(stylesheets, 'Quelle feuille de style utilser avec le composants?');

const style = stylesheets[index]

if (style) {
    fs.writeFileSync(`${componentName}${style}`, '');
}

let props = []

if (utils.promptBoolean('Le composant a-t-il des props ?')) {
    props = isTypescript ? functionsForTs.checkForTsProps() : functionsForJs.checkForJsProps()
}

fs.writeFileSync(
    `${componentName}.${isTypescript ? 'tsx' : 'jsx'}`,
    isTypescript ? functionsForTs.generateFileBodyForTs(componentName, style, props) : functionsForJs.generateFileBodyForJs(componentName, style, props)
);

