import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css']
})
export class DishdetailComponent implements OnInit {
  
  selectedDish:Dish;

  constructor(private dishService:DishService, private route:ActivatedRoute,
     private location:Location) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.dishService.getDish(id)
    .subscribe((selectedDish) => this.selectedDish = selectedDish);
  }
  
  goBack():void{
    this.location.back();
  }

}
