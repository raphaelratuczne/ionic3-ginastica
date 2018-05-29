import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { Aula } from '../../models/aula';
import { AulaProvider } from '../../providers/aula.provider';

@IonicPage()
@Component({
  selector: 'page-aulas',
  templateUrl: 'aulas.html'
})
export class AulasPage {

  public datas: Observable<string[]>;
  public aulas: Aula[];
  // public dataLista: Aula[];

  public data: string;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    private aulaProvider: AulaProvider
  ) { }

  ionViewDidLoad() {
    this.carregarDatas();
  }

  private carregarDatas(): void {
    this.datas = this.aulaProvider.listaDatas();

    this.datas.first().subscribe(datas => {
      if (datas.length > 0) {
        this.data = datas[0];
        this.carregarAulas(datas[0]);
      }
    });
  }

  private async carregarAulas(data:string) {
    // console.log('carregarAulas');
    // if (!this.aulas[data]) {
    //   this.aulas[data] = this.aulaProvider.listaAulas(data);
    //   if (this.aulas[data]) {
    //     this.aulas[data].subscribe(aulas => {
    //       console.log('aulas', aulas);
    //     });
    //   }
    // }
    // this.dataLista = this.aulas[data];
    this.aulaProvider.listaAulas(data).subscribe(aulas => this.aulas = aulas);
  }

  public alterouData(ev) {
    console.log('alterouData',ev);
    this.carregarAulas(ev);
  }

  addItem() {
    let addModal = this.modalCtrl.create('AulaFormPage');
    addModal.onDidDismiss(aula => {
      console.log(aula);
      if (aula) {
        this.aulaProvider.adicionar(aula);
        this.data = aula.data;
        this.carregarAulas(aula.data);
      }
    })
    addModal.present();
  }

  editItem(aula:Aula) {
    let editModal = this.modalCtrl.create('AulaFormPage', { item: aula });
    editModal.onDidDismiss(aula => {
      if (aula) {
        this.aulaProvider.editar(aula);
        this.data = aula.data;
        this.carregarAulas(aula.data);
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
            this.aulaProvider.excluir(aula);
          }
        }
      ]
    });
    confirm.present();
  }

  public getInfoAula(aula:Aula): string {
    const data = aula.data.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1');
    const sala = this.aulaProvider.salas.find(s => s.key == aula.sala).nome;
    return `${data} ${sala} (${aula.participantes}/${aula.potencial})`;
  }

  public getInfoAula2(aula:Aula): string {
    const empresa = this.aulaProvider.empresas.find(e => e.key == aula.empresa).nome;
    const cidade = this.aulaProvider.cidades.find(c => c.key == aula.cidade).nome;
    return `${empresa} - ${cidade}`;
  }

}
