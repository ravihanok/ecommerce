import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shoppinglist.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  private igChangeSub: Subscription;
  constructor(private shoppinglistService:ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppinglistService.getIngredients();
    this.igChangeSub = this.shoppinglistService.shoppingListItem.subscribe((ing:Ingredient[])=> {
      this.ingredients=ing;
    });
  }
  addIngredient(ingrediet:Ingredient){
    this.ingredients.push(ingrediet);
  }

  onEditItem(id:number){
    this.shoppinglistService.shoppingListEditItem.next(id);
  }
  ngOnDestroy(){
    this.igChangeSub.unsubscribe();
  }

}
