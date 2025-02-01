import { Component } from '@angular/core';
import {Patient} from '../../core/models/patient';
import {PatientService} from '../../core/services/patient.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {Router} from '@angular/router';



@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgClass
  ],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css'
})
export class PatientListComponent {

  patients: Patient[] = [];
  loading: boolean = true;

  constructor(private patientService: PatientService,
              private router: Router) {}

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients(): void {
    this.patientService.getAllPatient().subscribe({
      next: (data) => {
        this.patients = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener pacientes:', error);
        this.loading = false;
      },
    });
  }

  onCreatePatient(): void {
    this.router.navigate(['/create-patient']);
  }

  onEditPatient(patient: any): void {
    this.router.navigate(['/edit-patient'], { state: { patient } });
  }

  onDeletePatient(patientId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este paciente?')) {
      this.patientService.deletePatient(patientId).subscribe({
        next: () => {
          this.getPatients();
        },
        error: (error) => {
          console.error('Error deleting patient:', error);
        },
      });
    }
  }

}
