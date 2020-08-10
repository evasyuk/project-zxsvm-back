import "@babel/polyfill";
import "./src/helper/ObjectEnhancer";
import { loadCfg } from "./src/helper/DotEnv";
import ModuleConfig from "./src/ModuleConfig";

loadCfg()
ModuleConfig.init()

require('./src/App')
