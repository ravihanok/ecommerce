import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router, RouterStateSnapshot } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/shoppinglist.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
   recipe: Recipe;
  constructor(private recipeService:RecipeService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    //debugger;
    this.route.params.subscribe((r:Params)=>{
      //this.recipe = 
      this.recipeService.getRecipe(+r['id']).subscribe(res=>{
        this.recipe = res;
      });
    });
   
  }
  addToShopping(){
    this.recipeService.addToShoppingList(this.recipe.ingredients);
   
  }
  onEditRecipe(id:number){
    this.router.navigate(['edit'],{relativeTo:this.route});
  }
  onDeleteRecipe(){
    if(confirm('Are you sure you want to delete?')){
      this.recipeService.deleteRecipe(this.recipe.id).subscribe(res=>{
      this.router.navigate(['/recipe'],{relativeTo:this.route});
    });
    }
  }

}
