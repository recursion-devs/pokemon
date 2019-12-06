import { Component, OnInit } from '@angular/core';
import {POKEDEX} from '@shared/objects/pkdex'

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {
  pokedex=POKEDEX
  image:string[]=[]
  index=0
  
  constructor() { }

  ngOnInit() {
    console.log(this.pokedex)
    for (const name  in this.pokedex) {
      let img:string
      let holder:string
      if (this.pokedex.hasOwnProperty(name)) {
        
        holder=this.pokedex[name].id.toString().replace(/#/g,"");
        img="https://galardex.s3-ap-southeast-1.amazonaws.com/pkimage/"+holder+".png"
      }
      console.log(img)
      this.image.push(img)
    }
    
  }
  

}
