/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */
// import glob from 'glob';

// const files = require.context('.', false, /\.js$/);
// const files = glob('*.js');
// console.log(files);
// const modules = {};
const modules = {'docs':'docs.js','counter':'Counter.js','store':'store'};

// files.keys().forEach(key => {
//   if (key === './index.js') return;
//   modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default;
// });

export default modules;