process.env.NODE_ENV = 'test';
const babel = require('./node_modules/@babel/core');
const fs = require('fs');
const path = require('path');

const lensList = fs.readFileSync(path.join(__dirname, 'node_modules/rettime/build/lens-list.mjs'), 'utf8');
const indexMjs = fs.readFileSync(path.join(__dirname, 'node_modules/rettime/build/index.mjs'), 'utf8');

const combined = lensList + '\n' + indexMjs.replace('import { LensList } from "./lens-list.mjs";', '');
const result = babel.transformSync(combined, {
  filename: 'index.js',
  presets: [require.resolve('./node_modules/babel-preset-react-app')]
});

// fs.writeFileSync(path.join(__dirname, '__mocks__/rettime.js'), result.code);
console.log(result.code);
