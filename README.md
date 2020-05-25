# pp-simple-privacy-server

Simple server for privacy related stuff. This is never intended for production, just to mock a secret management REST API for locally running node js apps.

`sps privacy.env`

Written in Typescript, this is very rudimentary Service Controller pattern for a REST API service.

* `PrivateServer.ts` - a class using http.server instance configured by importing `Controller.ts`. Method `listenNow()` is used to start the server listener.
* `Controller.ts` - creates an `http.server` with the `http.createServer()` class method supplying the requestListener function.
* `Service.ts` - a class implementing the various READ API calls supported by the simple privacy service.

## Steps to create a simple Typescript node.js http.server application server

```
mkdir pp-simple-privacy-server
yarn init
git init
yarn add typescript -D
# also used npm module express-generator-typescript to learn from,
# but in a different folder. Helped figure out the tsconfig.json
mkdir dist  # for the tsc compiler output
```
