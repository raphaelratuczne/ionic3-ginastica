import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { Empresa } from '../../models/empresa';
import { EmpresaProvider } from '../../providers/empresa.provider';

@IonicPage()
@Component({
  selector: 'page-empresas',
  templateUrl: 'empresas.html'
})
export class EmpresasPage {

  currentItems = [];

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    private empresaProvider: EmpresaProvider
  ) {
    // this.currentItems = this.items.query();
    // empresa-form

  }

  ionViewDidLoad() {
    this.currentItems = this.empresaProvider.lista();
  }

  addItem() {
    let addModal = this.modalCtrl.create('EmpresaFormPage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.currentItems.push(item);
      }
    })
    addModal.present();
  }

  editItem(item) {
    let addModal = this.modalCtrl.create('EmpresaFormPage', { item: item });
    addModal.onDidDismiss(item => {
      if (item) {
        this.currentItems.push(item);
      }
    })
    addModal.present();
  }

  deleteItem(item) {
    // this.items.delete(item);
    let confirm = this.alertCtrl.create({
      title: 'Excluir Empresa',
      message: 'Tem certeza que deseja excluir essa empresa?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {}
        },
        {
          text: 'Excluir',
          handler: () => {
            this.currentItems.splice(this.currentItems.indexOf(item), 1);
          }
        }
      ]
    });
    confirm.present();
  }

  enviarEmail(item) {

  }

  editarTextoEmail() {
    this.navCtrl.push('EmpresaEmailFormPage');
  }
}
