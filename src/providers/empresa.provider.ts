import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireModule } from 'angularfire2';
import firebase from 'firebase/app';

// import { firebaseAppConfig } from '../app/config';

import { Empresa } from '../models/empresa';

@Injectable()
export class EmpresaProvider {

  private empresasRef: AngularFireList<Empresa>;
  public empresas: BehaviorSubject<Empresa[]> = new BehaviorSubject([]);
  private uId: string;
  private empRef: AngularFireList<Empresa>;

  constructor(private angularFireAuth: AngularFireAuth, private angularFireDatabase: AngularFireDatabase) {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.uId = user.uid;
        this.empresasRef = this.angularFireDatabase.list<Empresa>(this.uId + '/empresas', ref => ref.orderByChild('visivel').equalTo(true));
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
      .then(salvou => {
        // console.log('salvou empresa');
        this.empRef.update(salvou.key, empresa);
        // const secundario = firebase.initializeApp(firebaseAppConfig, 'secundario');
        // secundario.auth().createUserWithEmailAndPassword(empresa.email, '123456')
        //   .then(ok => {
        //     console.log('cadastrou user empresa', ok);
        //     secundario.auth().sendPasswordResetEmail(empresa.email)
        //       .then(okk => console.log('enviou email nova senha'))
        //       .catch(err => console.log('erro ao enviar email', err))
        //   })
        //   .catch(er => console.log('erro ao cadatrar user', er));
      });
  }

  public editar(empresa:Empresa): void {
    const key = empresa.key;
    delete empresa.key;
    this.empresasRef.update(key, empresa)
      .then(() => { this.empRef.update(key, empresa); });
  }

  public excluir(empresa:Empresa): void {
    empresa.visivel = false;
    empresa.ativa = false;
    this.editar(empresa);
  }
}
