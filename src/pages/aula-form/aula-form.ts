import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';

import { Aula } from '../../models/aula';

@IonicPage()
@Component({
  selector: 'page-aula-form',
  templateUrl: 'aula-form.html'
})
export class AulaFormPage {

  item: Aula;

  form: FormGroup;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder, navParams: NavParams) {
    this.item = navParams.get('item') || null;

    this.form = formBuilder.group({
      key:[null],
      data: [(this.item.data || null), Validators.required],
      empresaKey: [(this.item.empresaKey || null), Validators.required],
      cidadeKey: [(this.item.cidadeKey || null), Validators.required],
      salaKey: [(this.item.salaKey || null), Validators.required],
      potencial: [(this.item.potencial || null), Validators.required],
      participantes: [(this.item.participantes || null), Validators.required],
      faltaKey: [(this.item.faltaKey || null)],
      observacao: [(this.item.observacao || null)]
    });

  }

  ionViewDidLoad() {

  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  createItem() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }
}
