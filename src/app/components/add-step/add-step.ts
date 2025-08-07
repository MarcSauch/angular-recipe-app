import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Step } from '../../interfaces/step';
import { FormControl, FormGroup, FormsModule, Validators }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TextFieldModule } from '@angular/cdk/text-field';

@Component({
  selector: 'app-add-step',
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatDialogModule, 
    MatButtonModule,
    TextFieldModule
  ],
  templateUrl: './add-step.html',
  styleUrl: './add-step.scss'
})
export class AddStep {
  step_from = new FormGroup({
    body: new FormControl('', Validators.required),
  });

  constructor(private dialogref : MatDialogRef<AddStep>)
  {
    
  }

  submit_form(): void {
    if (this.step_from.valid) {
      this.dialogref.close(this.step_from.value);
    }
  }

  close_popup(): void {
    this.dialogref.close();
  }

}
