import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Aula } from '../models/aula';

@Injectable()
export class AulaProvider {

  private uid: string;

  private datasRef: AngularFireObject<any>;
  public datas: BehaviorSubject<string[]> = new BehaviorSubject(null);

  private aulasRef: { [data:string]: AngularFireList<Aula> } = {};
  public aulas: { [data:string]: BehaviorSubject<Aula[]> } = {};

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFireDatabase: AngularFireDatabase
  ) {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.uid = user.uid;

        this.datasRef = this.angularFireDatabase.object(this.uid+'/datas');
        this.datasRef
          .snapshotChanges()
          .map(d => {
            let datas = d.payload.val();
            let arrDatas = [];
            if (datas) {
              for (let data in datas) {
                arrDatas.push(data);
              }
            }
            arrDatas.sort().reverse();
            return arrDatas;
          })
          .subscribe(datas => this.datas.next(datas));
      }
    });
  }

  private carregarAulas(data:string): BehaviorSubject<Aula[]> {
    if (this.aulas[data]) {
      return this.aulas[data];
    }

    this.aulasRef[data] = this.angularFireDatabase.list<Aula>(this.uid + '/aulas/' + data, ref => ref.orderByChild('visivel').equalTo(true));
    this.aulas[data] = new BehaviorSubject([]);
    this.aulasRef[data]
      .snapshotChanges()
      .map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }) ))
      .subscribe(aulas => this.aulas[data].next(aulas));

    return this.aulas[data];
  }

  public listaDatas(): Observable<string[]> {
    return this.datas;
  }

  public listaAulas(data:string): BehaviorSubject<Aula[]> {
    return this.carregarAulas(data);
  }

  public adicionar(aula:Aula): void {
    delete aula.key;
    if (!this.aulasRef[aula.data]) {
      this.carregarAulas(aula.data).first().subscribe(ok => {
        this.aulasRef[aula.data].push(aula);
        this.datasRef.update({ [aula.data]: true });
      });
    } else {
      this.aulasRef[aula.data].push(aula);
      this.datasRef.update({ [aula.data]: true });
    }
  }

  public editar(aula:Aula): void {
    const key = aula.key;
    delete aula.key;
    if (!this.aulasRef[aula.data]) {
      this.carregarAulas(aula.data).first().subscribe(ok => {
        this.aulasRef[aula.data].update(key, aula);
        this.datasRef.update({ [aula.data]: true });
      });
    } else {
      this.aulasRef[aula.data].update(key, aula);
      this.datasRef.update({ [aula.data]: true });
    }
  }

  public excluir(aula:Aula): void {
    // this.aulasRef[aula.data].remove(aula.key);
    aula.visivel = false;
    this.editar(aula);
  }
}
