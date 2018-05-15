import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

// import { Item } from '../../models/item';
// import { Items } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-faltas',
  templateUrl: 'faltas.html'
})
export class FaltasPage {

  currentItems = [
    {
      id: 1,
      nome: 'Sessão Realizada'
    },
    {
      id: 2,
      nome: 'Doença'
    },
    {
      id: 3,
      nome: 'Atraso'
    },
    {
      id: 4,
      nome: 'Dispensa da Empresa'
    },
    {
      id: 5,
      nome: 'Atestado'
    },
    {
      id: 6,
      nome: 'Cancelamento de Sessão'
    },
    {
      id: 7,
      nome: 'Reunião'
    }
  ];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController) {
    // this.currentItems = this.items.query();
    // empresa-form

  }

  ionViewDidLoad() {
  }

  addItem() {
    let addModal = this.modalCtrl.create('FaltaFormPage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.currentItems.push(item);
      }
    })
    addModal.present();
  }

  editItem(item) {
    let addModal = this.modalCtrl.create('FaltaFormPage', { item: item });
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
      title: 'Excluir Falta',
      message: 'Tem certeza que deseja excluir essa falta?',
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
