import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

 //Server Destination Address
 playerURL: string ="http://localhost:3000/api/players";
 constructor(private httpClient: HttpClient) { }

// Response: Array of objects
getAllPlayers(){
 return this.httpClient.get(this.playerURL);
}

//Response: One object
//x: Match ID{4,7,...}
getPlayerById(x){
 return this.httpClient.get(`${this.playerURL}/${x}`);
 // return this.httpClient.get(this.matchURL + "/" + x);
}

//Response: Boolean
//x: Match ID{4,7,...}
deletePlayer(y){
 return this.httpClient.delete(`${this.playerURL}/${y}`);
}

//Response: Boolean
//matchObj: {scoreOne,scoreTwo,...}
addMatch(playerObj){
 return this.httpClient.post(this.playerURL, playerObj);
}

//Response: Boolean
//newMatch: object with new values
editMatch(newPlayer){
 return this.httpClient.put(this.playerURL, newPlayer);
}



}
