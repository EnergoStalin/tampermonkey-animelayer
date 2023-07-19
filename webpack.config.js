import { UserscriptPlugin } from 'webpack-userscript';
import path from 'path';

export default {
  entry: './src/index.js',
  mode: 'development',
  devtool: false,
  output: {
    path: path.resolve(path.dirname(path.basename(import.meta.url)), 'dist'),
    publicPath: '/'
  },
  devServer: {
    webSocketServer: false,
    liveReload: false,
  },
  plugins: [new UserscriptPlugin({
    root: './src',
    headers: {
      author: 'EnergoStalin',
      name: 'Animelayer to Aria2',
      description: 'Hooks download button on animelayer and redirect download to aria2c',
      include: [
        '/^https?://animelayer\.ru/torrent/.*/'
      ],
      grant: [
        'GM_setValue',
        'GM_getValue'
      ],
      icon: 'https://www.google.com/s2/favicons?sz=64&domain=animelayer.ru',
      connect: []
    },
    proxyScript: {
      baseURL: process.env.SCRIPT_HOST ?? 'http://127.0.0.1:8080/',
      filename: '[basename].proxy.user.js'
    }
  })],
};
