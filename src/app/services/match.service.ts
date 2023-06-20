import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class MatchService {
  //Server Destination Address
  matchURL: string = "http://localhost:3000/api/matches";
  constructor(private httpClient: HttpClient) {}

  // Response: Array of objects
  getAllMatches() {
    return this.httpClient.get<{ matches: any }>(this.matchURL);
  }

  //Response: One object
  //x: Match ID{4,7,...}
  getMatchById(x) {
    return this.httpClient.get<{ match: any }>(`${this.matchURL}/${x}`);
    // return this.httpClient.get(this.matchURL + "/" + x);
  }

  //Response: Boolean
  //x: Match ID{4,7,...}
  deleteMatch(y) {
    return this.httpClient.delete(`${this.matchURL}/${y}`);
  }

  //Response: Boolean
  //matchObj: {scoreOne,scoreTwo,...}
  addMatch(matchObj) {
    return this.httpClient.post(this.matchURL, matchObj);
  }

  //Response: Boolean
  //newMatch: object with new values
  editMatch(newMatch) {
    return this.httpClient.put(this.matchURL, newMatch);
  }

  search(obj) {
    return this.httpClient.post<{ matchesFound: any }>(
      `${this.matchURL}/searchMatches`,
      obj
    );
  }
}
