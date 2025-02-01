import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientService } from '../../core/services/patient.service';
import { VitalSignsService } from '../../core/services/vital-signs.service';
import { VitalSigns } from '../../core/models/vital-signs';
import { NgForOf } from '@angular/common';
import Swal from 'sweetalert2';
import {Patient} from '../../core/models/patient';


declare var bootstrap: any;

@Component({
  selector: 'app-show-patient',
  standalone: true,
  templateUrl: './show-patient.component.html',
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  styleUrls: ['./show-patient.component.css']
})
export class ShowPatientComponent implements OnInit{
  patientForm: FormGroup;
  vitalSignsForm: FormGroup;
  vitalSignsHistory: VitalSigns[] = [];
  patientId: number;
  loading: boolean = true;

  private static readonly MIN_PRESION_ARTERIAL = 50;
  private static readonly MAX_PRESION_ARTERIAL = 120;
  private static readonly MIN_NIVEL_OXIGENO = 90;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private patientService: PatientService,
    private signs: VitalSignsService
  ) {
    const navigation = this.router.getCurrentNavigation();
    const patientData = navigation?.extras.state?.['patient'];
    this.patientId = patientData?.id || null;

    this.patientForm = this.fb.group({
      rut: [patientData?.rut || '', Validators.required],
      nombre: [patientData?.nombre || '', Validators.required],
      apellido: [patientData?.apellido || '', Validators.required],
      fechaNacimiento: [patientData?.fechaNacimiento || '', Validators.required],
      edad: [patientData?.edad || '', Validators.required],
      direccion: [patientData?.direccion || '', Validators.required],
      telefono: [patientData?.telefono || '', Validators.required],
      alertaNivel: [patientData?.alertaNivel || 'BAJA', Validators.required],
    });

    this.vitalSignsForm = this.fb.group({
      frecuenciaCardiaca: ['', [Validators.required]],
      presionArterial: ['', [Validators.required]],
      nivelOxigeno: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getSignVitalByPatients(this.patientId)
  }

  onEdit(): void {
    if (this.patientForm.valid) {
      const body: Patient = {
        id: this.patientId,
        rut: this.patientForm.get('rut')?.value,
        nombre:this.patientForm.get('nombre')?.value,
        apellido: this.patientForm.get('apellido')?.value,
        direccion: this.patientForm.get('direccion')?.value,
        fechaNacimiento: this.patientForm.get('fechaNacimiento')?.value,
        edad: this.patientForm.get('edad')?.value,
        telefono: this.patientForm.get('telefono')?.value,
        alertaNivel:this.patientForm.get('alertaNivel')?.value
      };
      this.patientService.updatePatient(body).subscribe({
        next: () => this.router.navigate(['/patient']),
        error: (error) => console.error('Error al actualizar paciente:', error),
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/patients']);
  }

  openVitalSignsModal(): void {
    this.vitalSignsForm.reset();
    const modalElement = document.getElementById('vitalSignsModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  addVitalSign(): void {
    if (this.vitalSignsForm.valid && this.patientId) {
      const signs: VitalSigns = {
        pacienteId: this.patientId,
        frecuenciaCardiaca: this.vitalSignsForm.get('frecuenciaCardiaca')?.value,
        nivelOxigeno: this.vitalSignsForm.get('nivelOxigeno')?.value,
        presionArterial: this.vitalSignsForm.get('presionArterial')?.value,
      };

      if (this.isAnomalous(signs)) {
        Swal.fire({
          icon: 'warning',
          title: '¡Alerta!',
          text: 'Los signos vitales son anómalos y requieren atención inmediata.',
        });
      }

      this.signs.createVitalSignsAlert(signs).subscribe(rsp => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Signos vitales guardados correctamente.',
        });
      });
      this.signs.createVitalSignsSummary(signs).subscribe(rsp => {
      });

      const modalElement = document.getElementById('vitalSignsModal');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal?.hide();
        this.getSignVitalByPatients(this.patientId);
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos correctamente antes de guardar.',
      });
    }
  }

  private isAnomalous(signs: VitalSigns): boolean {
    return (
      signs.presionArterial < ShowPatientComponent.MIN_PRESION_ARTERIAL ||
      signs.presionArterial > ShowPatientComponent.MAX_PRESION_ARTERIAL ||
      signs.nivelOxigeno < ShowPatientComponent.MIN_NIVEL_OXIGENO
    );
  }


  getSignVitalByPatients(id: number): void {
    this.patientService.getSignVitalByPatient(id).subscribe({
      next: (data) => {
        this.vitalSignsHistory = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener pacientes:', error);
        this.loading = false;
      },
    });
  }


}
