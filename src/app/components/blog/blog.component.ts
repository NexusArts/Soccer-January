import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  articles: any= [
    {date: "12/09/2022",description: "abcdefgh",title:"Title 1",img:"assets/images/img_1.jpg"},
    {date: "24/03/2022",description: "abcdefgh",title:"Title 2",img:"assets/images/img_1.jpg"},
    {date: "11/11/2023",description: "abcdefgh",title:"Title 3",img:"assets/images/img_1.jpg"}
    
  ]
  constructor() { }

  ngOnInit() {
  }

}
