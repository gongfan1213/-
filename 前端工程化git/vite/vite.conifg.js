import {defineConfig} from 'vite'
import vue from "@vitejs/plugin-vue"
import {viteMockServe} from 'vite-plugin-mock'
defineConfig({
    plugins: vue((),viteMockServe({

    }))
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
