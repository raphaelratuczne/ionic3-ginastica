import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

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

  public item: {
    aula?: Aula,
    empresas: Empresa[],
    cidades: Cidade[],
    salas: Sala[],
    faltas: Falta[]
  };

  form: FormGroup;

  constructor(
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private navParams: NavParams,
    private aulaProvider: AulaProvider
  ) {
    this.item = this.navParams.get('item') || null;

    // seta data do dia
    let data = new Date();
    const dia = data.toISOString().split('T')[0];

    this.form = this.formBuilder.group({
      key:[null],
      data: [dia, Validators.required],
      empresa: [null, Validators.required],
      cidade: [null, Validators.required],
      sala: [null, Validators.required],
      potencial: [null, Validators.required],
      participantes: [null, Validators.required],
      falta: [null],
      observacao: [null],
      visivel: [true]
    });

    if (this.item && this.item.aula) {
      this.form.patchValue(this.item.aula);
    }

  }

  ionViewDidLoad() {

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
