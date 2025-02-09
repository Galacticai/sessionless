import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
//  entry: './sessionless.js',
  entry: './foo.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'sessionless', // This matches your library name
    libraryTarget: 'umd', // Makes it available in different module systems
    globalObject: 'window'
  },
  mode: 'production'  
};
