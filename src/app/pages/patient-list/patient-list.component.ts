import { Component } from '@angular/core';
import {Patient} from '../../core/models/patient';
import {PatientService} from '../../core/services/patient.service';
import {NgForOf, NgIf} from '@angular/common';
import {CreatePatientComponent} from '../create-patient/create-patient.component';
import {MatDialog} from '@angular/material/dialog';



@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css'
})
export class PatientListComponent {

  patients: Patient[] = [];
  loading: boolean = true;

  constructor(private patientService: PatientService,
              private dialog: MatDialog) {}

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
    const dialogRef = this.dialog.open(CreatePatientComponent, {
      width: 'auto',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Paciente creado:', result);
        this.getPatients(); // Recargar lista de pacientes si se creó uno nuevo
      }
    });
  }

}
