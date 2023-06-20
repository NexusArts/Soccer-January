import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  //Server Destination Address
  teamURL: string ="http://localhost:3000/api/teams";
  constructor(private httpClient: HttpClient) { }
 
 // Response: Array of objects
 getAllTeams(){
  return this.httpClient.get(this.teamURL);
 }
 
 //Response: One object
 //x: Match ID{4,7,...}
 getTeamById(x){
  return this.httpClient.get(`${this.teamURL}/${x}`);
  // return this.httpClient.get(this.matchURL + "/" + x);
 }
 
 //Response: Boolean
 //x: Match ID{4,7,...}
 deleteTeam(y){
  return this.httpClient.delete(`${this.teamURL}/${y}`);
 }
 
 //Response: Boolean
 //matchObj: {scoreOne,scoreTwo,...}
 addMatch(teamObj){
  return this.httpClient.post(this.teamURL, teamObj);
 }
 
 //Response: Boolean
 //newMatch: object with new values
 editMatch(newTeam){
  return this.httpClient.put(this.teamURL, newTeam);
 }
 
 
 
 }
 