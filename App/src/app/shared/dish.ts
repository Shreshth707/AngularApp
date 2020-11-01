import { Comment } from './comment';

export class Dish{
    id: string;
    name: string;
    price:number;
    description:string;
    img:string;
    featured:boolean;
    comments:Comment[];
}