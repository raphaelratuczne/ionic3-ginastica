import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { Cidade } from '../../models/cidade';
import { CidadeProvider } from '../../providers/cidade.provider';

@IonicPage()
@Component({
  selector: 'page-cidades',
  templateUrl: 'cidades.html'
})
export class CidadesPage {

  public cidades: Observable<Cidade[]>;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    private cidadeProvider: CidadeProvider
  ) { }

  ionViewDidLoad() {
    this.cidades = this.cidadeProvider.lista();
  }

  addItem() {
    let addModal = this.modalCtrl.create('CidadeFormPage');
    addModal.onDidDismiss(cidade => {
      if (cidade) {
        this.cidadeProvider.adicionar(cidade);
      }
    })
    addModal.present();
  }

  editItem(cidade: Cidade) {
    let editModal = this.modalCtrl.create('CidadeFormPage', { item: cidade });
    editModal.onDidDismiss(cidade => {
      if (cidade) {
        this.cidadeProvider.editar(cidade);
      }
    })
    editModal.present();
  }

  deleteItem(cidade:Cidade) {
    let confirm = this.alertCtrl.create({
      title: 'Excluir Cidade',
      message: 'Tem certeza que deseja excluir essa cidade?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {}
        },
        {
          text: 'Excluir',
          handler: () => {
            this.cidadeProvider.excluir(cidade.key);
          }
        }
      ]
    });
    confirm.present();
  }

}
