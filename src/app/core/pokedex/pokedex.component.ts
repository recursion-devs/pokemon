import { Component, OnInit } from '@angular/core';
import { POKEDEX } from '@shared/objects/pkdex'
import { ApiService } from '@shared/services/api.service'
import { RouterModule, Routes,Router } from '@angular/router';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {
  showContent = ''
  pokedex=POKEDEX
  image:string[]=[]
  index=0
  data
  str="https://32wwqvjn96.execute-api.ap-southeast-1.amazonaws.com/dev/pkdex/pkmon/"

  constructor(
    private api:ApiService,
    private router:Router,
  ) { }

  ngOnInit() {
    this.pokedex.forEach(pokemon => {
      let pokemonId = pokemon.id.replace(/#/g,"")
      let imgLink ="https://galardex.s3-ap-southeast-1.amazonaws.com/pkimage/"+pokemonId+".png"

      pokemon["img_link"] = imgLink
      pokemon["show_content"] = 'mainData'
    });

    // console.log(this.pokedex)

    // this.showContent = 'mainData';
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

  onClickOffense(pokemon){
    let index = this.pokedex.indexOf(pokemon);
    this.pokedex[index]["show_content"] = 'offenseData';
  }

  onClickDefender(pokemon){
    let index = this.pokedex.indexOf(pokemon);
    this.pokedex[index]["show_content"] = 'defenderData';
  }

  onClickReturn(pokemon){
    let index = this.pokedex.indexOf(pokemon);
    this.pokedex[index]["show_content"] = 'mainData';
  }
}


