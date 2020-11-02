import { Injectable } from '@angular/core';

import { LEADERS } from '../shared/leaders';
import { Leader } from '../shared/leader';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders():Observable<Leader[]>{
    return of (LEADERS);
  }

  getFeaturedLeader():Observable<Leader>{
    return of (LEADERS.filter((leader)=>leader.featured)[0]);
  }

}
