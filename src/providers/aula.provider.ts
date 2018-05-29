import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Aula } from '../models/aula';
import { Cidade } from '../models/cidade';
import { Empresa } from '../models/empresa';
import { Falta } from '../models/falta';
import { Sala } from '../models/sala';

import { CidadeProvider } from './cidade.provider';
import { EmpresaProvider } from './empresa.provider';
import { FaltaProvider } from './falta.provider';
import { SalaProvider } from './sala.provider';

@Injectable()
export class AulaProvider {

  private uid: string;

  private datasRef: AngularFireObject<any>;
  public datas: Observable<any>;

  private aulasRef: { [data:string]: AngularFireList<Aula> } = {};
  public aulas: { [data:string]: Observable<Aula[]> } = {};

  public cidades: Cidade[];
  public empresas: Empresa[];
  public faltas: Falta[];
  public salas: Sala[];

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFireDatabase: AngularFireDatabase,
    private cidadeProvider: CidadeProvider,
    private empresaProvider: EmpresaProvider,
    private faltaProvider: FaltaProvider,
    private salaProvider: SalaProvider
  ) {
    this.carregarDatas().subscribe();
  }

  private carregarDatas(): Observable<string[]> {
    return Observable.create(subData => {
      this.angularFireAuth.authState.subscribe(async user => {
        if (user) {
          this.uid = user.uid;

          this.datasRef = this.angularFireDatabase.object(this.uid+'/datas');
          this.datas = this.datasRef.snapshotChanges().map(d => {
            let datas = d.payload.val();
            let arrDatas = [];
            if (datas) {
              for (let data in datas) {
                arrDatas.push(data);
              }
            }
            arrDatas.sort().reverse();
            return arrDatas;
          }).share();

          this.datas.subscribe(da => {
            // console.log('datas', da);
            subData.next(da);
          });

          this.cidadeProvider.lista().subscribe(cidades => this.cidades = cidades);
          this.empresaProvider.lista().subscribe(empresas => this.empresas = empresas);
          this.faltaProvider.lista().subscribe(faltas => this.faltas = faltas);
          this.salaProvider.lista().subscribe(salas => this.salas = salas);
        }
      });
    })
    .share();
  }

  private carregarAulas(data:string): Observable<Aula[]> {
    if (this.aulas[data]) {
      return this.aulas[data].share();
    }

    this.aulasRef[data] = this.angularFireDatabase.list<Aula>(this.uid + '/aulas/' + data);
    this.aulas[data] = this.aulasRef[data].snapshotChanges().pipe(
      map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }) ))
    );

    return this.aulas[data].share();
  }

  public listaDatas(): Observable<string[]> {
    return this.datas || this.carregarDatas();
  }

  public listaAulas(data:string): Observable<Aula[]> {
    return this.carregarAulas(data);
  }

  public adicionar(aula:Aula): void {
    delete aula.key;
    if (!this.aulasRef[aula.data]) {
      this.carregarAulas(aula.data).first().subscribe(ok => {
        this.aulasRef[aula.data].push(aula);
        this.datasRef.update({ [aula.data]: true });
      });
    } else {
      this.aulasRef[aula.data].push(aula);
      this.datasRef.update({ [aula.data]: true });
    }
  }

  public editar(aula:Aula): void {
    const key = aula.key;
    delete aula.key;
    if (!this.aulasRef[aula.data]) {
      this.carregarAulas(aula.data).first().subscribe(ok => {
        this.aulasRef[aula.data].update(key, aula);
        this.datasRef.update({ [aula.data]: true });
      });
    } else {
      this.aulasRef[aula.data].update(key, aula);
      this.datasRef.update({ [aula.data]: true });
    }
  }

  public excluir(aula:Aula): void {
    this.aulasRef[aula.data].remove(aula.key);
  }
}
