import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { Sala } from '../../models/sala';
import { SalaProvider } from '../../providers/sala.provider';

@IonicPage()
@Component({
  selector: 'page-salas',
  templateUrl: 'salas.html'
})
export class SalasPage {

  currentItems = [];

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    private salaProvider: SalaProvider
  ) {
    // this.currentItems = this.items.query();
    // empresa-form

  }

  ionViewDidLoad() {
    this.currentItems = this.salaProvider.lista();
  }

  addItem() {
    let addModal = this.modalCtrl.create('SalaFormPage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.currentItems.push(item);
      }
    })
    addModal.present();
  }

  editItem(item) {
    let addModal = this.modalCtrl.create('SalaFormPage', { item: item });
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
      title: 'Excluir Sala',
      message: 'Tem certeza que deseja excluir essa sala?',
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

}
