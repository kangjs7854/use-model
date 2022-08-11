import { defineConfig } from 'dumi'

const REPO = 'use-model'
export default defineConfig({
  title: 'use-react-model-docs',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  base: process.env.NODE_ENV === 'production' ? `/${REPO}/` : '/',
  publicPath: process.env.NODE_ENV === 'production' ? `/${REPO}/` : '/',
  // more config: https://d.umijs.org/config

})
