/*
 * @Author: qtx
 * @Date: 2021-04-24 00:24:44
 * @LastEditors: qtx
 * @LastEditTime: 2021-04-24 00:26:25
 * @Description: 
 */
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  server: { open: true },
  plugins: [reactRefresh()],
})
