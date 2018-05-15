import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

// import { Item } from '../../models/item';
// import { Items } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-salas',
  templateUrl: 'salas.html'
})
export class SalasPage {

  currentItems = [
    {
      id: 1,
      nome: 'Atendimento'
    },
    {
      id: 2,
      nome: 'Gerência'
    },
    {
      id: 3,
      nome: 'Produção'
    },
    {
      id: 4,
      nome: 'Secretaria'
    }
  ];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController) {
    // this.currentItems = this.items.query();
    // empresa-form

  }

  ionViewDidLoad() {
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
