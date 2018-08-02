import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/filter';

import { Aula } from '../../models/aula';
import { Sala } from '../../models/sala';
import { Empresa } from '../../models/empresa';
import { Cidade } from '../../models/cidade';
import { Falta } from '../../models/falta';

import { AulaProvider } from '../../providers/aula.provider';
import { SalaProvider } from '../../providers/sala.provider';
import { EmpresaProvider } from '../../providers/empresa.provider';
import { CidadeProvider } from '../../providers/cidade.provider';
import { FaltaProvider } from '../../providers/falta.provider';

@IonicPage()
@Component({
  selector: 'page-aulas',
  templateUrl: 'aulas.html'
})
export class AulasPage {

  public datas: Observable<string[]>;
  public aulas: Aula[];
  public data: string;

  private salas: Sala[] = [];
  private empresas: Empresa[] = [];
  private cidades: Cidade[] = [];
  private faltas: Falta[] = [];

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private aulaProvider: AulaProvider,
    private salaProvider: SalaProvider,
    private empresaProvider: EmpresaProvider,
    private cidadeProvider: CidadeProvider,
    private faltaProvider: FaltaProvider
  ) { }

  ionViewDidLoad() {
    this.carregarDatas();
    this.carregarSalas();
    this.carregarEmpresas();
    this.carregarCidades();
    this.carregarFaltas();
  }

  private carregarDatas(): void {
    this.datas = this.aulaProvider.listaDatas();

    this.datas.filter(datas => datas != null).first().subscribe(datas => {
      console.log('datas', datas);
      if (datas.length > 0) {
        this.data = datas[0];
        this.carregarAulas(datas[0]);
      }
    });
  }

  private carregarSalas(): void {
    this.salaProvider.lista().subscribe(salas => this.salas = salas);
  }

  private carregarEmpresas(): void {
    this.empresaProvider.lista().subscribe(empresas => this.empresas = empresas);
  }

  private carregarCidades(): void {
    this.cidadeProvider.lista().subscribe(cid => this.cidades = cid);
  }

  private carregarFaltas(): void {
    this.faltaProvider.lista().subscribe(faltas => this.faltas = faltas);
  }

  private async carregarAulas(data:string) {
    this.aulaProvider.listaAulas(data).subscribe(aulas => this.aulas = aulas);
  }

  public alterouData(ev) {
    // console.log('alterouData',ev);
    this.carregarAulas(this.data);
  }

  addItem() {
    let addModal = this.modalCtrl.create('AulaFormPage', {
      item: {
        empresas: this.empresas,
        cidades: this.cidades,
        salas: this.salas,
        faltas: this.faltas
      }
    });
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
    let editModal = this.modalCtrl.create('AulaFormPage', {
      item: {
        aula,
        empresas: this.empresas,
        cidades: this.cidades,
        salas: this.salas,
        faltas: this.faltas
      }
    });
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

  public getSala(key:string): string {
    return (this.salas.find(sala => sala.key == key) || {nome:''}).nome;
  }

  public getEmpresa(key:string): string {
    return (this.empresas.find(emp => emp.key == key) || {nome:''}).nome;
  }

  public getCidade(key:string): string {
    return (this.cidades.find(cid => cid.key == key) || {nome:''}).nome;
  }

  public getFalta(key:string): string {
    return (this.faltas.find(falta => falta.key == key) || {nome:''}).nome;
  }

}
