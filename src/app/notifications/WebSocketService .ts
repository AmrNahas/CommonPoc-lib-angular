import {Injectable} from "@angular/core";

import * as SockJs from 'sockjs-client';
import * as Stomp from 'stompjs';
import {Constants} from "../models/utilites/Constants";

@Injectable()
export class WebSocketService {

    // Open connection with the back-end socket
    public connect() {
        let socket = new SockJs(Constants.URL + '/notify/socket');
        let stompClient = Stomp.over(socket);
        return stompClient;
    }
}
