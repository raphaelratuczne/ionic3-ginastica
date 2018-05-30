import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';

import { Aula } from '../../models/aula';
import { Empresa } from '../../models/empresa';
import { Cidade } from '../../models/cidade';
import { Sala } from '../../models/sala';
import { Falta } from '../../models/falta';

import { AulaProvider } from '../../providers/aula.provider';

@IonicPage()
@Component({
  selector: 'page-aula-form',
  templateUrl: 'aula-form.html'
})
export class AulaFormPage {

  item: Aula;

  form: FormGroup;

  public empresas: Empresa[];
  public cidades: Cidade[];
  public salas: Sala[];
  public faltas: Falta[];

  constructor(
    private navCtrl: NavController,
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private navParams: NavParams,
    private aulaProvider: AulaProvider
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
    this.empresas = this.aulaProvider.empresas;
    this.cidades = this.aulaProvider.cidades;
    this.salas = this.aulaProvider.salas;
    this.faltas = this.aulaProvider.faltas;
  }

  cancel(ev:Event) {
    ev.preventDefault();
    this.viewCtrl.dismiss();
  }

  done() {
    // console.log(this.form.value);
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }

}
