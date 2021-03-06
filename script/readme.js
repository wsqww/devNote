/**
 * 此脚本 用于生成 README.md 的内容
 * 可遍历项目下所有 .md文件，生成 链接 及 目录
 * npm run readme 执行此文件
 */


const fs = require('fs');
const path = require('path');
const rootPath = path.resolve(__dirname, '../');
const mdPath = '/Md/';
// console.log(__dirname, __filename, process.cwd(), path.resolve('./'), rootPath);


const ignoreDir = ['.history', '.git', 'README.md', 'favourite', 'script']; // 不用处理的 文件/文件夹

const mdToc = [
  [], // 存 md list格式
  [] // 存 锚点，用来查找 重复项 去重
];
const mdContent = [];

getDirTree(`${rootPath}${mdPath}`);

creatMdText();

/**
 * 获取文件树
 * @param {string} filePath 文件夹路径
 * @param {string} rootPath 新生成path的根路径
 * @param {number} deep 递归深度ß
 */
function getDirTree(filePath, rootPath = mdPath, deep = 0) {
  const fileArr =  fs.readdirSync(filePath).sort((a, b) => {
    return getFileSortNum(a) - getFileSortNum(b);
  });

  fileArr.forEach(name => {
    const stat = fs.statSync(path.resolve(filePath, name));
    const isFile = stat.isFile(); // 是否为文件
    // const isDir = stat.isDirectory(); // 是否为文件夹
    if( ignoreDir.indexOf(name) > -1 ) return false; // 忽略文件
    if(isFile && path.extname(name) !== '.md' ) return false; // 非md文件不处理

    const pathSrr = `${rootPath}${name}`;
    let children = [];
    let mdText = '';
    if (!isFile) {
      mdText = `${Array(3+deep).fill('#').join('')} ${name}`;  // ### name
      mdContent.push(mdText);
      mdToc[0].push(`${Array(2*deep).fill(' ').join('')}- [${name}](#${name.toLowerCase()})`); // - [name](#name)
      mdToc[1].push(`#${name.toLowerCase()}`); // #angular

      children = getDirTree(path.resolve(filePath, name), `${pathSrr}/`, deep+1);
    }else {
      mdText = `- [${path.basename(name, '.md')}](${pathSrr})`; // - [mdName](/mdpath.md)
      mdContent.push(mdText);
    }

  });

  if (deep === 1){ mdContent.push('\n', '----', '\n') };

}

// 写入 内容
function creatMdText() {
  // 锚点去重
  let rePoint = getArrRepeatIndex(mdToc[1]); // 记录重复项 第一次出现的位置 及 后续重复项的位置
  // console.log(rePoint);

  Object.keys(rePoint).forEach((key) => {
    rePoint[key].forEach((item, index) => {
      mdToc[0][item] = mdToc[0][item].replace(mdToc[1][key], `${mdToc[1][key]}-${index+1}`);
    })
  } );


  // 写入
  const mdText = [
    '## 开发学习笔记',
    '\n\n',
    ...mdToc[0],
    '\n\n',
    '----',
    '\n\n',
    ...mdContent,
    `\n\n`,
    `<sub style="color:#bcbcbc;">README.md内容由 '${__filename.replace(rootPath, '.')}' 执行写入</sub>`
  ];
  // console.log(mdText); return;
  fs.writeFile(path.resolve(rootPath, 'README.md'), mdText.join('\n'), (err) => {
    if (err) {
      console.log('写入失败！！');
      throw err
    }

    console.log('README.md  写入成功');
  })
}

/**
 * 获取数组 重复元素 出现的位置
 * @param {Array<string>} arr 
 */
function getArrRepeatIndex(arr) {
  let rePoint = {}; // 记录重复项 第一次出现的位置(key) 及 重复点的位置(value[])
  arr.forEach((point, index) => {
    if(point === true) return; // 跳过 已经判断过的元素
    let resultArr = [];
    let searchArr = arr.slice(index+1); // 截取 剩余的元素 做判断
    searchArr.forEach((item, idx)=> {
      if (point === item) {
        resultArr.push(index+1+idx); // 记录 重复项 在 arr 的位置
        arr[index+1+idx] = true; // 重复的元素 做标记
      }
    });
    // 长度大于 0 ，记录重复项
    if (resultArr.length > 0) {
      rePoint[index] = resultArr;
    }
  });
  return rePoint;
}


// console.log(getFileSortNum('2-哈哈哈'));
// 截取 文件名 '-' 之前的 数字，若没有则 返回 -1
function getFileSortNum(fileName) {
  const index = fileName.indexOf('-');
  if (index > 0) {
    return Number(fileName.substring(0, index));
  }
  return index;
} 
