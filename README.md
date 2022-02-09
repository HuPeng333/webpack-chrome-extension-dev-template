# webpack-chrome-extension-dev-template

基于webpack，让你能够使用EsModules快速构建Chrome拓展，并为你自动生成manifest.json

## 适用范围

目前仅支持一个`content_script`, 如果拓展中有多个`content_script`

如下所示的代码中就有两个`content_script`入口！后期可能会提供对多个`content_script`的入口支持
```json
{
  "content_scripts": [
    {
      "matches": [
        "<all_urls>"
      ],
      "js": [
        "lib/jquery.js"
      ]
    },
    {
      "matches": [
        "https://*.github.com/*"
      ],
      "js" : [
        "src/tool.js"
      ]
    }
  ]
}
```

## 安装

### 使用npx安装(推荐)
```shell
npx webpack-chrome-extension-dev-cli
```
### 从RELEASE中下载
从右侧RELEASE中下载相关模板然后安装依赖
```shell
npm i
```

## 启动
```shell
# 以开发模式启动，自动热更新
npm run dev

# 以生产模式下启动
npm run build
```




## 使用说明

该模板侧重于**content-script**的构建，即只可以在构建**content-script**使用EsModules！

### 项目结构
```text
-| src
    ---|content-script
        ---|index.js  // content-script入口文件, 在此处开始构建相关拓展
    ---|public // 该文件夹下的内容将会原封不动的打包, 可以存放一些第三方库
    ---|popup // 该文件夹下的内容将会原封不动的打包
        ---|index.html // 在此处开始构建您的默认popup, 最终生成manifest.json会自动指向该文件
    ---|options // 配置页,该文件夹下的内容将会原封不动的打包
        ---|index.html // 在此处开始构建您的默认配置页, 最终生成manifest.json会自动指向该文件
-|manifestConfig.json // 在该文件下为manifest.json添加额外配置
```
请严格按照模板的目录书写相关代码，否则manifest.json无法正常生成!

在`content-script`内可以直接`import` css文件，最后所有的css将会被打包为一个文件！

### 打包
在开发模式下运行, **会自动开启热更新，不需要重复执行指令**
```shell
npm run dev
```
生产模式下打包
```shell
npm run build
```
打包完成后会将所有资源生成在`dist`文件夹下, 使用浏览器加载`已经解压的拓展`即可使用

**打包后项目结构**
```text
-|content-script
    ---|index.css // css资源, 所有的css都会被打包为同一个文件
    ---|index.js // js资源, 所有的js都会被打包为同一个文件
-|popup
    ---|index.html // popup入口文件
-|options
    ---|index.html // options入口文件
-|public // public文件夹
-|manifest.json // chrome拓展配置文件
```

## 配置

### manifestConfig.json
你可以在`manifestConfig.json`配置相关的拓展配置，最终它会被自动合并进`manifest.json`。

你不需要手动声明`name`,`version`,`description`属性, 这些属性会自动从`package.json`中读取

**值得注意的是你不能对`content_scripts`相关内容进行修改**, 如果你想修改`matches`属性, 
请使用`content_scripts_matches`代替
```json
{
  "content_scripts_matches": [
    "<all_urls>"
  ]
}
```
