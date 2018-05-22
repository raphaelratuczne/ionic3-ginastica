import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { Cidade } from '../models/cidade';

@Injectable()
export class CidadeProvider {

  private cidadesCollection: AngularFirestoreCollection<Cidade>;
  private cidade: AngularFirestoreDocument<Cidade>;
  public cidades: Observable<Cidade[]>;

  constructor(private angularFirestore: AngularFirestore) {
    this.cidadesCollection = this.angularFirestore.collection<Cidade>('cidades');
    this.cidades = this.cidadesCollection.valueChanges();
  }

  public lista(): Observable<Cidade[]> {
    return this.cidades;
  }

  public adicionar(cidade:Cidade): void {
    this.cidadesCollection.add(cidade);
  }

  public editar(cidade:Cidade): void {
    this.cidade = this.angularFirestore.doc<Cidade>('cidades/' + cidade.id);
    this.cidade.update(cidade);
    this.cidade = null;
  }

  public excluir(id:string): void {
    this.cidade = this.angularFirestore.doc<Cidade>('cidades/' + id);
    this.cidade.delete();
    this.cidade = null;
  }
}
