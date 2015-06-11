

# pm2-webshell

Fully capable Webshell

## Install

```
$ pm2 install pm2-webshell
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

# License

MIT
