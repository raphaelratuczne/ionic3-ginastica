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
    // this.cidades = this.cidadeProvider.cidades;
    this.cidades = this.cidadeProvider.lista();
    // this.currentItems = this.cidadeProvider.lista();
  }

  addItem() {
    let addModal = this.modalCtrl.create('CidadeFormPage');
    addModal.onDidDismiss(cidade => {
      if (cidade) {
        // this.currentItems.push(item);
        this.cidadeProvider.adicionar(cidade);
      }
    })
    addModal.present();
  }

  editItem(cidade: Cidade) {
    let addModal = this.modalCtrl.create('CidadeFormPage', { item: Cidade });
    addModal.onDidDismiss(cidade => {
      if (cidade) {
        // this.currentItems.push(item);
        this.cidadeProvider.editar(cidade);
      }
    })
    addModal.present();
  }

  deleteItem(cidade:Cidade) {
    // this.items.delete(item);
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
            // this.currentItems.splice(this.currentItems.indexOf(item), 1);
            this.cidadeProvider.excluir(cidade.id);
          }
        }
      ]
    });
    confirm.present();
  }

}
