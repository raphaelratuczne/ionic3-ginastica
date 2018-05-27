import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { Aula } from '../../models/aula';
import { AulaProvider } from '../../providers/aula.provider';
import { EmpresaProvider } from '../../providers/empresa.provider';
import { CidadeProvider } from '../../providers/cidade.provider';
import { SalaProvider } from '../../providers/sala.provider';
import { FaltaProvider } from '../../providers/falta.provider';

@IonicPage()
@Component({
  selector: 'page-aulas',
  templateUrl: 'aulas.html'
})
export class AulasPage {

  public aulas: Observable<Aula[]>;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    private aulaProvider: AulaProvider,
    private empresaProvider: EmpresaProvider,
    private cidadeProvider: CidadeProvider,
    private salaProvider: SalaProvider,
    private faltaProvider: FaltaProvider
  ) { }

  ionViewDidLoad() {
    this.carregarAulas();
  }

  private async carregarAulas() {
    console.log('carregarAulas');
    // let empresas = this.empresaProvider.lista().first();
    // let cidades = await this.cidadeProvider.lista().toPromise();
    // let salas = await this.salaProvider.lista().toPromise();
    // let faltas = await this.faltaProvider.lista().toPromise();;

    this.aulas = this.aulaProvider.lista().map(aulas => {
      return aulas.map(aula => ({
        empresaNome: '',
        ...aula
      }))
    });
    // this.aulas = this.aulaProvider.lista();
    this.aulas.subscribe(aulas => {
      console.log('aulas', aulas);
    });
  }

  addItem() {
    let addModal = this.modalCtrl.create('AulaFormPage');
    addModal.onDidDismiss(aula => {
      console.log(aula);
      if (aula) {
        this.aulaProvider.adicionar(aula);
      }
    })
    addModal.present();
  }

  editItem(aula:Aula) {
    let editModal = this.modalCtrl.create('AulaFormPage', { item: aula });
    editModal.onDidDismiss(aula => {
      if (aula) {
        this.aulaProvider.editar(aula);
      }
    })
    editModal.present();
  }

  deleteItem(aula:Aula) {
    let confirm = this.alertCtrl.create({
      title: 'Excluir Aula',
      message: 'Tem certeza que deseja excluir essa aula?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {}
        },
        {
          text: 'Excluir',
          handler: () => {
            this.aulaProvider.excluir(aula.key);
          }
        }
      ]
    });
    confirm.present();
  }

  public getInfoAula(aula:Aula): string {
    // return `${aula.data} ${aula.salaNome} (${aula.participantes}/${aula.potencial})`;
    return `${aula.data} ${aula.salaKey} (${aula.participantes}/${aula.potencial})`;
  }

}
