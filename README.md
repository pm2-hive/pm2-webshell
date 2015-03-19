
# pm2-ssh

*SSH* to your server with a browser.

![PM2 SSH](https://github.com/pm2-hive/pm2-ssg/raw/master/preview.png)

## Install

```
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

# License

MIT
