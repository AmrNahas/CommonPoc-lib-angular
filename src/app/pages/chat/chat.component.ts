import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { Chat } from './chat.model';
import { ChatService } from './chat.service';
import {WebSocketService} from "../../notifications/WebSocketService ";
import {AuthService} from "../../AuthModule/AuthService";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [ ChatService ]
})
export class ChatComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  public settings: Settings;
  public userImage = 'assets/img/users/user.jpg';
  public chats: Array<Chat>;
  public talks: Array<Chat>;
  public sidenavOpen:boolean = true;
  public currentChat:Chat;
  public newMessage:string;
  public userName: String;

  constructor(public appSettings:AppSettings, private chatService:ChatService,private webSocketService:WebSocketService,private authService:AuthService) {
    this.settings = this.appSettings.settings;
    this.authService.getUserNameAuth().subscribe(item => {
      if (item) {
        this.userName = item.userName;
       // this.subscribeNotifications();

      }
    })
  }
  //
  // subscribeNotifications() {
  //   stompClient.subscribe('/topic/public', this.onMessageReceived());
  //   let stompClient = this.webSocketService.chatConnect();
  //   stompClient.connect({}, frame => {
  //     // Subscribe to notification topic
  //
  //     stompClient.subscribe('/topic/public' + this.userName + '/queue/notification', notifications => {
  //       let num: number = JSON.parse(notifications.body).count;
  //       this.notifications = num > 0 ? num : null;
  //     })
  //   });
  // }

    onMessageReceived(payload) {
    var message = JSON.parse(payload.body);
    var messageElement = document.createElement('li');

    if(message.type === 'JOIN') {
      messageElement.classList.add('event-message');
      message.content = message.sender + ' joined!';
    } else if (message.type === 'LEAVE') {
      messageElement.classList.add('event-message');
      message.content = message.sender + ' left!';
    } else {
      messageElement.classList.add('chat-message');

      var avatarElement = document.createElement('i');
      var avatarText = document.createTextNode(message.sender[0]);
      avatarElement.appendChild(avatarText);
      //avatarElement.style['background-color'] = getAvatarColor(message.sender);

      messageElement.appendChild(avatarElement);

      var usernameElement = document.createElement('span');
      var usernameText = document.createTextNode(message.sender);
      usernameElement.appendChild(usernameText);
      messageElement.appendChild(usernameElement);
    }

    var textElement = document.createElement('p');
    var messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);

    messageElement.appendChild(textElement);

    // messageArea.appendChild(messageElement);
    // messageArea.scrollTop = messageArea.scrollHeight;
  }


  //

  ngOnInit() {
    this.chats = this.chatService.getChats(); 
    if(window.innerWidth <= 768){
      this.sidenavOpen = false;
    }    
  } 

  @HostListener('window:resize')
  public onWindowResize():void {
    (window.innerWidth <= 768) ? this.sidenavOpen = false : this.sidenavOpen = true;
  }

  public getChat(obj){
    if(this.talks){
       this.talks.length = 2;
    }   
    this.talks = this.chatService.getTalk();
    this.talks.push(obj);
    this.currentChat = obj;      
    this.talks.forEach(talk => {
      if(!talk.my){
        talk.image = obj.image;
      }
    });
    if(window.innerWidth <= 768){
      this.sidenav.close();
    }     
  }

  public sendMessage($event) {       
    if (($event.which === 1 || $event.which === 13) && this.newMessage.trim() != '') {
      if(this.talks){ 
        this.talks.push(
            new Chat(
              'assets/img/users/user.jpg', 
              'Emilio Verdines', 
              'online', 
              this.newMessage,
              new Date(), 
              true)
        )
        this.newMessage = '';
        let chatContainer = document.querySelector('.chat-content');
        if(chatContainer){
          setTimeout(() => {
            var nodes = chatContainer.querySelectorAll('.mat-list-item');
            let newChatTextHeight = nodes[nodes.length- 1];
            chatContainer.scrollTop = chatContainer.scrollHeight + newChatTextHeight.clientHeight;
          }); 
        }
      }
    }
  }

  public ngOnDestroy(){
    if(this.talks)
      this.talks.length = 2;
  }

}
