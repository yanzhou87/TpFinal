import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutoriel', 
  templateUrl: './tutoriel.component.html',
  styleUrls: ['./tutoriel.component.css']
})
export class TutorielComponent implements OnInit {
 
  constructor(private route:Router) { }
 
  ngOnInit(): void {
  }

  entrerT1():void{
    this.route.navigate(['/tutoriel/t1']);
  }
  entrerT2():void{
    this.route.navigate(['/tutoriel/t2']);
  }
  entrerT3():void{
    this.route.navigate(['/tutoriel/t3']);
  }
}
