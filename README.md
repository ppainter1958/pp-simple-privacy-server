# pp-simple-privacy-server

Simple server for privacy related stuff. This is never intended for production, just to mock a secret management REST API for locally running node js apps.

This is very rudimentary Service Controller pattern for a REST API service.

* Server.ts - instatiates the http.server contained in Controller.ts and invokes the listen method.
* Controller.ts - creates an http.server with the http.createServer() class method supplying the requestListener function.
