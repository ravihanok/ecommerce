import { ANALYZE_FOR_ENTRY_COMPONENTS, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id:number;
  editMode = false;
  recipeEditForm: FormGroup;
  previewImg:string ='';
  constructor(private route:ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id = +params['id'];
      this.editMode = params['id']!=null; 
      this.initForm();
    });

  }

  initForm(){
    let rId = 0;
    let name='';
    let imagePath = '';
    let description ='';
    let recipeIngredients = new FormArray([]);
    this.recipeEditForm = new FormGroup({
      'name':new FormControl(name,Validators.required),
      'id':new FormControl(rId),
      'imagePath':new FormControl(imagePath,Validators.required),
      'description': new FormControl(description,Validators.required),
      'ingredients': recipeIngredients
    }); 
    if(this.editMode){
      this.recipeService.getRecipe(this.id).subscribe(recipe=>{
        rId = recipe.id;
         name =  recipe.name;
      imagePath = recipe.imagePath;
      this.previewImg = recipe.imagePath;
      description = recipe.description;
      this.recipeEditForm.controls['name'].setValue(name);
      this.recipeEditForm.controls['imagePath'].setValue(imagePath);
      this.recipeEditForm.controls['id'].setValue(rId);
      this.recipeEditForm.controls['description'].setValue(description);
      if(recipe['ingredients']){
        for(let ing of recipe.ingredients){
          recipeIngredients.push(new FormGroup({
            'name':new FormControl(ing.name,Validators.required),
            'amount':new FormControl(ing.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]/)]),
            'id':new FormControl(ing.id),

          }));
        }
      
      }
      });
    }
    
  }
  get arrayControls(){
    return (<FormArray>this.recipeEditForm.get('ingredients')).controls;
  }
  onCancelRecipe(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  onSaveRecipe(){
     let rId = 0;
    let name='';
    let imagePath = '';
    let description ='';
    let recipesList = [];
    if(this.editMode){
      let rcp = this.recipeService.getRecipe(this.id);
      name = <string>this.recipeEditForm.get('name').value;
     
      imagePath = <string>this.recipeEditForm.get('imagePath').value;
      description = <string>this.recipeEditForm.get('description').value;
      
      if((<FormArray>this.recipeEditForm.get('ingredients')).length>0){

      }
      let rot = this.router;
     // let recipe = new Recipe(rcp.id,name,description,imagePath,[]);
      this.recipeService.updateRecipe(this.recipeEditForm.value).subscribe(res=>{
        debugger;
        console.log(res);
        rot.navigate(['../'],{relativeTo:this.route});
        this.recipeService.recipesEvent.next();
      });;
    }
    else{
      name = <string>this.recipeEditForm.get('name').value;
      imagePath = <string>this.recipeEditForm.get('imagePath').value;
      description = <string>this.recipeEditForm.get('description').value;
      let recipe = new Recipe(0,name,description,imagePath,[]);
      this.recipeService.addRecipe(this.recipeEditForm.value).subscribe(res=>{
        this.router.navigate(['../'],{relativeTo:this.route});
        this.recipeService.recipesEvent.next();
      });
    }
   
  }
  addIngredient(){
    (<FormArray>this.recipeEditForm.get('ingredients')).push(new FormGroup({
      'name':new FormControl(null,Validators.required),
      'amount': new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]|[1-9][0-9]/)]),
      'id': new FormControl(0)
    }));
  }

  putRecipe(){
    let rId = 0;
    let name='';
    let imagePath = '';
    let description ='';
    let recipesList = [];
    if(this.editMode){
      let rcp = this.recipeService.getRecipe(this.id).subscribe(res=>{
        name = <string>this.recipeEditForm.get('name').value;
        imagePath = <string>this.recipeEditForm.get('imagePath').value;
        description = <string>this.recipeEditForm.get('description').value;
        
        if((<FormArray>this.recipeEditForm.get('ingredients')).length>0){
  
        }
       // let recipe = new Recipe(rcp.id,name,description,imagePath,[]);
       let rot = this.router;
       this.recipeService.updateRecipe(this.recipeEditForm.value).subscribe(res=>{
        debugger;
        console.log(res);
        this.router.navigate(['../'],{relativeTo:this.route});
        this.recipeService.recipesEvent.next();
      });;        //this.recipeService.updateRecipe(recipe);
      });
    
    }
    else{
      name = <string>this.recipeEditForm.get('name').value;
      imagePath = <string>this.recipeEditForm.get('imagePath').value;
      description = <string>this.recipeEditForm.get('description').value;
      let recipe = new Recipe(0,name,description,imagePath,[]);
      this.recipeService.addRecipe(this.recipeEditForm.value).subscribe(res=>{
        console.log(res);
      //  alert('saved recipe');
        this.router.navigate(['../'],{relativeTo:this.route});
        this.recipeService.recipesEvent.next();
      });
    }
   
  }
  onDeleteIngredient(i:number){
    this.recipeService.deleteRecipe(i).subscribe(res=>{
      this.router.navigate(['/recipe'],{relativeTo:this.route});
      this.recipeService.recipesEvent.next();
    });
    //(<FormArray>this.recipeEditForm.get('ingredients')).removeAt(i);
  }

}
