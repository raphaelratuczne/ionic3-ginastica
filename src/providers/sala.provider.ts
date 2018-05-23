import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Sala } from '../models/sala';
import { AuthService } from '../services/auth.service';


@Injectable()
export class SalaProvider {

  private salasRef: AngularFireList<Sala>;
  public salas: Observable<Sala[]>;

  constructor(private angularFireDatabase: AngularFireDatabase, private authService:AuthService) {
    this.authService.getUserId()
      .then(uId => {
        this.salasRef = this.angularFireDatabase.list<Sala>(uId + '/salas');
        this.salas = this.salasRef.snapshotChanges().pipe(
        map(changes =>
            changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
          )
        );
      });
  }

  public lista(): Observable<Sala[]> {
    return this.salas;
  }

  public adicionar(sala:Sala): void {
    this.salasRef.push( new Sala(sala.nome) );
  }

  public editar(sala:Sala): void {
    this.salasRef.update(sala.key, new Sala(sala.nome));
  }

  public excluir(key:string): void {
    this.salasRef.remove(key);
  }
}
