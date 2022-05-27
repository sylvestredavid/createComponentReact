const rl = require('readline-sync')
const utils = require("./utils");

module.exports = {

    checkForTsProps: () => {
        let moreProps = false
        let res = []

        do {
            const propName = rl.question('What is the name of the prop ? ')
            const propType = rl.question('What is the type of the prop ? ')
            const propOpt = utils.promptBoolean('Is the prop optional ?')
            res.push({propName, propType, propOpt})
            moreProps = utils.promptBoolean('Does the component have other props ?')
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

