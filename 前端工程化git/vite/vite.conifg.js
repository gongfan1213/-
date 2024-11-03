import {defineConfig} from 'vite'
import vue from "@vitejs/plugin-vue"
defineConfig({
    plugins: vue(())
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
