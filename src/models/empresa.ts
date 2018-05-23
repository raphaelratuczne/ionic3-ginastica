export class Empresa {
  key?: string;
  constructor(
    public ativa: boolean,
    public email: string,
    public nome: string,
    public senha: string,
    public textoEmail: string,
    public usuarioId: string
  ) { }
}
