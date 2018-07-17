import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { AlertController, App } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';

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
    private cidadeProvider: CidadeProvider,
    private app: App,
    private translate: TranslateService
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
    this.translate.get(['CITY_DELETE_TITLE','CITY_DELETE_MESSAGE','CITY_DELETE_YES','CITY_DELETE_NO']).subscribe(values => {
      let confirm = this.alertCtrl.create({
        title: values.CITY_DELETE_TITLE,
        message: values.CITY_DELETE_MESSAGE,
        buttons: [
          {
            text: values.CITY_DELETE_NO,
            handler: () => {}
          },
          {
            text: values.CITY_DELETE_YES,
            handler: () => {
              this.cidadeProvider.excluir(cidade);
            }
          }
        ]
      });
      confirm.present();
    });

  }

  public goToDashboard() {
    this.app.goBack();
  }

}
