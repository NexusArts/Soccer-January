import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  matches: any =[
{scoreOne: 1, scoreTwo: 3, teamOne: "CA", teamTwo: "EST" },
{scoreOne: 2, scoreTwo: 0, teamOne: "UTD", teamTwo: "LIV" },
{scoreOne: 4, scoreTwo: 4, teamOne: "BAR", teamTwo: "RMD" }

  ];
  constructor() { }

  ngOnInit() {
  }

}
