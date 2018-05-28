export class Aula {
  key?: string;
  // empresaNome?: string;
  // cidadeNome?: string;
  // salaNome?: string;
  // faltaNome?: string;
  data: string;
  empresa: { [key:string]: boolean };
  cidade: { [key:string]: boolean };
  sala: { [key:string]: boolean };
  potencial: number;
  participantes: number;
  falta: { [key:string]: boolean };
  observacao: string;
}
