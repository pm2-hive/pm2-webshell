
This is a POC of the upcoming module system for PM2.

# pm2-ssh

Expose a web console from your server with this pm2 plugin. HTTPS capable with username/password authentication. Powered by [tty.js](https://github.com/chjj/tty.js/)

Need PM2 +0.12.7.

![PM2 SSH](https://github.com/pm2-hive/pm2-ssh/raw/master/preview.png)

## Install

```bash
$ pm2 install pm2-ssh
$ google-chrome http://localhost:8080
```

Username: foo
Password: bar

## Configure

```
# Changer user
$ pm2 set pm2-ssh:username foo

# Change password
$ pm2 set pm2-ssh:password bar

# Change port
$ pm2 set pm2-ssh:port 7890

# Use https
$ pm2 set pm2-ssh:https true
```

## Uninstall

```bash
$ pm2 uninstall pm2-ssh
```

# License

MIT
