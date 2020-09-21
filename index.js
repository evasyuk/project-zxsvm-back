import "@babel/polyfill";
import { loadCfg } from "./src/helper/DotEnv";
import ModuleConfig from "./src/ModuleConfig";

loadCfg()
ModuleConfig.init()

require('./src/helper')
const app = require('./src/App').app

export {
  app
}