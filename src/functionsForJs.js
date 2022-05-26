const rl = require('readline-sync')
const utils = require("./utils");

module.exports = {

    checkForJsProps: () => {
        let moreProps = false
        let res = []

        do {
            const propName = rl.question('Quel est le nom de la prop ? ')
            res.push({propName})
            moreProps = utils.promptBoolean('Le composant a-t-il d\'autres props ?')
        } while (moreProps)
        return res
    },

    generateFileBodyForJs: (componentName, style, props) => {
        return `import React from 'react';${!style ? '' : `\nimport './${componentName}${style}';`}

const ${componentName} = ({${props.length > 0 ? props.map(p => p.propName).join(', ') : ''}}) => {
    return <p>${componentName} works !</p>
}

export default ${componentName};
`
    }
}

