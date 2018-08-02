import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Cidade } from '../models/cidade';

@Injectable()
export class CidadeProvider {

  private cidadesRef: AngularFireList<Cidade>;
  public cidades: BehaviorSubject<Cidade[]> = new BehaviorSubject([]);

  constructor(private angularFireAuth: AngularFireAuth, private angularFireDatabase: AngularFireDatabase) {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        const uid = user.uid;
        this.cidadesRef = this.angularFireDatabase.list<Cidade>(uid + '/cidades', ref => ref.orderByChild('visivel').equalTo(true));
        this.cidadesRef
          .snapshotChanges()
          .map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }) ))
          .subscribe(cidades => this.cidades.next(cidades));
      }
    });
  }

  public lista(): Observable<Cidade[]> {
    return this.cidades;
  }

  public adicionar(cidade:Cidade): void {
    delete cidade.key;
    this.cidadesRef.push(cidade);
  }

  public editar(cidade:Cidade): void {
    const key = cidade.key;
    delete cidade.key;
    this.cidadesRef.update(key, cidade);
  }

  public excluir(cidade:Cidade): void {
    // this.cidadesRef.remove(key);
    cidade.visivel = false;
    this.editar(cidade);
  }
}

// update do rxjs
// npm install rxjs@6 rxjs-compat@6 --save
