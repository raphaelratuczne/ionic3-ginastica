import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Cidade } from '../models/cidade';
import { AuthService } from '../services/auth.service';

@Injectable()
export class CidadeProvider {

  private cidadesRef: AngularFireList<Cidade>;
  public cidades: Observable<Cidade[]>;

  constructor(private angularFireDatabase: AngularFireDatabase, private authService:AuthService) {
    this.carregaDados();
  }

  private carregaDados(): Observable<Cidade[]> {
    return Observable.create(sub => {
      this.authService.getUserId()
        .then(uId => {
          console.log('uId',uId);
          this.cidadesRef = this.angularFireDatabase.list<Cidade>(uId + '/cidades');
          this.cidades = this.cidadesRef.snapshotChanges().pipe(
            map(changes =>
              changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
            )
          );
          this.cidades.subscribe(d => sub.next(d));
        });
    }).share();
  }

  public lista(): Observable<Cidade[]> {
    if (this.cidades) {
      return this.cidades;
    } else {
      return this.carregaDados();
    }
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

  public excluir(key:string): void {
    this.cidadesRef.remove(key);
  }
}

// update do rxjs
// npm install rxjs@6 rxjs-compat@6 --save
