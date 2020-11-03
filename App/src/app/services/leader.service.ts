import { Injectable } from '@angular/core';

import { Leader } from '../shared/leader';
import { Observable, of } from 'rxjs';

import { baseURL } from '../shared/baseURL';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http:HttpClient) { }

  getLeaders():Observable<Leader[]>{
    return this.http.get<Leader[]>(baseURL + 'leaders');
  }

  getFeaturedLeader():Observable<Leader>{
    return  this.http.get<Leader>(baseURL + 'leaders?featured=true')
    .pipe(map(leader => leader[0]));
  }

}
