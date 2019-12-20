import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  pokemonData:any;
  pokemonID

  getPokemonData(str,id){
    this.pokemonID=id
    this.pokemonData=this.http.get(str+id)
    return this.pokemonData
  }
  getData(){
    return this.pokemonData
  }


}
