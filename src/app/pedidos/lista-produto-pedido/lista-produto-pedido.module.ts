import { SharedModule } from './../../core/shared/shared/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


import { ListaProdutoPedidoPage } from './lista-produto-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: ListaProdutoPedidoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListaProdutoPedidoPage]
})
export class ListaProdutoPedidoPageModule {}
