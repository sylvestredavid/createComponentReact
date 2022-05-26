const rl = require('readline-sync')
const utils = require("./utils");

module.exports = {

    checkForTsProps: () => {
        let moreProps = false
        let res = []

        do {
            const propName = rl.question('Quel est le nom de la prop ? ')
            const propType = rl.question('Quel est le type de la prop ? ')
            const propOpt = utils.promptBoolean('La prop est elle optionelle ?')
            res.push({propName, propType, propOpt})
            moreProps = utils.promptBoolean('Le composant a-t-il d\'autres props ?')
        } while (moreProps)
        return res
    },

    generateFileBodyForTs: (componentName, style, props) => {
        return `import React from 'react';${!style ? '' : `\nimport './${componentName}${style}';`}

interface ${componentName}Props {
    ${utils.generateProps(props)}
}

const ${componentName}:React.FC<${componentName}Props> = ({${props.length > 0 ? props.map(p => p.propName).join(', ') : ''}}: ${componentName}Props) => {
    return <p>${componentName} works !</p>
}

export default ${componentName};
`
    }
}

