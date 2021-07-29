## sso 前端 示例

单点登录后，登录页面通过 iframe 跨域将 token 传入目标站点

#### A 站点 页面

A 页面在 9001 端口

```html
<head>
  <title>域名A | 向iframe发送信息</title>
</head>

<body>
  page-A: localhost:9001

  <button onclick="postToken('iframeB', 'http://localhost:9002')">
    create iframe & post token
  </button>

  <script>
    function postToken(id, src) {
      console.log('post token')

      const targetIframe = document.getElementById(id)

      // 若 Iframe 已存在 直接发送 token，否则创建 Iframe 然后发送 token
      if (targetIframe) {
        targetIframe.contentWindow.postMessage({ token: 'testToken' }, src) // src = '*' 时，向所有域 发送消息
      } else {
        let iframe = document.createElement('iframe')
        iframe.id = id
        iframe.src = src

        iframe.style.width = 0
        iframe.style.height = 0
        iframe.style.display = 'none'

        document.body.appendChild(iframe)

        iframe.onload = function() {
          setTimeout(() => {
            iframe.contentWindow.postMessage({ token: 'testToken' }, src)
          }, 0)
        }
      }
    }
  </script>
</body>
```

#### B 站点 页面

B 页面在 9002 端口

```html
<head>
  <title>域名B | iframe接收信息</title>
</head>

<body>
  page-B: localhost:9002

  <script>
    window.addEventListener('message', receiveMessage, false)
    function receiveMessage(event) {
      console.log(event)
      // 处理 指定域 发送的信息
      if (event.origin === 'http://localhost:9001') {
        console.log(event.data)
        window.localStorage.setItem('token', event.data.token)
      }
    }
  </script>
</body>
```
