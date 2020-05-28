# Simple Privacy Service

## Description

[git repo](https://github.com/ppainter1958/pp-simple-privacy-service)

Simple server for privacy related stuff. This is never intended for production, just to mock a secret management REST API for locally running node js apps.

`sps privacy.env`

Written in Typescript, this is very rudimentary Service Controller pattern for a REST API service. Uses the `yarn` package manager. All done with javascript classes, interfaces and strong type checking with minimal use of node js modules beyond the builtin set. There are no `eslint` problems.

Input file is a `.env` file such as `privacy.env` or any file in the format suitable to module `node-env-file` with lines like `SOMEKEY=secretstring` and nothing else. The `privacy.env` is loaded setting the env variables for the sps instance when it runs as a server on `http://127.0.0.1:3000`. The REST API service returns values from process.env.

I utilize the [forever](https://www.npmjs.com/package/forever) npm module to run the service in the background with the follow powershell cli command run in the project directory:

```powershell
forever start --id "sps" -v --fifo --append --workingDir . -l $home\\logs\\sps.log   lib/index.js privacy.env
```

In the powershell $profile, I defined this shortcuts:

```powershell
function sps {forever start --id "sps" -v --fifo --append --workingDir . -l $home\\logs\\sps.log   lib/index.js privacy.env }
function spsStop {forever stopall}
```

## Code Structure

* `SimplePrivacyController.ts` - creates an `http.server` with the `http.createServer()` class method supplying the `requestListener()` function to the server as a callback. The controller is invoked with each REST API request, parses the route and parameters and calls the service appropriately. The controllor instatiates both the server and the service separately.
* `SimplePrivacyService.ts` - a class implementing the various API calls supported by the *Simple Privacy Service*.
* `SimplePrivacyServer.ts` - creates an instance of the node builtin class `http.server` for simple http requests. The listenerFunction is provided in the constructor parameters. The `listenNow()` method is used to start the server listener.

## Steps to create

### Using simple Typescript node.js http.server application server

```bash
mkdir pp-simple-privacy-server
yarn init
git init
yarn add typescript -D
# also used npm module express-generator-typescript to learn from,
# but in a different folder. It helped to figure out the minimal tsconfig.json
mkdir lib  # for the tsc compiler output .js files
mkdir src  # for the .ts files
```

## Special Notes

This was my first attempt at a minimalist Typescript node.js server-side app with little to no node modules or frameworks. There were some noob mysteries I had to solve along the way.

A note of gratitude for this [blog](https://blog.atomist.com/declaration-file-fix/) without which I would not have figured out how to set types for the old [node-env-file](https://www.npmjs.com/package/node-env-file) module.

Be sure to `.bind()` methods like `SimplePrivacyController.requestListener()` in the `constructor()` to avoid problems with `this`. Found that answer [here](https://ponyfoo.com/articles/binding-methods-to-class-instance-objects), a true right of passage.
