import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-aulas',
  templateUrl: 'aulas.html'
})
export class AulasPage {
  currentItems: Item[];

  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController) {
    this.currentItems = this.items.query();
  }

  ionViewDidLoad() {
  }

  addItem() {
    let addModal = this.modalCtrl.create('AulaFormPage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  editItem(item) {
    // this.items.delete(item);
  }

  deleteItem(item) {
    this.items.delete(item);
  }

  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }
}
