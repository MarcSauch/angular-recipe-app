import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Ingredient } from '../../interfaces/ingredient';
import { FormControl, FormGroup, FormsModule, Validators }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-ingredient',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule,FormsModule,ReactiveFormsModule, MatDialogModule, MatButtonModule],
  templateUrl: './add-ingredient.html',
  styleUrl: './add-ingredient.scss'
})
 
export class AddIngredient {
  name = new FormControl('');

  units : Array<string> = ['kg','cups','tbsp','tsp','']
   ingredient_form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    amount: new FormControl(null, [Validators.required, Validators.min(0.00001)]),
    unit: new FormControl('')
  });

  constructor(private dialogref : MatDialogRef<AddIngredient>)
  {
    
  }

  submit_form(): void {
    if (this.ingredient_form.valid) {
      this.dialogref.close(this.ingredient_form.value);
    }
  }

  close_popup(): void {
    this.dialogref.close();
  }


}
