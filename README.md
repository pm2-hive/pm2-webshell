# pm2-webshell

[![GetBadges Game](https://pm2-hive-pm2-webshell.getbadges.io/shield/company/pm2-hive-pm2-webshell)](https://pm2-hive-pm2-webshell.getbadges.io/?ref=shield-game)

Fully capable Webshell

![PM2 SSH](https://github.com/pm2-hive/pm2-webshell/raw/master/preview.png)

## Install

```bash
$ pm2 install pm2-webshell
$ google-chrome http://localhost:8080
```

Default Username: foo

Default Password: bar

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
