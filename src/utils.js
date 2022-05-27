const rl = require('readline-sync')

module.exports = {
    promptBoolean: (question) => {
        let res = rl.question(`${question} (y/n) `)

        let wrongAnwser = res.toLowerCase() !== 'y' && res.toLowerCase() !== 'n'

        while (wrongAnwser) {
            console.log('Please answer yes or no.')

            res = rl.question(`${question} (y/n)`)

            wrongAnwser = res.toLowerCase() !== 'y' && res.toLowerCase() !== 'n'
        }

        return res.toLowerCase() === 'y'
    },

    generateProps: (props) => {
        let res = ""
        props.forEach((p, index) => {
            res += `${index > 0 ? '\t' : ''}${p.propName}${p.propOpt ? '?' : ''}: ${p.propType},${index < props.length - 1 ? '\n' : ''}`
        })
        return res
    }
}

