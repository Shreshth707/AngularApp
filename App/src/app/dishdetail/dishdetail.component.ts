import { Component, OnInit ,ViewChild, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { Comment } from '../shared/comment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css']
})
export class DishdetailComponent implements OnInit {
  
  dishIds: string[];
  prev: string;
  next: string;
  
  selectedDish:Dish;

  commentForm:FormGroup;
  comment:Comment;
  @ViewChild('cform') feedbackFormDirective;
  
  formErrors = {
    'author': ''
  };

  validationMessages = {
    'author': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    }
  };

  constructor(private dishService:DishService, private route:ActivatedRoute,
     private location:Location, private fb:FormBuilder,
     @Inject('BaseURL') private baseURL) { 
       this.createForm();
     }

  ngOnInit() {
    this.dishService.getDishIds().subscribe((dishIds) => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params:Params) => this.dishService.getDish(params['id'])))
    .subscribe((selectedDish) => { this.selectedDish = selectedDish , this.setPrevNext(selectedDish.id) });
  }

  setPrevNext(dishId : string){
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    console.log(this.prev + " " +this.next);
  }

  goBack():void{
    this.location.back();
  }

  createForm(){
    this.commentForm = this.fb.group({
      rating:[5, [Validators.required]],
      comment:['', [Validators.required, Validators.minLength(2)]],
      author:['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ]
    });

    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now

  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    let date = new Date();
    this.comment = this.commentForm.value;
    this.comment.date = date.toString();
    this.dishService.addComment(this.selectedDish, this.comment);
    console.log(this.comment);
    this.commentForm.reset({
      rating: 5,
      comment: '',
      author: '',
      date: ''
    });
  }
  
}
