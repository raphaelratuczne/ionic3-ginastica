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
    this.carregaDados();
  }

  private carregaDados(): Observable<Sala[]> {
    return Observable.create(sub => {
      this.authService.getUserId()
        .then(uId => {
          console.log('uId',uId);
          this.salasRef = this.angularFireDatabase.list<Sala>(uId + '/salas');
          this.salas = this.salasRef.snapshotChanges().pipe(
            map(changes =>
              changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
            )
          );
          this.salas.subscribe(d => sub.next(d));
        });
    }).share();
  }

  public lista(): Observable<Sala[]> {
    if (this.salas) {
      return this.salas;
    } else {
      return this.carregaDados();
    }
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
