import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../messages.service';
import { Message } from '../model/message';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  nom = "";
  courriel = "";
  text ="";
  message!:Message;
  constructor(private service:MessagesService ) {
   
   }

  ngOnInit(): void {
      this.message = {
        nom:"",
        text:"",
        courriel:""
      }
  }
  envoyer():void{
    console.log(this.nom);
    this.message.nom = this.nom;
    this.message.courriel = this.courriel;
    this.message.text = this.text;
    console.log(this.message);
    this.service.addMessage( this.message);
    console.log(this.message);
    this.nom = "";
    this.courriel = "";
    this.text ="";
  }

}
