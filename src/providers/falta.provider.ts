import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/first';

import { Falta } from '../models/falta';

@Injectable()
export class FaltaProvider {

  private faltasRef: AngularFireList<Falta>;
  public faltas: Observable<Falta[]>;

  constructor(private angularFireAuth: AngularFireAuth, private angularFireDatabase: AngularFireDatabase) {
    this.carregar().subscribe();
  }

  private carregar(): Observable<Falta[]> {
    return Observable.create(sub => {
      this.angularFireAuth.authState.subscribe(user => {
        if (user) {
          const uid = user.uid;
          this.faltasRef = this.angularFireDatabase.list<Falta>(uid + '/faltas');
          this.faltas = this.faltasRef.snapshotChanges().pipe(
            map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }) ))
          ).share();
          this.faltas.first().subscribe(list => {
            if (list.length == 0) {
              [
                'Sessão Realizada',
                'Doença',
                'Atraso',
                'Dispensa da Empresa',
                'Atestado',
                'Cancelamento de Sessão',
                'Reunião'
              ].forEach(falta => {
                this.adicionar({key:null, nome:falta});
              })
            }
          });
          this.faltas.subscribe(faltas => sub.next(faltas));
        }
      });
    }).share();
  }

  public lista(): Observable<Falta[]> {
    return this.faltas || this.carregar();
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

  public excluir(key:string): void {
    this.faltasRef.remove(key);
  }
}
