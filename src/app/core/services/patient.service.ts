import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Patient} from '../models/patient';
import {endpoints} from '../../enviroments/endpoints';
import {VitalSigns} from '../models/vital-signs';
@Injectable({
  providedIn: 'root'
})
export class PatientService {





  constructor(private http: HttpClient) {}

  private getHttpOptions(): { headers: HttpHeaders } {
    const token = localStorage.getItem('jwt'); // Obtener el token del localStorage
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}` // Agregar el token como header
      })
    };
  }

  getAllPatient(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${endpoints.patients.path}/findAllPatient`,this.getHttpOptions());
  }

  getSignVitalByPatient(id: number): Observable<VitalSigns[]> {
    return this.http.get<VitalSigns[]>(`${endpoints.patients.path}/findSignVitalByPacientee/${id}`,this.getHttpOptions());
  }

  createPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${endpoints.patients.path}/createPatient`, patient,this.getHttpOptions());
  }

  updatePatient(patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${endpoints.patients.path}/updatePatient/${patient.id}`, patient,this.getHttpOptions());
  }

  deletePatient(id: number): Observable<void> {
    return this.http.delete<void>(`${endpoints.patients.path}/deletePatient/${id}`,this.getHttpOptions());
  }
}
