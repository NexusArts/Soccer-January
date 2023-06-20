import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatchService } from "src/app/services/match.service";

@Component({
  selector: "app-search-matches",
  templateUrl: "./search-matches.component.html",
  styleUrls: ["./search-matches.component.css"],
})
export class SearchMatchesComponent implements OnInit {
  foundMatches: any;
  matches: any;
  searchForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private matchService: MatchService
  ) {}

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      scoreOne: ["", [Validators.required]],
      scoreTwo: ["", [Validators.required]],
    });
  }

  search() {
    this.matchService.search(this.searchForm.value).subscribe((response) => {
      this.matches = response.matchesFound;
    });
  }
}
