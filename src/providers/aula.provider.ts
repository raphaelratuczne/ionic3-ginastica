import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Aula } from '../models/aula';
import { AuthService } from '../services/auth.service';


@Injectable()
export class AulaProvider {

  private aulasRef: AngularFireList<Aula>;
  public aulas: Observable<Aula[]>;

  constructor(private angularFireDatabase: AngularFireDatabase, private authService:AuthService) {
    this.authService.getUserId()
      .then(uId => {
        this.aulasRef = this.angularFireDatabase.list<Aula>(uId + '/aulas');
        this.aulas = this.aulasRef.snapshotChanges().pipe(
        map(changes =>
            changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
          )
        );
      });
  }

  public lista(): Observable<Aula[]> {
    return this.aulas;
  }

  public adicionar(aula:Aula): void {
    delete aula.key;
    delete aula.empresaNome;
    delete aula.cidadeNome;
    delete aula.salaNome;
    delete aula.faltaNome;
    this.aulasRef.push(aula);
  }

  public editar(aula:Aula): void {
    const key = aula.key;
    delete aula.empresaNome;
    delete aula.cidadeNome;
    delete aula.salaNome;
    delete aula.faltaNome;
    this.aulasRef.update(key, aula);
  }

  public excluir(key:string): void {
    this.aulasRef.remove(key);
  }
}
