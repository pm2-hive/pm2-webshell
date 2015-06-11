# pm2-webshell

Fully capable Webshell

## Install

```
$ pm2 install pm2-webshell
=======
Expose a web console from your server with this pm2 plugin. HTTPS capable with username/password authentication. Powered by [tty.js](https://github.com/chjj/tty.js/)

Need PM2 +0.12.7.

![PM2 SSH](https://github.com/pm2-hive/pm2-ssh/raw/master/preview.png)

## Install

```bash
$ npm install pm2 -g

$ pm2 install pm2-ssh
>>>>>>> 33efaedc2058fd922118fd03eddcaddde04f5539
$ google-chrome http://localhost:8080
```

Username: foo
Password: bar

## Configure

```
# Changer user
$ pm2 set pm2-webshell:username foo

# Change password
$ pm2 set pm2-webshell:password bar

# Change port
$ pm2 set pm2-webshell:port 7890

# HTTPS
$ pm2 set pm2-webshell:https true
````

## Uninstall

```bash
$ pm2 uninstall pm2-webshell
```

# License

MIT
