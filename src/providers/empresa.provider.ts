import { Injectable } from '@angular/core';

import { Empresa } from '../models/empresa';

@Injectable()
export class EmpresaProvider {

  private empresas: Empresa[] = [
    {
      id: '1',
      usuarioId: '1',
      nome: 'Empresa Teste',
      email: 'empresateste@empresa.com',
      senha: '123456',
      ativa: true,
      textoEmail: 'texto'
    },
    {
      id: '2',
      usuarioId: '1',
      nome: 'Empresa Teste2',
      email: 'empresateste2@empresa2.com',
      senha: '123456',
      ativa: false,
      textoEmail: 'texto'
    }
  ];

  constructor() {  }

  public lista(): Empresa[] {
    return this.empresas;
  }

  public adicionar(empresa:Empresa): void {

  }

  public editar(empresa:Empresa): void {

  }

  public excluir(id:string): void {

  }
}
