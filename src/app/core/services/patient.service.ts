import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Patient} from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private apiUrl = 'https://6a3ud8j4wi.execute-api.us-east-1.amazonaws.com';



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
    return this.http.get<Patient[]>(`${this.apiUrl}/findAllPatient`,this.getHttpOptions());
  }

  getPatient(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/findPatient/${id}`,this.getHttpOptions());
  }

  createPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.apiUrl}/createPatient`, patient,this.getHttpOptions());
  }

  updatePatient(patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}/updatePatient/${patient.id}`, patient,this.getHttpOptions());
  }

  deletePatient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deletePatient/${id}`,this.getHttpOptions());
  }
}
