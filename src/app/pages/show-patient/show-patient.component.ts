import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {Patient} from '../../core/models/patient';
import {FormsModule} from '@angular/forms';
import {PatientService} from '../../core/services/patient.service';

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

  constructor(private router: Router,private patientService: PatientService) {
    const navigation = this.router.getCurrentNavigation();
    this.patient = navigation?.extras.state?.['patient'];
  }



  onEdit(form: any): void {

      this.patientService.updatePatient(form).subscribe({
        next: (response) => {
          this.router.navigate(['/patient']); // Redirigir a la lista de pacientes
        },
        error: (error) => {
          console.error('Error al crear paciente:', error);
        },
      });

  }

  onCancel(): void {
    this.router.navigate(['/patient-list']);
  }

  onAddVitalSigns() {

  }
}
