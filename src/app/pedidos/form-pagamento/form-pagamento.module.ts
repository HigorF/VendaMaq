import { SharedModule } from 'src/app/core/shared/shared/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


import { FormPagamentoPage } from './form-pagamento.page';

const routes: Routes = [
  {
    path: '',
    component: FormPagamentoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FormPagamentoPage]
})
export class FormPagamentoPageModule {}
