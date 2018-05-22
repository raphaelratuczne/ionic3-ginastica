import { Injectable } from '@angular/core';

import { Sala } from '../models/sala';

@Injectable()
export class SalaProvider {

  private salas: Sala[] = [
    {
      id: '1',
      nome: 'Atendimento'
    },
    {
      id: '2',
      nome: 'Gerência'
    },
    {
      id: '3',
      nome: 'Produção'
    },
    {
      id: '4',
      nome: 'Secretaria'
    }
  ];

  constructor() {  }

  public lista(): Sala[] {
    return this.salas;
  }

  public adicionar(sala:Sala): void {

  }

  public editar(sala:Sala): void {

  }

  public excluir(id:string): void {

  }
}
