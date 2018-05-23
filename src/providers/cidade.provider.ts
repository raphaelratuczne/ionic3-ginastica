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
    this.authService.getUserId()
      .then(uId => {
        this.cidadesRef = this.angularFireDatabase.list<Cidade>(uId + '/cidades');
        this.cidades = this.cidadesRef.snapshotChanges().pipe(
        map(changes =>
            changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
          )
        );
      });
  }

  public lista(): Observable<Cidade[]> {
    return this.cidades;
  }

  public adicionar(cidade:Cidade): void {
    this.cidadesRef.push( new Cidade(cidade.nome) );
  }

  public editar(cidade:Cidade): void {
    this.cidadesRef.update(cidade.key, new Cidade(cidade.nome));
  }

  public excluir(key:string): void {
    this.cidadesRef.remove(key);
  }
}

// update do rxjs
// npm install rxjs@6 rxjs-compat@6 --save
