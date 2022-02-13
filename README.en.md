# webpack-chrome-extension-dev-template
[简体中文](https://github.com/HuPeng333/webpack-chrome-extension-dev-template/blob/master/README.md)

[Github](https://github.com/HuPeng333/webpack-chrome-extension-dev-template)

based on `webpack`, allow you to build `Chrome Extension` with `EsModules`, and auto generate `manifest.json` for you 

## Install

*It is not a dependence but template! So you can't download it with `npm install`!*

### Install with npx (Recommend)
```shell
npx webpack-chrome-extension-dev-cli ${project_name}
```

### Download template from GitHub RELEASE
[RELEASE](https://github.com/HuPeng333/webpack-chrome-extension-dev-template/releases)

*Download from GitHub may not be a new version! If you really want to download from GitHub, I recommend you clone the code to get the new version!*

___

# Docs

## How to build the extension

### Project Structure

```text
-| src
    ---|content-script
        ---|module1
            ---|index.js  // 'content-script' entry, build your extension here
        ---|module2
            ---|index.js  // 'content-script' entry, build your extension here
        // ... 
        
    ---|public // the file in this folder will be intact moved to the output path, you can put your js lib here
    
    ---|popup // the file in this folder will be intact moved to the output path
        ---|index.html // start build your popup here, the 'manifest.json' will auto point to it
        
    ---|options // the file in this folder will be intact moved to the output path
        ---|index.html // start build your config page here, the 'manifest.json' will auto point to it
        
    ---|background
        ---|index.js // build `service workers` here, you can use EsModules!
        
-|manifestConfig.json // add additional 'manifest.json' config here
-|webpack-config.js // config the webpack, see 'Config the webpack.config.js' below
```

please strictly follow the template structure! It will help to generate 'manifest.json'

you can create multi modules(folder) in the `content-script` folder!
But the entrance file name must be `index.js`, about how to config the `matches` property in `content-script`,
see [Config the manifest.json](#manifest-config)

> You can import `css` file in `content-script` modules!

## Run
Run in `development` mode, it could auto hot update,but you may reload the extension in the browser! 
To solve this problem, see [Browser hot update](#hot-update)
```shell
npm run dev
```

Run in 'production' mode
```shell
npm run build
```

The resources will be generated in `dist` folder, you can use your browser to load it!

## Config
<h3 id="manifest-config">Config the manifest.json</h3>
you can write your own `manifest` config in `manifestConfig.json`, it will be combined in `manifest.json`.

**But you can't modify the `content_scripts`!** If you want to modify the `matches` field, please instead with `content_scripts_matches` 
```json
{
  "content_scripts_matches": {
    "moduleName": [
      "https://*.github.com"
    ],
    "moduleName2": [
      "<all_urls>"
    ]
  }
}
```

please make sure the ``content_scripts_matches` field name matches the module name in `content-script` folder!

If you don't provide it, it will use `<all_urls>` by default.

### Config the webpack.config.js

The webpack config file is hidden, but sometimes we want to add additional support(like `TypeScript`)

First, you should create a `webpack-config.js` file in the root path, it is not `webpack.config.js`! 

You can config or modify the webpack config here
```js
module.exports = (webpackConfig) => {
  
  // modify 'webpackConfig' object here
  
  return webpackConfig
}
```

Please mark sure you return the `webpackConfig` object!

<h3 id="hot-update">Browser hot update</h3>
> It only can use in `webpack-chrome-extension-dev-script 0.2.0` or bigger

Although in development mode, we can hot update the extension, but the browser couldn't reload
our newly extension!

In this situation, you have to reload the extension in your browser 'extension' page.

To solve this problem, you can add this code in `background`(in `src/background/index.js`)

```javascript
import {launchHotUpdate} from 'webpack-chrome-extension-dev-script'

if (SCRIPT_MODE === 'development') {
  launchHotUpdate()
}
```

Now, you modify your code in dev mode, and then use `f5` to refresh your browser, it will be auto reload!

The `SCRIPT_MODE` is smiler to `process.env.NODE_ENV`

> **Warn:** don use `process.env.NODE_ENV` to judge build mode! Because the extension, which is build with development mode in webpack, 
can't run in browser! So the `process.env.NODE_ENV` always `production`!

