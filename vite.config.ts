import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": "/src/assets", //格式一定要写对喽不然没有代码提示或者报错
      "@utils": "/src/utils", //格式一定要写对喽不然没有代码提示或者报错
    },
  },
  // less 配置
  css: {
    modules: {
      // css模块化 文件以.module.[css|less|scss]结尾
      generateScopedName: "[name]__[local]___[hash:base64:5]",
      hashPrefix: "prefix",
    },
    preprocessorOptions: {
      less: {
        charset: false,
        javascriptEnabled: true,
        // less全局变量
        // additionalData: '@import "./src/assets/style/global.less";',
      },
    },
  },
  server: {
    port: 8088,
    proxy: {
      "/is": {
        target: "http://",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/is/, ""),
      },
    },
  },
});
