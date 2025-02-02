import {Component, EventEmitter, Output,} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {PatientService} from '../../core/services/patient.service';
import {Router} from '@angular/router';

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

  constructor(private patientService: PatientService, private router: Router) {}

  onSubmit(form: any): void {
    if (form.valid) {
      let pacienteData = form.value;

      // Convertir fecha de nacimiento al formato correcto
      if (pacienteData.fechaNacimiento) {
        const fecha = new Date(pacienteData.fechaNacimiento);
        pacienteData.fechaNacimiento = fecha.toISOString().split('T')[0]; // Formato YYYY-MM-DD
      }

      this.patientService.createPatient(pacienteData).subscribe({
        next: (response) => {
          console.log('Paciente creado:', response);
          this.router.navigate(['/patients']); // Redirigir a la lista de pacientes
        },
        error: (error) => {
          console.error('Error al crear paciente:', error);
        },
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/patients']);
  }
}
