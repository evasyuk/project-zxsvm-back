import { EnvSetupError } from './error'

class ModuleConfig {
    static init({
        databaseURL,
        databaseCredStr,
        databaseSeed,
    } = {
        databaseURL: process.env.DB_URL,
        databaseCredStr: process.env.DB_CERT,
        databaseSeed: process.env.DB_SEED
    }) {

        if (!databaseURL) {
            throw new EnvSetupError('databaseURL')
        }
        if (!databaseCredStr) {
            throw new EnvSetupError('databaseCredStr')
        }
        if (!databaseSeed) {
            throw new EnvSetupError('databaseSeed')
        }

        ModuleConfig.databaseURL = databaseURL
        ModuleConfig.databaseCredStr = databaseCredStr
        ModuleConfig.databaseSeed = databaseSeed
    }
}

export default ModuleConfig
