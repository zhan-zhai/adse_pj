使用lab2文件部署
## 一、安装docker-compose

* 1.下载命令：sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
* 2.修改权限：sudo chmod +x /usr/local/bin/docker-compose
* 3.安装成功查看版本：docker-compose --version

## 二、部署

上传lab2文件夹到服务器，进入lab2文件夹目录运行`docker-compose up -d`。
部署成功！！！