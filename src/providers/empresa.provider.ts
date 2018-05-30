import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Empresa } from '../models/empresa';
import { AuthService } from '../services/auth.service';


@Injectable()
export class EmpresaProvider {

  private empresasRef: AngularFireList<Empresa>;
  public empresas: BehaviorSubject<Empresa[]> = new BehaviorSubject(null);
  private uId: string;
  private empRef: AngularFireList<Empresa>;

  constructor(private angularFireAuth: AngularFireAuth, private angularFireDatabase: AngularFireDatabase, private authService:AuthService) {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.uId = user.uid;
        this.empresasRef = this.angularFireDatabase.list<Empresa>(this.uId + '/empresas');
        this.empresasRef
          .snapshotChanges()
          .map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }) ))
          .subscribe(empresas => this.empresas.next(empresas));
        this.empRef = this.angularFireDatabase.list<Empresa>('empresas');
      }
    });
  }

  public lista(): BehaviorSubject<Empresa[]> {
    return this.empresas;
  }

  public adicionar(empresa:Empresa): void {
    empresa.usuarioId = this.uId;
    delete empresa.key;
    this.empresasRef.push(empresa)
      .then(salvou => { this.empRef.update(salvou.key, empresa); });
  }

  public editar(empresa:Empresa): void {
    const key = empresa.key;
    delete empresa.key;
    this.empresasRef.update(key, empresa)
      .then(() => { this.empRef.update(key, empresa); });
  }

  public excluir(key:string): void {
    this.empresasRef.remove(key)
      .then(() => { this.empRef.remove(key); });
  }
}
