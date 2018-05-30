import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { AlertController, App } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { Empresa } from '../../models/empresa';
import { EmpresaProvider } from '../../providers/empresa.provider';

@IonicPage()
@Component({
  selector: 'page-empresas',
  templateUrl: 'empresas.html'
})
export class EmpresasPage {

  public empresas: Observable<Empresa[]>;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    private empresaProvider: EmpresaProvider,
    private app: App
  ) { }

  ionViewDidLoad() {
    this.empresas = this.empresaProvider.lista();
  }

  addItem() {
    let addModal = this.modalCtrl.create('EmpresaFormPage');
    addModal.onDidDismiss(empresa => {
      if (empresa) {
        this.empresaProvider.adicionar(empresa);
      }
    })
    addModal.present();
  }

  editItem(empresa:Empresa) {
    let addModal = this.modalCtrl.create('EmpresaFormPage', { item: empresa });
    addModal.onDidDismiss(empresa => {
      if (empresa) {
        this.empresaProvider.editar(empresa);
      }
    })
    addModal.present();
  }

  deleteItem(empresa:Empresa) {
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
            this.empresaProvider.excluir(empresa.key);
          }
        }
      ]
    });
    confirm.present();
  }

  public enviarEmail(item) {

  }

  public editarTextoEmail() {
    this.navCtrl.push('EmpresaEmailFormPage');
  }

  public goToDashboard() {
    this.app.goBack();
  }

  public alterouAtiva(ev, empresa:Empresa): void {
    console.log('alterouAtiva', ev, empresa);
    empresa.ativa = ev.checked;
    this.empresaProvider.editar(empresa);
  }
}
