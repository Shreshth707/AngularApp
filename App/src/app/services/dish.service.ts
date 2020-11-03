import { Injectable } from '@angular/core';

import { DISHES } from '../shared/dishes';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseURL';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient) { }

  getDishes():Observable<Dish[]>{
    return this.http.get<Dish[]>(baseURL + 'dishes');
  }

  getDish(id: string): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id);
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]));
  }

  getDishIds(): Observable <string[] | any >{
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)));
  }

  addComment(dish:Dish,comment:Comment){
    dish.comments.push(comment);
  }

}
