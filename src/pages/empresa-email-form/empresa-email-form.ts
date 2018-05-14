import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-empresa-email-form',
  templateUrl: 'empresa-email-form.html'
})
export class EmpresaEmailFormPage {

  form: FormGroup;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, private formBuilder: FormBuilder) {

    this.form = formBuilder.group({
      id:[null],
      textoEmail: ['Texto enviado por email', Validators.required]
    });


  }

  ionViewDidLoad() {

  }


  cancel() {
    this.viewCtrl.dismiss();
  }

  done() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }
}
