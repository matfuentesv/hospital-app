import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Patient} from '../models/patient';
import {endpoints} from '../../enviroments/endpoints';
import {VitalSigns} from '../models/vital-signs';
@Injectable({
  providedIn: 'root'
})
export class VitalSignsService {



  constructor(private http: HttpClient) {}

  createVitalSigns(signs: VitalSigns): Observable<string> {
    return this.http.post<string>(`${endpoints.vitalSigns.path}/send`, signs);
  }


}
