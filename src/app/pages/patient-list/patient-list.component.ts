import { Component } from '@angular/core';
import {Patient} from '../../core/models/patient';
import {PatientService} from '../../core/services/patient.service';
import {NgForOf, NgIf} from '@angular/common';
import {CreatePatientComponent} from '../create-patient/create-patient.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';



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

}
