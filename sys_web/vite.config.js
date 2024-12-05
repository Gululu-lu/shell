import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': './src' // 或者根据实际项目结构调整路径
    }
  },
  server:{
    // 配置前端服务器，设置port服务器端口号，启动后端口变了，就说明服务起效了
    port:3000,
    // 项目启动，浏览器自动打开
    open:true,
    // 配置代理服务器，当检测到/api，就进入代理服务器
    proxy:{
      '/api':{
        // 访问的后台服务器地址
        target:'http://127.0.0.1:2000',
        // 允许跨域
        changeOrigin:true,
        // 把请求中的的/api用空字符串代替，前面是正则表达式
        rewrite:(path) => path.replace(/^\/api/,"")
      }
    }
  }
})
