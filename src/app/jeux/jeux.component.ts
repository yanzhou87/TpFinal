import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jeux',
  templateUrl: './jeux.component.html',
  styleUrls: ['./jeux.component.css']
})
export class JeuxComponent implements OnInit {

  imgDefaul1 = "/assets/img/0.jpg";
  imgDefaul2 = "/assets/img/0.jpg";
  imgDefaul3 = "/assets/img/0.jpg";
  imgDefaul4 = "/assets/img/0.jpg";
 
  isBravo = "";
  constructor() { }

  ngOnInit(): void {
  }

  inverserCard1():void{
    this.imgDefaul1="/assets/img/1.jpg";
    if(this.imgDefaul2 !== this.imgDefaul4){
      this.imgDefaul4 = "/assets/img/0.jpg";
      this.imgDefaul2 = "/assets/img/0.jpg";
      this.imgDefaul3 = "/assets/img/0.jpg";
    }
    if(this.comparer()){
      this.isBravo="Bravo!!!";
    }
    
    console.log(this.imgDefaul1);
    console.log(this.comparer());
  }

  inverserCard2():void{
    this.imgDefaul2="/assets/img/2.jpg";
    if(this.imgDefaul1 !== this.imgDefaul3){
      this.imgDefaul1 = "/assets/img/0.jpg";
      this.imgDefaul4 = "/assets/img/0.jpg";
      this.imgDefaul3 = "/assets/img/0.jpg";
    }
    if(this.comparer()){
      this.isBravo="Bravo!!!";
    }
 
    console.log(this.imgDefaul2);
    console.log(this.comparer());
  }

  inverserCard3():void{
    this.imgDefaul3="/assets/img/1.jpg";
    if(this.comparer()){
      this.isBravo="Bravo!!!";
    }
   
    if(this.imgDefaul2 !== this.imgDefaul4){
      this.imgDefaul1 = "/assets/img/0.jpg";
      this.imgDefaul2 = "/assets/img/0.jpg";
      this.imgDefaul4 = "/assets/img/0.jpg";
    }
   
    console.log(this.comparer());
    console.log(this.imgDefaul3);
  }

  inverserCard4():void{
    this.imgDefaul4="/assets/img/2.jpg";
     if(this.comparer()){
       this.isBravo="Bravo!!!";
    }

    if(this.imgDefaul1 !== this.imgDefaul3){
      this.imgDefaul1 = "/assets/img/0.jpg";
      this.imgDefaul2 = "/assets/img/0.jpg";
      this.imgDefaul3 = "/assets/img/0.jpg";
    }

  }
  
  comparer():boolean{
    if(this.imgDefaul1 === this.imgDefaul3 && this.imgDefaul2 === this.imgDefaul4 
      && this.imgDefaul1 != "/assets/img/0.jpg"  && this.imgDefaul2 != "/assets/img/0.jpg" 
       && this.imgDefaul3 != "/assets/img/0.jpg"  && this.imgDefaul4 != "/assets/img/0.jpg"){
        return true;
    }
    return false;
  }

  recommencer():void{
    this.imgDefaul1 = "/assets/img/0.jpg";
    this.imgDefaul2 = "/assets/img/0.jpg";
    this.imgDefaul3 = "/assets/img/0.jpg";
    this.imgDefaul4 = "/assets/img/0.jpg";
    this.isBravo="";
  }
}
