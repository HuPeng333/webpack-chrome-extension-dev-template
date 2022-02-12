# webpack-chrome-extension-dev-template

[English Version](https://github.com/HuPeng333/webpack-chrome-extension-dev-template/blob/master/README.en.md)

[Github](https://github.com/HuPeng333/webpack-chrome-extension-dev-template)

基于webpack，让你能够使用EsModules快速构建Chrome拓展，并为你自动生成manifest.json

**自`webpack-chrome-extension-dev-script`v0.1.0版本后，支持多个content-script入口打包!**

## 安装

### 使用npx安装(推荐)
```shell
npx webpack-chrome-extension-dev-cli ${project_name}
```
### 从RELEASE中下载
从右侧RELEASE中下载相关模板然后安装依赖
```shell
npm i
```

---
# 说明文档

## 如何开发

该模板侧重于**content-script**的构建，即只可以在构建**content-script**使用EsModules！

### 项目结构
```text
-| src
    ---|content-script
        ---|module1
            ---|index.js  // content-script入口文件, 在此处开始构建相关拓展
        ---|module2
            ---|index.js  // content-script入口文件, 在此处开始构建相关拓展
        // ... 
        
    ---|public // 该文件夹下的内容将会原封不动的打包, 可以存放一些第三方库
    
    ---|popup // 该文件夹下的内容将会原封不动的打包
        ---|index.html // 在此处开始构建您的默认popup, 最终生成manifest.json会自动指向该文件
        
    ---|options // 配置页,该文件夹下的内容将会原封不动的打包
        ---|index.html // 在此处开始构建您的默认配置页, 最终生成manifest.json会自动指向该文件
        
    ---|background
        ---|index.js // 在这里构建 service workers, 可以使用EsModules
        
-|manifestConfig.json // 在该文件下为manifest.json添加额外配置
-|webpack-config.js // webpack配置入口, 详见下方配置webpack.config.js
```
请严格按照模板的目录书写相关代码，否则manifest.json无法正常生成!

你可以在`content-script`文件夹下创建多个模块(一个文件夹代表一个模块)，
但模块的入口文件名必须保证其名称为`index.js`, 关于如何配置`content-script`的`matches`属性, 请查阅
[配置manifest.json](#manifest-config)

在`content-script`内可以直接`import` css文件，最后所有的css将会被分模块打包为一个文件！

## 运行
在开发模式下运行, **会自动开启热更新，不需要重复执行指令**
```shell
npm run dev
```
生产模式下打包
```shell
npm run build
```
打包完成后会将所有资源生成在`dist`文件夹下, 使用浏览器加载`已经解压的拓展`即可使用

> 有些时候浏览器并不会自动热更新你的拓展，你可能需要手动在浏览器内重新加载拓展

## 配置

<h3 id="manifest-config">配置manifest.json</h3>
你可以在`manifestConfig.json`配置相关的拓展配置，最终它会被自动合并进`manifest.json`。

你不需要手动声明`name`,`version`,`description`属性, 这些属性会自动从`package.json`中读取

**值得注意的是你不能对`content_scripts`相关内容进行修改**, 如果你想修改`matches`属性, 
请使用`content_scripts_matches`代替
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
请确保`content_scripts_matches`下的属性名与`content-script`文件夹下的模块名称一一对应!

如果不配置，默认为`<all_urls>`

### 配置webpack.config.js

由于webpack的配置文件被隐藏了，有些时候我们可能需要添加一些额外支持(如TypeScript)

首先你需要在根目录创建一个`webpack-config.js`，并非`webpack.config.js`，它的中间是一个横杠

在该文件里你就可以对webpack配置进行修改
```js
module.exports = (webpackConfig) => {
  
  // 在这里对 webpackConfig 对象进行修改
  
  return webpackConfig
}
```

`webpackConfig`是内部提前预定好的一些配置，你可以在此基础上添加额外配置，并最后将其返回。
