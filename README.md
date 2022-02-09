# webpack-chrome-extension-dev-template

基于webpack，让你能够使用EsModules快速构建Chrome拓展，并为你自动生成manifest.json

## 适用范围

我们都知道，webpack仅能有一个入口文件, 如果拓展中有多个"content_script"，
例如如下所示的代码中就有两个"content_script"入口，那就不适合使用本模板！
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

克隆本项目后并安装依赖后即可开始使用
```shell
npm i
```

## 使用说明

该模板侧重于**content-script**的构建，即只可以在构建**content-script**使用EsModules！

### 项目结构
```text
-| config
    ---|plugin // 模板所用插件
    ---|webpack.config.js // webpack配置
    ---|manifestConfig.json // 在该文件下为manifest.json添加额外配置
-| src
    ---|content-script
        ---|index.js  // content-script入口文件, 在此处开始构建拓展
    ---|public // 该文件夹下的内容将会原封不动的打包
    ---|popup // 该文件夹下的内容将会原封不动的打包
        ---|index.html // 在此处开始构建您的默认popup, 最终生成manifest.json会自动指向该文件
    ---|options // 配置页,该文件夹下的内容将会原封不动的打包
        ---|index.html
```

### 打包
使用如下命令打包
```shell
npm run build
```
打包完成后会将所有资源生成在`dist`文件夹下
**项目结构**
```text
-|content-script
    ---|index.css // css资源, 所有的css都会被打包为同一个文件
    ---|index.js // js资源, 所有的js都会被打包为同一个文件
-|popup
    ---|index.html // popup入口文件
-|public // public文件夹
-|manifest.json // chrome拓展配置文件
```

## 配置

### manifestConfig.json
你可以在`config/manifestConfig.json`配置相关的拓展配置，最终它会被自动合并进`manifest.json`。

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
