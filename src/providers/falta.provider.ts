import { Injectable } from '@angular/core';

import { Falta } from '../models/falta';

@Injectable()
export class FaltaProvider {

  private faltas: Falta[] = [
    {
      id: '1',
      nome: 'Sessão Realizada'
    },
    {
      id: '2',
      nome: 'Doença'
    },
    {
      id: '3',
      nome: 'Atraso'
    },
    {
      id: '4',
      nome: 'Dispensa da Empresa'
    },
    {
      id: '5',
      nome: 'Atestado'
    },
    {
      id: '6',
      nome: 'Cancelamento de Sessão'
    },
    {
      id: '7',
      nome: 'Reunião'
    }
  ];

  constructor() {  }

  public lista(): Falta[] {
    return this.faltas;
  }

  public adicionar(falta:Falta): void {

  }

  public editar(falta:Falta): void {

  }

  public excluir(id:string): void {

  }
}
