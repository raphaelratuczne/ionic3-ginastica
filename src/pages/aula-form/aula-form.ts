import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';

import { Aula } from '../../models/aula';
import { Empresa } from '../../models/empresa';
import { Cidade } from '../../models/cidade';
import { Sala } from '../../models/sala';
import { Falta } from '../../models/falta';

import { EmpresaProvider } from '../../providers/empresa.provider';
import { CidadeProvider } from '../../providers/cidade.provider';
import { SalaProvider } from '../../providers/sala.provider';
import { FaltaProvider } from '../../providers/falta.provider';

@IonicPage()
@Component({
  selector: 'page-aula-form',
  templateUrl: 'aula-form.html'
})
export class AulaFormPage {

  item: Aula;

  form: FormGroup;

  public empresas: Observable<Empresa[]>;
  public cidades: Observable<Cidade[]>;
  public salas: Observable<Sala[]>;
  public faltas: Observable<Falta[]>;

  constructor(
    private navCtrl: NavController,
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private navParams: NavParams,
    private empresaProvider: EmpresaProvider,
    private cidadeProvider: CidadeProvider,
    private salaProvider: SalaProvider,
    private faltaProvider: FaltaProvider
  ) {
    this.item = navParams.get('item') || null;

    // seta data do dia
    let data = new Date();
    const dia = data.toISOString().split('T')[0];

    this.form = formBuilder.group({
      key:[null],
      data: [dia, Validators.required],
      empresa: [null, Validators.required],
      cidade: [null, Validators.required],
      sala: [null, Validators.required],
      potencial: [null, Validators.required],
      participantes: [null, Validators.required],
      falta: [null],
      observacao: [null]
    });

    if (this.item) {
      this.form.patchValue(this.item);
    }

  }

  ionViewDidLoad() {
    // carrega lista de emrpesas
    this.empresas = this.empresaProvider.lista();

    // carrega lista de cidades
    this.cidades = this.cidadeProvider.lista();

    // carrega lista de salas
    this.salas = this.salaProvider.lista();

    // carrega lista de faltas
    this.faltas = this.faltaProvider.lista();
  }

  cancel(ev:Event) {
    ev.preventDefault();
    this.viewCtrl.dismiss();
  }

  done() {
    console.log(this.form.value);
    if (!this.form.valid) { return; }
    // const v = this.form.value;
    // const aula:Aula = {
    //   key: v.key,
    //   data: v.data,
    //   potencial: v.potencial,
    //   participantes: v.participantes,
    //   observacao: v.observacao,
    //   empresa: null,
    //   cidade: null,
    //   sala: null,
    //   falta: null
    // }
    this.viewCtrl.dismiss(this.form.value);
  }

  public getObj(key:string): { [key:string]: boolean } {
    return { [key]: true };
  }
}
