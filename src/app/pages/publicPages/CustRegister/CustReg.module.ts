import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {TranslateModule} from '@ngx-translate/core';
import {CustomerRegister} from './cust_register.component';
import {SharedModule} from '../../../shared/shared.module';


export const routes = [
  { path: '', component: CustomerRegister, pathMatch: 'full' },

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgxChartsModule,
    PerfectScrollbarModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule

  ],
  declarations: [
    CustomerRegister
  ]
})
export class CustRegModule { }
