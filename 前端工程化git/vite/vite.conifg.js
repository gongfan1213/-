import {defineConfig} from 'vite'
import vue from "@vitejs/plugin-vue"
import {viteMockServe} from 'vite-plugin-mock'
@import "../styles/theme.less"
defineConfig({
    plugins: vue((),viteMockServe({

    }))
    resolve: {
        alias: {
            '@':'/src'
        }
    },
    css: {
        preprocessOptions: {
            scss: {
                additionalData:`@import @style`
            }
        }
    }
    build:{
        rollupOptions:{
            input:{
                main:'index.html',
                nested:'nested/index.html'
            }
        }
    }
})
//script type ="module" src="/src/main.ts"内置的运行ts的命令
//mock/auth.ts
//import {MockMethod} from "vite-plugin-mock"
export default [
    {
        url:"/api/currentUser",
        method:"get",
        response:({query} => {
            return (
                code: 0,
                data:"zhufeng"
            )
        })
    }
]
//configPath:设置模拟读取的数据条目，当文件存在并且位于项目根目录当中，将首先读取并且使用该文件
# PostCss
为了浏览器的兼容性，有的时候我们必须加入-webkitURL,-ms,-onabort,-moz,这些前缀的
Trident内核：主要代表了ie浏览器，前缀为-ms
Gecko内核：主要代表了fireBox前缀为-moz
Presto内核，主要代表了Opera前缀是-o 
Webkit内核，主要代表为chrome和safari前缀是-webkit 
如果项目包含有效的postcss配置，他会自动应用于所有的已经导入的css
//postcss.config.js
//module.exports = {plugins:[require("autoPrefixer")}]}
//.browerslistrc
//not dead//not op_mini all兼容性强制检查
//export default {plugins:[require("autoprefixer")]}
