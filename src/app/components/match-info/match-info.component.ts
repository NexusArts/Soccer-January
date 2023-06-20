import { Component, OnInit } from "@angular/core";
import { MatchService } from "src/app/services/match.service";

@Component({
  selector: "app-match-info",
  templateUrl: "./match-info.component.html",
  styleUrls: ["./match-info.component.css"],
})
export class MatchInfoComponent implements OnInit {
  foundMatch: any;
  constructor(private matchService: MatchService) {}

  ngOnInit() {
    let id = localStorage.getItem("id");
    this.matchService.getMatchById(id).subscribe((response) => {
      console.log("here response from BE", response.match);
      this.foundMatch = response.match;
    });
  }
}
