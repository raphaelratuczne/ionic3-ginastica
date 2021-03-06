import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';

import { Empresa } from '../../models/empresa';

@IonicPage()
@Component({
  selector: 'page-empresa-form',
  templateUrl: 'empresa-form.html'
})
export class EmpresaFormPage {

  item: Empresa;

  form: FormGroup;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder, navParams: NavParams) {
    this.item = navParams.get('item') || null;

    this.form = formBuilder.group({
      key:[null],
      nome: ['', Validators.required],
      email: ['', Validators.required],
      ativa: [true],
      visivel: [true],
      usuarioId: [null],
      senha: [null],
      textoEmail: [null, Validators.required]
    });

    if (this.item)
      this.form.patchValue(this.item);
  }

  ionViewDidLoad() { }


  cancel() {
    this.viewCtrl.dismiss();
  }

  done() {
    console.log(this.form.value);
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }
}
