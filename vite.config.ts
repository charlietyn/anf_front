import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'


export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  // Load app-level env vars to node-level env vars.
  console.log(env.VITE_BASE_URL)
  return defineConfig({
    // To access env vars here use process.env.TEST_VAR
    plugins: [vue()],

  });
}
