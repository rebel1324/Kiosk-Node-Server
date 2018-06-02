# Kiosk-Node-Server

Kiosk push notification server.

## Getting Started

- How to clone project
```
git clone https://github.com/Kiosk-project/Kiosk-Node-Server.git
```

- How to run locally
```
heroku local web
```

- How to scale up / down heroku dyno

```
heroku ps:scale web=<number of container>
```

- Export env var

```
heroku config:get <VAR NAME> -s >> .env
```

### Prerequisites

- Install npm version `v3.10.10`
- Install node version `v6.11.5`
- Install heroku version `heroku/7.0.61 darwin-x64 node-v10.2.1`

### Installing

A step by step series of examples that tell you how to get a development env running

Just see the [tutorial](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)

### And coding style 

- Class, File name, Method

```
ThisIsClassName
```

- Normal var
```
thisIsVar
```

- Static var
```
THIS_IS_STATIC_VAR
```

## Deployment

Add additional notes about how to deploy this on a live system

```
git push heroku master
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details
