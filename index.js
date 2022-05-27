#! /usr/bin/env node
const fs = require('fs')
const rl = require('readline-sync')
const utils = require('./src/utils')
const functionsForTs = require('./src/functionsForTs')
const functionsForJs = require('./src/functionsForJs')

const componentName = rl.question('What is the name of the component ? ')

const inFolder = utils.promptBoolean('Is the component in a folder ?')

if (inFolder) {
    fs.mkdirSync(componentName)
    process.chdir(`./${componentName}`)
}

const isTypescript = utils.promptBoolean('Are you using typeScript ?')

stylesheets = ['.css', '.scss', '.less', '.sass']
index = rl.keyInSelect(stylesheets, 'Which stylesheet to link to the component ? ');

const style = stylesheets[index]

if (style) {
    fs.writeFileSync(`${componentName}${style}`, '');
}

let props = []

if (utils.promptBoolean('Does the component have props ?')) {
    props = isTypescript ? functionsForTs.checkForTsProps() : functionsForJs.checkForJsProps()
}

fs.writeFileSync(
    `${componentName}.${isTypescript ? 'tsx' : 'jsx'}`,
    isTypescript ? functionsForTs.generateFileBodyForTs(componentName, style, props) : functionsForJs.generateFileBodyForJs(componentName, style, props)
);

console.log('The component was successfully created.')

