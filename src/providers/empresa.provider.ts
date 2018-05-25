import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Empresa } from '../models/empresa';
import { AuthService } from '../services/auth.service';


@Injectable()
export class EmpresaProvider {

  private empresasRef: AngularFireList<Empresa>;
  public empresas: Observable<Empresa[]>;
  private uId: string;

  constructor(private angularFireDatabase: AngularFireDatabase, private authService:AuthService) {
    this.authService.getUserId()
      .then(uId => {
        this.uId = uId;
        this.empresasRef = this.angularFireDatabase.list<Empresa>(uId + '/empresas');
        this.empresas = this.empresasRef.snapshotChanges().pipe(
        map(changes =>
            changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
          )
        );
      });
  }

  public lista(): Observable<Empresa[]> {
    return this.empresas;
  }

  public adicionar(empresa:Empresa): void {
    empresa.usuarioId = this.uId;
    delete empresa.key;
    this.empresasRef.push(empresa);
  }

  public editar(empresa:Empresa): void {
    const key = empresa.key;
    delete empresa.key;
    this.empresasRef.update(key, empresa);
  }

  public excluir(key:string): void {
    this.empresasRef.remove(key);
  }
}
