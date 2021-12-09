import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Identification } from '../../model/recipe';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-connecter',
  templateUrl: './connecter.component.html',
  styleUrls: ['./connecter.component.css']
})
export class ConnecterComponent implements OnInit {

  name ='';
  password='';
  compte!:string;
  error!:HttpErrorResponse; 
  constructor(private service : RecipeService, private route:Router) { }

  ngOnInit(): void {
 
  }

  connecterMonCompte():void{
    
    this.service.connecter(this.name,this.password).subscribe({
      next:(c:Identification) =>{
        console.log("com    ", c);
        this.compte = c.data;
        this.error = this.error;
        this.service.setToken(this.compte);
        this.route.navigate(['/editnewrecipe']);
  },
      error:(error)=>{
         console.log("Erreur", error);
         this.error = error;
      }
    });
  }
}
