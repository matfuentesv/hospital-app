import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {NgModule} from '@angular/core';
import {CreatePatientComponent} from './pages/create-patient/create-patient.component';
import {PatientListComponent} from './pages/patient-list/patient-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'patient', component: PatientListComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
