import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Sala } from '../models/sala';

@Injectable()
export class SalaProvider {

  private salasRef: AngularFireList<Sala>;
  public salas: BehaviorSubject<Sala[]> = new BehaviorSubject(null);

  constructor(private angularFireAuth: AngularFireAuth, private angularFireDatabase: AngularFireDatabase) {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        const uid = user.uid;
        this.salasRef = this.angularFireDatabase.list<Sala>(uid + '/salas');
        this.salasRef
          .snapshotChanges()
          .map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }) ))
          .subscribe(salas => this.salas.next(salas))
      }
    });
  }

  public lista(): BehaviorSubject<Sala[]> {
    return this.salas;
  }

  public adicionar(sala:Sala): void {
    delete sala.key;
    this.salasRef.push(sala);
  }

  public editar(sala:Sala): void {
    const key = sala.key;
    delete sala.key;
    this.salasRef.update(key, sala);
  }

  public excluir(key:string): void {
    this.salasRef.remove(key);
  }
}
