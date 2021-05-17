import { FormControl } from "@angular/forms";

export class CustomValidators{
    static amountGreaterThanZero(control:FormControl):{[s:string]:boolean} {
        if((<number>control.value)<=0){
            return {'amountInvalid':true};    
        }
        else{
            return null;
        }
    }
}