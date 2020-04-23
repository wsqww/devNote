1. 选择文件
```javascript

imgChange(type, $event) {
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
          this[type].push({
            newName: this.getNewFilename(imgFile.name, type),
            href: imgInfo.base64,
            file: imgInfo.blob
          });
        };
    }).bind(this);
    reader.readAsDataURL(imgFile); // 读取文件对象[obj]
  }

```

2. 压缩文件
3. 转blob