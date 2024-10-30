# 1.webpack是啥？有啥作用
概念：Webpack 是一种用于构建 JavaScript 应用程序的静态模块打包器，它能够以一种相对一致且开放的处理方式，加载应用中的所有资源文件（图片、CSS、视频、字体文件等），并将其合并打包成浏览器兼容的 Web 资源文件。
功能：

模块的打包：通过打包整合不同的模块文件保证各模块之间的引用和执行
代码编译：通过丰富的loader可以将不同格式文件如.sass/.vue/.jsx转译为浏览器可以执行的文件
扩展功能：通过社区丰富的plugin可以实现多种强大的功能，例如代码分割、代码混淆、代码压缩、按需加载.....等等

# 2.常见的loader及其作用
-babel-loader：将es6转译为es5
- file-loader：可以指定要复制和放置资源文件的位置，以及如何使用版本哈希命名以获得更好的缓存，并在代码中通过URL去引用输出的文件
-url-loader：和file-loader功能相似，但是可以通过指定阈值来根据文件大小使用不同的处理方式（小于阈值则返回base64格式编码并将文件的 data-url内联到bundle中）
-raw-loader：加载文件原始内容

webpack5自身内置了file-loader/ url-loader/ raw-loader等loader，所以我们不需要再显示引入loader 只需要指定对应的type即可实现相同的功能 如file-loader等价于 type= "asset/resource"'

-image-webpack-loader： 加载并压缩图片资源
-awesome-typescirpt-loader: 将typescript转换为javaScript 并且性能由于ts-loader
-sass-loader: 将SCSS/SASS代码转换为CSS
-css-loader: 加载CSS代码 支持模块化、压缩、文件导入等功能特性
-style-loader: 把CSS代码注入到js中，通过DOM 操作去加载CSS代码

当我们使用类似于 less 或者 scss 等预处理器的时候，通常需要多个 loader 的配合使用如test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] 

-source-map-loader: 加载额外的Source Map文件
-eslint-loader: 通过ESlint 检查js代码
-cache-loader: 可以在一些开销较大的Loader之前添加可以将结果缓存到磁盘中，提高构建的效率
-thread-loader: 多线程打包，加快打包速度
以上便是常用的loader以及作用，对loader感兴趣的小伙伴之后可以自行了解

# 3.常见的plugin及作用
-define-plugin: 定义环境变量（webpack4之后可以通过指定mode：production/development实现同样效果）
-web-webpack-plugin：为单页面应用输出HTML 性能优于html-webpack-plugin
-clean-webpack-plugin: 每次打包时删除上次打包的产物, 保证打包目录下的文件都是最新的
-webpack-merge： 用来合并公共配置文件,常用（例如分别配置webpack.common.config.js/ webpack.dev.config.js/webpack.production.config.js并将其合并）
-ignore-plugin: 忽略指定的文件，可以加快构建速度
-terser-webpack-plugin：压缩ES6的代码（tree-shaking）
-uglifyjs-webpack-plugin: 压缩js代码
-mini-css-extract-plugin: 将CSS提取为独立文件，支持按需加载
-css-minimize-webpack-plugin：压缩CSS代码

css文件的压缩需要mini-css-extract-plugin和css-minimize-webpack-plugin 的配合使用 即先使用mini-css-extract-plugin将css代码抽离成单独文件，之后使用 css-minimize-webpack-plugin对css代码进行压缩

-serviceworker-webpack-plugin: 为离线应用增加离线缓存功能
-ModuleconcatenationPlugin: 开启Scope Hositing 用于合并提升作用域， 减小代码体积
-copy-webpack-plugin： 在构建的时候，复制静态资源到打包目录。
-compression-webpack-plugin: 生产环境采用gzip压缩JS和CSS
-ParalleUglifyPlugin： 多进程并行压缩js
-webpack-bundle-analyzer: 可视化webpack输出文件大小的根据
-speed-measure-webpack-plugin: 用于分析各个loader和plugin的耗时，可用于性能分析
-webpack-dashboard: 可以更友好地展示打包相关信息
以上便是常见的插件及其作用，接下来讲解我自己使用过的觉得好用的插件/工具

# 4.有没有用过好用的工具/plugin
-splitChunkPlugin：用于代码分割
-webpack-merge: 提取公共配置，用于分别编写不同环境的配置文件（ `` ）
-HotModuleReplacementPlugin:支持模块热替换
-ignore-plugin: 忽略指定文件，可以加快构建速度
-clean-webpack-plugin: 每次打包时删除上次打包的产物， 保证打包目录下的文件都是最新的
-speed-measure-webpack-plugin: 分析出Webpack打包过程中的Loader和Plugin的耗时，用于性能分析
-mini-css-extract-plugin: 将CSS代码抽离为独立文件，支持按需加载， 配合 css-minimize-webpack-plugin使用
-terser-webpack-plugin: 实现更精细的代码压缩功能
-SourceMapDevtoolPlugin:精细度配置SourceMap， 不能和devtool选项同时使用
-UnusedWebpackPlugin: 反向查找项目中没被用到的文件，日常工作经常用到，可在重构或者性能分析时使用
-webpack-dashboard: webpack-dashboard 是一个命令行可视化工具，能够在编译过程中实时展示编译进度、模块分布、产物信息等相关信息，性能分析时很有用。
- Webpack Analysis：Webpack Analysis 是 webpack 官方提供的可视化分析工具。
-BundleAnalyzerPlugin：性能分析插件，可以在运行后查看是否包含重复模块/不必要模块等
以上便是我日常学习中经常用到的一些工具/插件，有用过其他好用的工具/插件的同学欢迎在评论区推荐讨论

