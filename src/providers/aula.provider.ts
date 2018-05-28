import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Aula } from '../models/aula';
import { Cidade } from '../models/cidade';
import { Empresa } from '../models/empresa';
import { Falta } from '../models/falta';
import { Sala } from '../models/sala';

@Injectable()
export class AulaProvider {

  private aulasRef: AngularFireList<Aula>;
  public aulas: Observable<Aula[]>;

  public cidades: Cidade[];
  public empresas: Empresa[];
  public faltas: Falta[];
  public salas: Sala[];

  constructor(private angularFireAuth: AngularFireAuth, private angularFireDatabase: AngularFireDatabase) {
    this.carregar();
  }

  private carregar(): Observable<Aula[]> {
    return Observable.create(sub => {
      this.angularFireAuth.authState.subscribe(async user => {
        if (user) {
          const uid = user.uid;
          this.aulasRef = this.angularFireDatabase.list<Aula>(uid + '/aulas');
          this.aulas = this.aulasRef.snapshotChanges().pipe(
            map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }) ))
          );
          this.aulas.subscribe(aulas => sub.next(aulas));

          this.cidades = await this.angularFireDatabase.list<Cidade>(uid + '/cidades').snapshotChanges().first().map(c => { return c.map(el => ({key:el.payload.key, ...el.payload.val()})) }).toPromise();
          this.empresas = await this.angularFireDatabase.list<Empresa>(uid + '/empresas').snapshotChanges().first().map(c => { return c.map(el => ({key:el.payload.key, ...el.payload.val()})) }).toPromise();
          this.faltas = await this.angularFireDatabase.list<Falta>(uid + '/faltas').snapshotChanges().first().map(c => { return c.map(el => ({key:el.payload.key, ...el.payload.val()})) }).toPromise();
          this.salas = await this.angularFireDatabase.list<Sala>(uid + '/salas').snapshotChanges().first().map(c => { return c.map(el => ({key:el.payload.key, ...el.payload.val()})) }).toPromise();
          console.log('cidades', this.cidades, 'empresas', this.empresas, 'faltas', this.faltas, 'salas', this.salas);
        }
      });
    }).share();
  }

  public lista(): Observable<Aula[]> {
    return this.aulas || this.carregar();
  }

  public adicionar(aula:Aula): void {
    delete aula.key;
    this.aulasRef.push(aula);
  }

  public editar(aula:Aula): void {
    const key = aula.key;
    this.aulasRef.update(key, aula);
  }

  public excluir(key:string): void {
    this.aulasRef.remove(key);
  }
}
