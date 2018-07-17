import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/filter';

import { Falta } from '../models/falta';

@Injectable()
export class FaltaProvider {

  private faltasRef: AngularFireList<Falta>;
  public faltas: BehaviorSubject<Falta[]> = new BehaviorSubject(null);

  constructor(private angularFireAuth: AngularFireAuth, private angularFireDatabase: AngularFireDatabase) {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        const uid = user.uid;
        this.faltasRef = this.angularFireDatabase.list<Falta>(uid + '/faltas', ref => ref.orderByChild('visivel').equalTo(true));
        this.faltasRef
          .snapshotChanges()
          .map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }) ))
          .subscribe(faltas => this.faltas.next(faltas));

        this.faltas.filter(list => list != null).first().subscribe(list => {
          if (list.length == 0) {
            [ 'Sessão Realizada',
              'Doença',
              'Atraso',
              'Dispensa da Empresa',
              'Atestado',
              'Cancelamento de Sessão',
              'Reunião' ].forEach(falta => {
              this.adicionar({key:null, nome:falta, visivel:true});
            });
          }
        });
      }
    });
  }

  public lista(): BehaviorSubject<Falta[]> {
    return this.faltas;
  }

  public adicionar(falta:Falta): void {
    delete falta.key;
    this.faltasRef.push(falta);
  }

  public editar(falta:Falta): void {
    const key = falta.key;
    delete falta.key;
    this.faltasRef.update(key, falta);
  }

  public excluir(falta:Falta): void {
    // this.faltasRef.remove(key);
    falta.visivel = false;
    this.editar(falta);
  }
}
