# Ionic3 Ginastica

Aplicativo para gerenciar aulas de ginastica laboral em empresas.

## Tabela de Conteúdos

─ [Login](#login)
└─ [Tutorial](#tutorial)
└─ [Dashboard](#dasboard)
 └─ [Aulas](#aulas) (Listar/Excluir)
  └─ [Adicionar/Editar] (#adicionar)
 └─ [Opções] (#opcoes)
  └─ [Empresas] (Listar/Excluir/Bloquear/Enviar email)
   └─ [Adicionar/Editar]
   └─ [Alterar texto email]
  └─ [Cidades] (Listar/Excluir)
   └─ [Adicionar/Editar]
  └─ [Areas] (Listar/Excluir)
   └─ [Adicionar/Editar]
  └─ [Ausencias] (Listar/Excluir)
   └─ [Adicionar/Editar]


## Login

Login pelo google.

### Tutorial

Tutorial simples de como usar o app.

### Dashboard

Exibe os botões para a lista de aulas e as opções.

#### Aulas

Lista todas as aulas dadas por empresa ordenadas pela data/hora.
Pode excluir as aulas ou acessar a tela para Add/Editar.

##### Add/Editar Aulas

Adiciona ou altera uma aula.
Traz os dados da ultima aula ministrada pré-preenchidos.
Ao Alterar uma area, carrega os dados a ultima aula naquela area e preenche.

### Opções

Carrega tela com tabs e as opções de gerenciar Empresas, Cidades, Areas e Ausencias.

#### Empresas

Lista as empresas cadastradas.
Pode abrir uma nova tela para Add/Editar empresas (máximo 5 empresas).
Pode Excluir (se não tiver aulas relacionadas), Editar, Bloquear o acesso da empresa e reenviar um email com uma senha temporaria gerada automaticamente.
Pode ir para a tela de Add/Editar empresas.
Pode ir para a tela para alterar o email padrão a ser enviado para uma empresa.

##### Add/Editar Empresas

Adiciona ou altera uma empresa.
Pode enviar um email ao adicionar uma empresa.

##### Alterar texto email

Pode alterar o texto padrão do email com os dados de acesso da empresa.
O email pode conter uma senha temporaria que deverá ser alterada no primeiro acesso ao sistema.

#### Cidades (Listar/Excluir)

Lista as cidades Cadastradas
Pode excluir (se não tiver aulas relacionadas).
Pode ir para a tela Add/Editar cidades.

##### Add/Editar Cidades

Adiciona ou altera uma nova cidade.
Relaciona com uma empresa.

#### Areas

 Lista as Areas Cadastradas.
 Pode excluir (se não tiver aulas relacionadas).
 Pode ir para a tela Add/Editar Areas


##### Add/Editar Areas

Adiciona ou altera uma area.

#### Ausencias

Lista de ausencias cadastradas.
Pode excluir (se não tiver aulas relacionadas).
Pode ir para a tela Add/Editar ausencias.

##### Add/Editar

Adiciona ou altera uma ausencia.
