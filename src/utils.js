const rl = require('readline-sync')

module.exports = {
    promptBoolean: (question) => {
        let res = rl.question(`${question} (o/n) `)

        let wrongAnwser = res.toLowerCase() !== 'o' && res.toLowerCase() !== 'n'

        while (wrongAnwser) {
            console.log('Merci de répondre oui ou non.')

            res = rl.question(`${question} (o/n)`)

            wrongAnwser = res.toLowerCase() !== 'o' && res.toLowerCase() !== 'n'
        }

        return res.toLowerCase() === 'o'
    },

    generateProps: (props) => {
        let res = ""
        props.forEach((p, index) => {
            res += `${index > 0 ? '\t' : ''}${p.propName}${p.propOpt ? '?' : ''}: ${p.propType},${index < props.length - 1 ? '\n' : ''}`
        })
        return res
    }
}

