import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes:Recipe[];
  //@Output() onItemClick= new EventEmitter<Recipe>();
  constructor(private recipeService:RecipeService,
    private route:ActivatedRoute,
    private router: Router
    ) { }
  //@Output() recipeWasSelected = new EventEmitter<Recipe>();
  ngOnInit(): void {
    this.recipes= this.recipeService.getRecipes()
    .subscribe(res=>{
      console.log(res);
    this.recipes = <Recipe[]>res;
    });
    this.router.events.subscribe((val) => {
     
    });

    this.recipeService.recipesEvent.subscribe(x=>{
      this.recipes= this.recipeService.getRecipes()
      .subscribe(res=>{
        console.log(res);
      this.recipes = <Recipe[]>res;
      });
    });
    
  }
  // onRecipeSelected(recipe: Recipe){
  //   this.recipeWasSelected.emit(recipe);
  // }

  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route});
  }
}
