import log4js from 'log4js';
import System from './components/system';

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
})
.catch((err) => {
  logger.error(err);
});
