import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({
    providedIn:'root'
})
export class ShoppingListService{
    shoppingListItem  = new Subject<Ingredient[]>();
    shoppingListEditItem = new Subject<any>();
    private ingredients: Ingredient[] =[
        new Ingredient(1,"Apples",5),
        new Ingredient(2,"Oranges",4)
    ];
    maxId():number {
       return Math.max.apply(Math,this.ingredients.map(x=> {return x.id;}));
    } 
    getIngredients(){
        return this.ingredients.slice();
    }
    addIngredient(ing:Ingredient){
         
       
        ing.id = this.maxId()+1;
        this.ingredients.push(ing);
        this.shoppingListItem.next(this.ingredients.slice());
    }
    addIngredientsToShoppingList(ingredients:Ingredient[]){
        for(var i = 1; i<= ingredients.length; i++){
            ingredients[i-1].id = this.maxId() +i;
        }
        this.ingredients.push(...ingredients);
        this.shoppingListItem.next(this.ingredients.slice());
    }
    
    getIngredient(id: number): Ingredient {
       return this.ingredients.find(x=>x.id==id);
    }
    updateIngredient(ingredient:Ingredient){
        let ingr = this.ingredients.find(x=>x.id === ingredient.id);
        ingr.name = ingredient.name;
        ingr.amount = ingredient.amount;

        this.shoppingListItem.next(this.ingredients.slice());
    }

    deleteIngredient(id:number){

        var indx = this.ingredients.indexOf(this.ingredients.find(i=>i.id===id));
        this.ingredients.splice(indx,1);
        this.shoppingListItem.next(this.ingredients.slice());
    }
}