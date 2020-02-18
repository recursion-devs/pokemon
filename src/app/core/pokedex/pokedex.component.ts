import { Component, OnInit, AfterViewInit } from '@angular/core';
import { POKEDEX } from '@shared/objects/pkdex';
import {OFFENSE} from '@shared/objects/offense';
import { ApiService } from '@shared/services/api.service'
import { RouterModule, Routes,Router } from '@angular/router';
import { Pokemon } from '@app/shared/objects/pokemon';


@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {
  showContent = ''
  
  pokedex
  list_pokedex=POKEDEX
  offense=OFFENSE
  image:string[]=[]
  index=0
  data
  loading=true
  searchStr=""
  
  

  constructor(
    private api:ApiService,
    private router:Router,
  ) { }

  async ngOnInit() {
    this.loading=true
    this.getData()
    // console.log(this.pokedex)
    // this.showContent = 'mainData';
    this.loading=false
  }

  
 
  getData(){
    console.log(this.list_pokedex)
    this.list_pokedex.forEach(pokemon => {
      let offense_name=[]
      let offense_class
      let offense_damage=[]
      this.offense.forEach(offense => {
        if(pokemon['type']['standard'][0]==offense.type){
          
          offense_class=offense.class
        }
  
      });
      for(var key in offense_class){
        if(offense_class.hasOwnProperty(key)){
          offense_name.push(key)
          offense_damage.push(offense_class[key])
        }
      }
      let pokemonId = pokemon.id.replace(/#/g,"")
      let imgLink ="https://galardex.s3-ap-southeast-1.amazonaws.com/pkimage/"+pokemonId+".png"
      pokemon["offense_name"]=offense_name
      pokemon["offense_damage"]=offense_damage
      pokemon["img_link"] = imgLink
      pokemon["show_content"] = 'mainData'
      
    });
    this.pokedex=this.list_pokedex
    this.loading=false
  }
  changeHeading(){
    document.getElementById('type').style.background='yellow';
    console.log('Yellow')
  }

 
  onClickOffense(pokemon){
    let index = this.pokedex.indexOf(pokemon);
    
    
    this.pokedex[index]["show_content"] = 'offenseData';
    console.log(index)
  }

  onClickDefender(pokemon){
    let index = this.pokedex.indexOf(pokemon);
    this.pokedex[index]["show_content"] = 'defenderData';
    
  }

  onClickReturn(pokemon){
    let index = this.pokedex.indexOf(pokemon);
    this.pokedex[index]["show_content"] = 'mainData';
  }

  onClickProfile(pokemon){
    let id = pokemon.id.toLowerCase();
    id=id.substring(1,id.length)
    console.log(id)
    this.router.navigate(['/profile',id])
    
  }
  async search(str){
    this.loading=true
    this.searchStr=str
    
    if(this.searchStr){
      this.getSearchData(this.searchStr)
    }
    else{
    await this.getData()
    
    }
  }

  getSearchData(str){
    this.pokedex=[]
    this.list_pokedex.forEach(pokemon => {
      if (pokemon.name.toLowerCase().includes(str.toLowerCase())){
        
       this.pokedex.push(pokemon)
      }
    });
    this.loading=false
    
  }
}



