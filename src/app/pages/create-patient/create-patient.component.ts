import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-create-patient',
  standalone: true,
  imports: [
    MatDialogContent,
    MatInputModule,
    FormsModule,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatDialogTitle
  ],
  templateUrl: './create-patient.component.html',
  styleUrl: './create-patient.component.css'
})
export class CreatePatientComponent {

  constructor() {}


}
