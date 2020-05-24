console.log('main starts');

import {PrivateServer} from "./PrivateServer";
import { Server } from "http";

export function main(){
    var myServer = new PrivateServer('privacy.env');
    myServer.listenNow();

}
main();
console.log('main exits');
