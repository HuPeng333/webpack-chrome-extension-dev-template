import t from './t'
import {launchHotUpdate} from 'webpack-chrome-extension-dev-script'

console.log(SCRIPT_MODE)
if (SCRIPT_MODE === 'development') {
  launchHotUpdate()
  console.log('do')
}
