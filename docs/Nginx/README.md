## Nginx

[[toc]]

### 安装（mac）

```bash
brew update

brew search nginx

brew install nginx
```

### 常用命令

```bash
nginx             # 打开 nginx
nginx -t          # 测试配置文件是否有语法错误
nginx -s reopen   # 重启Nginx
nginx -s reload   # 重新加载Nginx配置文件，然后以优雅的方式重启Nginx
nginx -s stop     # 强制停止Nginx服务
nginx -s quit     # 优雅地停止Nginx服务（即处理完所有请求后再停止服务）

# 本机 NGINX 路径 (需使用自己电脑 nginx 路径)
# /usr/local/Cellar/nginx/1.17.7/bin/nginx
# --------- 防止防火墙拦截 ------------------------------------------ #
# sudo chown root:wheel /usr/local/Cellar/nginx/1.17.7/bin/nginx
# sudo chmod u+s /usr/local/Cellar/nginx/1.17.7/bin/nginx
# ----------------------------------------------------------------- #
```

### 常用配置

```nginx
# user root owner;

# user  nobody;
worker_processes 1;

# error_log  logs/error.log;
# error_log  logs/error.log  notice;
# error_log  logs/error.log  info;

# pid        logs/nginx.pid;
events {
    # 单个后台进程的最大并发数
    worker_connections 1024;
}


http {
    include mime.types;
    default_type application/octet-stream;

    # 设置日志模式
    # log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    # nginx 访问日志存放目录
    # access_log  logs/access.log  main;
    # 开启高效传输模式
    sendfile on;

    # 减少网络报文段的数量
    # tcp_nopush     on;

    # 超时时间
    # keepalive_timeout  0;
    keepalive_timeout 65;

    # 开启gzip压缩
    gzip on;
    # 启用gzip压缩的最小文件，小于设置值的文件将不会压缩
    gzip_min_length 1k;
    # gzip 压缩级别，1-9，数字越大压缩的越好，也越占用CPU时间
    gzip_comp_level 9;
    # 进行压缩的文件类型。javascript有多种形式。其中的值可以在 mime.types 文件中找到。
    gzip_types text/plain application/json application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png application/vnd.ms-fontobject font/ttf font/opentype font/x-woff image/svg+xml;
    # 是否在http header中添加Vary: Accept-Encoding，建议开启
    gzip_vary on;

    # server {
    #     listen       8080;
    #     server_name  localhost;
    #     # charset koi8-r;
    #     # access_log  logs/host.access.log  main;
    #     location / {
    #         root   html;
    #         index  index.html index.htm;
    #     }
    #     # error_page  404              /404.html;
    #     # redirect server error pages to the static page /50x.html
    #     #
    #     error_page   500 502 503 504  /50x.html;
    #     location = /50x.html {
    #         root   html;
    #     }
    #     # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #     #
    #     # location ~ \.php$ {
    #     #    proxy_pass   http://127.0.0.1;
    #     # }
    #     # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #     #
    #     # location ~ \.php$ {
    #     #    root           html;
    #     #    fastcgi_pass   127.0.0.1:9000;
    #     #    fastcgi_index  index.php;
    #     #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #     #    include        fastcgi_params;
    #     # }
    #     # deny access to .htaccess files, if Apache's document root
    #     # concurs with nginx's one
    #     #
    #     # location ~ /\.ht {
    #     #    deny  all;
    #     # }
    # }
    # another virtual host using mix of IP-, name-, and port-based configuration
    # server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;
    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    # }
    # HTTPS server
    # server {
    #    listen       443 ssl;
    #    server_name  localhost;
    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;
    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;
    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;
    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    # }

    # 子配置项位置
    include /Users/wsq/Code/nginx/*.nginx.conf;

    include servers/*;
}

```

default config

```nginx
server {
    listen 80;
    server_name localhost;
    # 服务默认启动目录
    root /Users/wsq/Code/nginx/html;
    # 默认访问文件
    index index.html;

    location / {
        index index.html;
    }

    # 静态资源
    location /assets/ {
        alias /Users/wsq/Code/nginx/html/assets/;
    }

    # 配置404页面
    error_page  404  /Users/wsq/Code/nginx/html/404.html;

    # redirect server error pages to the static page /50x.html
    # 错误状态码的显示页面，配置后需要重启
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /Users/wsq/Code/nginx/html;
    }

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    # location ~ /\.ht {
    #     deny  all;
    # }
}
```

### 部署前端框架 构建后的 静态页面

使用 try_files 指向 index.html，详细描述见[Web 应用的前端控制器模式](https://www.nginx.com/resources/wiki/start/topics/tutorials/config_pitfalls/#front-controller-pattern-web-apps)。

```nginx
try_files $uri $uri/ /index.html;
```

参考资料：

- [手把手搭建 nginx 服务器，部署前端代码](https://segmentfault.com/a/1190000017940311)
- [Nginx + Node + Vue 部署初试](https://juejin.im/post/5c57c8be6fb9a049e55411e7)

完整代码

```nginx
worker_processes  1;

events {
    worker_connections  1024;
}

http {

    # 开启gzip压缩
    gzip  on;
    # 启用gzip压缩的最小文件，小于设置值的文件将不会压缩
    gzip_min_length 1k;
    # gzip 压缩级别，1-9，数字越大压缩的越好，也越占用CPU时间
    gzip_comp_level 9;
    # 进行压缩的文件类型。javascript有多种形式。其中的值可以在 mime.types 文件中找到。
    gzip_types text/plain application/json application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png application/vnd.ms-fontobject font/ttf font/opentype font/x-woff image/svg+xml;
    # 是否在http header中添加Vary: Accept-Encoding，建议开启
    gzip_vary on;

    server {
        listen          4201;
        server_name     localhost;
        root            /project_path;
        index           index.html;
        location / {
            try_files $uri $uri/ /index.html;
            index   index.html;
        }

        location /dapi/ {
            proxy_pass http://172.0.x.x:80;
        }
    }
}
```
