import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { AlertController, App } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { Sala } from '../../models/sala';
import { SalaProvider } from '../../providers/sala.provider';

@IonicPage()
@Component({
  selector: 'page-salas',
  templateUrl: 'salas.html'
})
export class SalasPage {

  public salas: Observable<Sala[]>;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    private salaProvider: SalaProvider,
    private app: App
  ) { }

  ionViewDidLoad() {
    this.salas = this.salaProvider.lista();
  }

  addItem() {
    let addModal = this.modalCtrl.create('SalaFormPage');
    addModal.onDidDismiss(sala => {
      if (sala) {
        this.salaProvider.adicionar(sala);
      }
    })
    addModal.present();
  }

  editItem(sala:Sala) {
    let addModal = this.modalCtrl.create('SalaFormPage', { item: sala });
    addModal.onDidDismiss(sala => {
      if (sala) {
        this.salaProvider.editar(sala);
      }
    })
    addModal.present();
  }

  deleteItem(sala:Sala) {
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
            this.salaProvider.excluir(sala);
          }
        }
      ]
    });
    confirm.present();
  }

  public goToDashboard() {
    this.app.goBack();
  }

}
