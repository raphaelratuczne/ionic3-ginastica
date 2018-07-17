import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { AlertController, App } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';

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
    private app: App,
    private translate: TranslateService
  ) { }

  ionViewDidLoad() {
    this.empresas = this.empresaProvider.lista();
  }

  public addItem(): void {
    let addModal = this.modalCtrl.create('EmpresaFormPage');
    addModal.onDidDismiss(empresa => {
      if (empresa) {
        this.empresaProvider.adicionar(empresa);
      }
    })
    addModal.present();
  }

  public editItem(empresa:Empresa): void {
    let addModal = this.modalCtrl.create('EmpresaFormPage', { item: empresa });
    addModal.onDidDismiss(empresa => {
      if (empresa) {
        this.empresaProvider.editar(empresa);
      }
    })
    addModal.present();
  }

  public deleteItem(empresa:Empresa): void {
    this.translate.get(['COMPANY_DELETE_TITLE','COMPANY_DELETE_MESSAGE','COMPANY_DELETE_YES','COMPANY_DELETE_NO']).first().subscribe(values => {
      let confirm = this.alertCtrl.create({
        title: values.COMPANY_DELETE_TITLE,
        message: values.COMPANY_DELETE_MESSAGE,
        buttons: [
          {
            text: values.COMPANY_DELETE_NO,
            handler: () => {}
          },
          {
            text: values.COMPANY_DELETE_YES,
            handler: () => {
              this.empresaProvider.excluir(empresa);
            }
          }
        ]
      });
      confirm.present();
    });
  }

  public goToDashboard(): void {
    this.app.goBack();
  }

  public alterouAtiva(ev, empresa:Empresa): void {
    console.log('alterouAtiva', ev, empresa);
    empresa.ativa = ev.checked;
    this.empresaProvider.editar(empresa);
  }

  public reenviarEmail(empresa:Empresa): void {}
}
