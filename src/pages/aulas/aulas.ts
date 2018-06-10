import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/filter';

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
  public data: string;

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private aulaProvider: AulaProvider
  ) { }

  ionViewDidLoad() {
    this.carregarDatas();
  }

  private carregarDatas(): void {
    this.datas = this.aulaProvider.listaDatas();

    this.datas.filter(datas => datas != null).first().subscribe(datas => {
      if (datas.length > 0) {
        this.data = datas[0];
        this.carregarAulas(datas[0]);
      }
    });
  }

  private async carregarAulas(data:string) {
    this.aulaProvider.listaAulas(data).subscribe(aulas => this.aulas = aulas);
  }

  public alterouData(ev) {
    // console.log('alterouData',ev);
    this.carregarAulas(this.data);
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
    if (this.aulaProvider.salas) {
      const data = aula.data.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1');
      const sala = this.aulaProvider.salas.find(s => s.key == aula.sala).nome;
      return `${data} ${sala} (${aula.participantes}/${aula.potencial})`;
    }
    return '';
  }

  public getInfoAula2(aula:Aula): string {
    if (this.aulaProvider.empresas && this.aulaProvider.cidades) {
      const empresa = this.aulaProvider.empresas.find(e => e.key == aula.empresa).nome;
      const cidade = this.aulaProvider.cidades.find(c => c.key == aula.cidade).nome;
      return `${empresa} - ${cidade}`;
    }
    return '';
  }

  public getFalta(aula:Aula): string {
    if (aula.falta && this.aulaProvider.faltas) {
      const falta = this.aulaProvider.faltas.find(f => f.key == aula.falta).nome;
      return 'Falta por: ' + falta;
    }
    return '';
  }

}
