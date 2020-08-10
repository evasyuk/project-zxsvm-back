const dotenv = require('dotenv')
const path = require('path')
const appDir = path.resolve(__dirname)

export const loadCfg = ({ filename } = { filename: '.env' }) => {
    const result = dotenv.config({
        path: `${appDir}/../../${filename}`
    })

    if (result.error) {
        throw result.error
    }

}

