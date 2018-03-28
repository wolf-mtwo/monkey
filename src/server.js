import log4js from 'log4js';
import System from './components/system';
import { Monitor } from './components/monitor';

let system = new System();
let logger = log4js.getLogger('app');
var yourApiKey = 'Q71DBI2RESC3LMBM';

system.loadModules(__dirname)
.then(() => {
  logger.info('modules where loaded');
  return system.start();
})
.then(() => {
  logger.info('server started at port: ' + system.port);

  // Monitor
  let monitor = new Monitor();
  monitor.start();
})
.catch((err) => {
  logger.error(err);
});
