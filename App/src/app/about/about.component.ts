import { Component, OnInit, Inject } from '@angular/core';
import { LeaderService } from '../services/leader.service';

import { Leader } from '../shared/leader';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  leaders:Leader[];

  constructor(private leaderService:LeaderService,
    @Inject('BaseURL') private baseURL) { }

  ngOnInit() {
    this.leaderService.getLeaders()
    .subscribe((leaders) => this.leaders = leaders);
  }

}
