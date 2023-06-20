import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { WeatherService } from "src/app/services/weather.service";


@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.css"],
})
export class WeatherComponent implements OnInit {
  
  foundWeather:any;
  weatherSearchForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private weatherService: WeatherService,
  ) {}

  ngOnInit() {
    this.weatherSearchForm = this.formBuilder.group({
      city: ["", [Validators.required]],
    });
  }

 weatherSearch() {
    console.log("here city", this.weatherSearchForm.value);
    this.weatherService.searchWeather(this.weatherSearchForm.value.city).subscribe((result)=>{
      console.log("result", result);
this.foundWeather=result;
      console.log(this.foundWeather);
      
    });
}
}
