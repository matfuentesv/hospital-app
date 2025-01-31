import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Patient} from '../models/patient';
import {endpoints} from '../../enviroments/endpoints';
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
    return this.http.get<Patient[]>(`${endpoints.findAllPatient.path}/findAllPatient`,this.getHttpOptions());
  }

  getPatient(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${endpoints.findAllPatient.path}/findPatient/${id}`,this.getHttpOptions());
  }

  createPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${endpoints.findAllPatient.path}/createPatient`, patient,this.getHttpOptions());
  }

  updatePatient(patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${endpoints.findAllPatient.path}/updatePatient/${patient.id}`, patient,this.getHttpOptions());
  }

  deletePatient(id: number): Observable<void> {
    return this.http.delete<void>(`${endpoints.findAllPatient.path}/deletePatient/${id}`,this.getHttpOptions());
  }
}
