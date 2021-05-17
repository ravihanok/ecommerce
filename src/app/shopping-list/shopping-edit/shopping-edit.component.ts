import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CustomValidators } from 'src/app/custom-validator';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shoppinglist.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  constructor(private shoppinglistService:ShoppingListService) { }
shoppingForm:FormGroup;
onlyRequired:boolean;
editMode = false;
shoppingListEditSubscription: Subscription;
  ngOnInit(): void {
    this.shoppingForm = new FormGroup({
      'name': new FormControl(null,Validators.required),
      'amount':new FormControl(null,[Validators.required,CustomValidators.amountGreaterThanZero]),
      'id': new FormControl(0)
    });
    this.onlyRequired = this.shoppingForm.get('amount').errors['required']&&this.shoppingForm.get('amount').errors['required'];
    this.shoppingListEditSubscription = this.shoppinglistService.shoppingListEditItem.subscribe(
      x=>{ 
        let ingr = this.shoppinglistService.getIngredient(x);

        this.shoppingForm.patchValue({
          'name':ingr.name,
          'amount':ingr.amount,
          'id':ingr.id
        });
        this.editMode =true;
      }
    );
  }
  addIngredient(name:string, amount:number){
    //var ing = new Ingredient(this.nameInputRef.nativeElement.value,amount);
    //this.onAdded.emit(ing);
    //this.shoppinglistService.addIngredient(ing);
    //this.shoppinglistService.shoppingListItem.emit(ing);
  }
  createIngredient(){
    if(this.shoppingForm.valid){
      if(this.editMode ==false)
      this.shoppinglistService.addIngredient( new Ingredient(0,<string>this.shoppingForm.get('name').value, +this.shoppingForm.get('amount').value));
      else{
        this.shoppinglistService.updateIngredient(new Ingredient(<number>this.shoppingForm.get('id').value,<string>this.shoppingForm.get('name').value, +this.shoppingForm.get('amount').value))
        this.editMode = false;
      }
      this.shoppingForm.reset();
    }
    else{
     console.log(this.shoppingForm.controls);
    }
    
   // this.shoppinglistService.shoppingListItem
   
  }
  onClear(){
    this.shoppingForm.reset();
    this.editMode =false;
  }
  onDelete(){
    if(confirm("are you sure you want to delete it."))
    this.editMode = false;
    this.shoppinglistService.deleteIngredient(+this.shoppingForm.get('id'));
    this.shoppingForm.reset();
  }
  ngOnDestroy(){
    this.shoppingListEditSubscription.unsubscribe();
  }
}
