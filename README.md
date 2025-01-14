# Test-vertical

## Passos para rodar localmente

#### Necessário o npm e node instalados na máquina.

#### Primeiro é dar é bixar o pnpm em sua máquina --> npm i -g pnpm

#### Rodar o banco de dados utilizando o docker --> docker compose up ou docker compose up -d (caso não queira travar o terminal)

#### Rodar a migração e inserie o schema no banco --> pnpm db:push

#### Rodar o seed, para popular o banco (opcional) --> pnpm db:seed

#### Rodar o front, para utilizar no localhost --> pnpm dev

#### Clicar no link no terminal do localhost ou accesar no navegador http://localhost:3000/.
