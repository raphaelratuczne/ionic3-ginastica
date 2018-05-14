import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

// import { Item } from '../../models/item';
// import { Items } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-empresas',
  templateUrl: 'empresas.html'
})
export class EmpresasPage {

  currentItems = [
    {
      id: 1,
      nome: 'Empresa Teste',
      email: 'empresateste@empresa.com',
      senha: '123456',
      ativa: true,
      textoEmail: 'texto'
    },
    {
      id: 2,
      nome: 'Empresa Teste2',
      email: 'empresateste2@empresa2.com',
      senha: '123456',
      ativa: false,
      textoEmail: 'texto'
    }
  ];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController) {
    // this.currentItems = this.items.query();
    // empresa-form

  }

  ionViewDidLoad() {
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

  editarTextoEmail() {
    this.navCtrl.push('EmpresaEmailFormPage');
  }
}
