import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-falta-form',
  templateUrl: 'falta-form.html'
})
export class FaltaFormPage {

  isReadyToSave: boolean;

  item: any;

  form: FormGroup;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder, navParams: NavParams) {
    this.item = navParams.get('item') || null;

    this.form = formBuilder.group({
      id:[null],
      nome: ['', Validators.required]
    });

    if (this.item)
      this.form.patchValue(this.item);

    // Watch the form for changes, and
    // this.form.valueChanges.subscribe((v) => {
    //   this.isReadyToSave = this.form.valid;
    // });
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
