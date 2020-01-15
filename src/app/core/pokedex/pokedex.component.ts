import { Component, OnInit } from '@angular/core';
import {POKEDEX} from '@shared/objects/pkdex'
import {ApiService} from '@shared/services/api.service'
import { RouterModule, Routes,Router } from '@angular/router';


@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {
  pokedex=POKEDEX
  image:string[]=[]
  index=0
  data
  str="https://32wwqvjn96.execute-api.ap-southeast-1.amazonaws.com/dev/pkdex/pkmon/"
  
  
  constructor(private api:ApiService, private router:Router) { }

  ngOnInit() {
    let strpokedex=''
    console.log(this.pokedex)
    strpokedex=JSON.stringify(this.pokedex)
    localStorage.setItem("pokedex",strpokedex)
    if(localStorage.getItem('pokedex')){
      console.log('hello')
    }
    else{
      console.log('Error')
    }
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

  

changeHeading(){
  document.getElementById('type').style.background='yellow';
  console.log('Yellow')
}



async getPokemonData(id){
  var pokemonID
  var pokemonData
  pokemonID=id.replace(/#/g,"")
  pokemonData= await this.api.getPokemonData(this.str,pokemonID).toPromise()
  console.log(pokemonData)
  this.router.navigateByUrl('/profile')
  
  
  
}


}


