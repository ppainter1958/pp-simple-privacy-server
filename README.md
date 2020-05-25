# Simple Privacy Service

## Description

[git repo](https://github.com/ppainter1958/pp-simple-privacy-server)

Simple server for privacy related stuff. This is never intended for production, just to mock a secret management REST API for locally running node js apps.

`sps privacy.env`

Written in Typescript, this is very rudimentary Service Controller pattern for a REST API service.

Input file `privacy.env` as any file in the format suitable to module `node-env-file` with lines like `SOMEKEY=secretstring` and nothing else. The `privacy.env` is loaded setting the env variables for the sps instance when it runs as a server on `http://127.0.0.1:3000`.


* `SimplePrivacyServer.ts` - a class using http.server instance configured by importing `SimplePrivacyController.ts` using method `listenNow()` is used to start the server listener.
* `SimplePrivacyController.ts` - creates an `http.server` with the `http.createServer()` class method supplying the requestListener function.
* `SimplePrivacyService.ts` - a class implementing the various READ API calls supported by the *Simple Privacy Service*.

## Steps to create

### Using simple Typescript node.js http.server application server

TODO: show powershell alias for sps using forever to run the script.

```
mkdir pp-simple-privacy-server
yarn init
git init
yarn add typescript -D
# also used npm module express-generator-typescript to learn from,
# but in a different folder. Helped figure out the tsconfig.json
mkdir dist  # for the tsc compiler output
```
