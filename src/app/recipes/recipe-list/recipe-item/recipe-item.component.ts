import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe:Recipe;
  constructor(private recipeService:RecipeService,private router:Router) { }
  //@Output() recipeSelected = new EventEmitter<void>();
  ngOnInit(): void {
  }
  //onSelected(){
    //this.recipeService.selectedRecipe.emit(this.recipe);
   // this.router.navigate(['/recipe',this.recipe.id]);
 // }
}
