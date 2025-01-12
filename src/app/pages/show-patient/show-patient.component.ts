import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {Patient} from '../../core/models/patient';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-show-patient',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './show-patient.component.html',
  styleUrl: './show-patient.component.css'
})
export class ShowPatientComponent {

  patient: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.patient = navigation?.extras.state?.['patient'];
  }

  ngOnInit(): void {
    if (!this.patient) {
      this.router.navigate(['/patient-list']);
    }
  }

  onSubmit(): void {
    console.log('Datos guardados:', this.patient);
    alert('Los datos del paciente se han actualizado correctamente.');
    this.router.navigate(['/patient-list']);
  }

  onCancel(): void {
    this.router.navigate(['/patient-list']);
  }

}
