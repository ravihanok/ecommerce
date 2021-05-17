import { HttpClient, HttpHeaders } from "@angular/common/http";
import { InjectableCompiler } from "@angular/compiler/src/injectable_compiler";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shoppinglist.service";
import { Recipe } from "./recipe.model";


@Injectable({
    providedIn:'root'
})
export class RecipeService{
  
  baseUrl:string = "https://localhost:44320";
    constructor(private slService:ShoppingListService,private http:HttpClient){}
    selectedRecipe = new Subject<Recipe>();
    recipesEvent = new Subject<Recipe[]>();
    private recipes: Recipe[];
     headers:HttpHeaders;
     getRecipes():any {
       this.headers=  new HttpHeaders();
       this.headers.set('Access-Control-Allow-Origin','*');
        this.headers.set('content-type','application/json');
        return this.http.get(this.baseUrl+'/api/recipes',{headers:this.headers});
     }
     addToShoppingList(ingredients: Ingredient[]){
         this.slService.addIngredientsToShoppingList(ingredients);
     }
     getRecipe(id:number){
       return this.http.get<Recipe>(this.baseUrl+"/api/recipes/"+id);
     }
     addRecipe(recipe: Recipe) {
      
      return this.http.post(this.baseUrl+"/api/recipes",recipe);
      }
      
      updateRecipe(recipe:Recipe):Observable<any>{
       return this.http.put(this.baseUrl+"/api/recipes"+"/"+recipe.id,recipe);
      }

      deleteRecipe(id:number) {
        return this.http.delete(this.baseUrl+"/api/recipes/"+id);
      }

}