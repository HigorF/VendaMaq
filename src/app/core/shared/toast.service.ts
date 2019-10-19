import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }
  //método que chama a mensagem após a confirmação (na parte de baixo do app)
  async show(mensagem: string){
    const toast = await this.toastController.create({
      message: mensagem,
      duration:300,
      position: 'bottom'
    });
    toast.present();
  }
}
