export class Aula {
  key?: string;
  empresaNome?: string;
  cidadeNome?: string;
  salaNome?: string;
  constructor(
    public data: string,
    public empresaKey: string,
    public cidadeKey: string,
    public salaKey: string,
    public potencial: number,
    public participantes: number,
    public faltaKey: string,
    public observacao: string
  ) { }
}
