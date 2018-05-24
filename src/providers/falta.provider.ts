import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/first';

import { Falta } from '../models/falta';
import { AuthService } from '../services/auth.service';

@Injectable()
export class FaltaProvider {

  private faltasRef: AngularFireList<Falta>;
    public faltas: Observable<Falta[]>;

    constructor(private angularFireDatabase: AngularFireDatabase, private authService:AuthService) {
      this.authService.getUserId()
        .then(uId => {
          this.faltasRef = this.angularFireDatabase.list<Falta>(uId + '/faltas');
          this.faltas = this.faltasRef.snapshotChanges().pipe(
          map(changes =>
              changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
            )
          );

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
                this.adicionar(new Falta(falta));
              })
            }
          });
        });
    }

    public lista(): Observable<Falta[]> {
      return this.faltas;
    }

    public adicionar(falta:Falta): void {
      this.faltasRef.push( new Falta(falta.nome) );
    }

    public editar(falta:Falta): void {
      this.faltasRef.update(falta.key, new Falta(falta.nome));
    }

    public excluir(key:string): void {
      this.faltasRef.remove(key);
    }
}
