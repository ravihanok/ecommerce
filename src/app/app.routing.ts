import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "./not-found/not-found.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipes/recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipes/recipe-list/recipe-list.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingEditComponent } from "./shopping-list/shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";


export const routes:Routes =[
    {path:'recipe',component:RecipesComponent,children:[
        {path:'recipe-list',component:RecipeListComponent},
        {path:'new',component:RecipeEditComponent},
        {path:':id',component:RecipeDetailComponent},
        {path:':id/edit',component:RecipeEditComponent},
        ]
    },
    {path:'shopping',component:ShoppingListComponent,
     children:[
        {path:'edit',component:ShoppingEditComponent}
        ]
    },
     {path:'', redirectTo:'recipe',pathMatch:'full'},
     {path:'**',component:NotFoundComponent}    
];

@NgModule({
    imports:
    [RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{

}