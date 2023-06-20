import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  players: any= [
    {name: "Messi",position: "MID",number:"10"},
    {name: "CR7",position: "ATK",number:"7"}
  ]
  constructor() { }

  ngOnInit() {
  }

}
