1. 选择文件
```javascript
/**
 * input change事件
 * @param $event <input/> dom对象
 */
imgChange($event) {
  const reader = new FileReader();
  const imgFile = $event.target.files[0];
  // console.log(imgFile);
  reader.onload = ((eve) => {
    const result = eve.target.result;
    const newImg = new Image();
    newImg.src = result;
    newImg.onload = () => {
      const imgInfo = this.imgCompress(newImg, imgFile.type);
      // console.log(imgInfo);
    };
  }).bind(this);
  reader.readAsDataURL(imgFile); // 读取文件对象[obj]
}
```

2. 压缩文件
```javascript
/**
 * 压缩图片
 * @param img 原图片
 * @param type 转换类型
 * @param leval 压缩比例，0-1，越小  越模糊
 */
imgCompress(img, type = 'image/jpeg', leval = .3) {
  const width = img.width * leval;
  const height = img.height * leval;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');  // 绘图环境
  context.drawImage(img, 0, 0, width, height);
  // 将原来图片的质量压缩到原先的leval倍。
  const base64 = canvas.toDataURL(type, leval); // data url的形式
  const blob = this.dataURLtoBlob(base64);
  // console.log(base64);
  return {
    base64,
    blob
  };
}
```

3. 转blob
```javascript
/**
 * base64文件转 blob
 * @param dataurl base64编码文件
 */
dataURLtoBlob(dataurl) {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
```
