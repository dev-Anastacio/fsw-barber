# 💈 FSW Barber - Sistema de Agendamento para Barbearias

Este é um projeto SaaS para gerenciamento e agendamento de barbearias desenvolvido com Next.js, Prisma e PostgreSQL (Neon).

## 📁 Estrutura do Projeto

```
projebarb/
├── .git/                    # Controle de versão Git
├── .gitignore              # Arquivos ignorados pelo Git
├── README.md               # Este arquivo
└── saasbarbearia/          # 🎯 Aplicação Next.js principal
    ├── app/                # App Router do Next.js 14+
    │   ├── api/           # API Routes
    │   │   └── barbershops/ # Endpoint de barbearias
    │   ├── barbershops/   # Página de listagem
    │   ├── lib/           # Utilitários (Prisma Client, etc)
    │   ├── fonts/         # Fontes customizadas
    │   ├── globals.css    # Estilos globais
    │   ├── layout.tsx     # Layout principal
    │   └── page.tsx       # Página inicial
    ├── prisma/            # 🗄️ Configuração do Prisma
    │   ├── migrations/    # Histórico de migrações
    │   ├── schema.prisma  # Schema do banco de dados
    │   └── seed.ts        # Script de população do banco
    ├── scripts/           # 🔧 Scripts utilitários
    │   └── check-tables.ts # Verificar tabelas do banco
    ├── docs/              # 📚 Documentação
    │   ├── NEON_TABLES_GUIDE.md # Guia do Neon
    │   └── PRISMA_GUIDE.md      # Guia do Prisma Accelerate
    ├── node_modules/      # Dependências
    ├── .env               # Variáveis de ambiente
    ├── .eslintrc.json     # Configuração do ESLint
    ├── .gitignore         # Arquivos ignorados (local)
    ├── components.json    # Configuração do shadcn/ui
    ├── next.config.mjs    # Configuração do Next.js
    ├── package.json       # Dependências do projeto
    ├── postcss.config.mjs # Configuração do PostCSS
    ├── tailwind.config.ts # Configuração do Tailwind CSS
    └── tsconfig.json      # Configuração do TypeScript
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ instalado
- Conta no [Neon](https://neon.tech) (PostgreSQL)
- Conta no [Prisma Accelerate](https://www.prisma.io/accelerate) (opcional, para cache)

### Instalação

1. **Entre na pasta do projeto:**

   ```bash
   cd saasbarbearia
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**

   O arquivo `.env` já contém:

   ```env
   DATABASE_URL="prisma+postgres://accelerate..."  # Prisma Accelerate
   DIRECT_URL="postgresql://..."                    # Conexão direta Neon
   ```

4. **Execute as migrações:**

   ```bash
   npx prisma migrate deploy
   ```

5. **Popular o banco (opcional):**

   ```bash
   npx tsx prisma/seed.ts
   ```

6. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

7. **Acesse:** http://localhost:3000

## 🗃️ Banco de Dados

### Modelos

- **User** - Usuários do sistema
- **Barbershop** - Barbearias cadastradas
- **BarbershopServices** - Serviços oferecidos por cada barbearia
- **Booking** - Agendamentos realizados

### Comandos Prisma Úteis

```bash
# Gerar Prisma Client
npx prisma generate

# Criar nova migration
npx prisma migrate dev --name nome_da_migration

# Visualizar dados no Prisma Studio
npx prisma studio

# Verificar status das migrations
npx prisma migrate status

# Reset completo do banco (⚠️ apaga dados)
npx prisma migrate reset
```

## 📊 Scripts Úteis

```bash
# Verificar tabelas no banco
npx tsx scripts/check-tables.ts

# Popular banco com dados de teste
npx tsx prisma/seed.ts
```

## 🛠️ Tecnologias

- **Framework:** Next.js 14+ (App Router)
- **Linguagem:** TypeScript
- **Banco de Dados:** PostgreSQL (Neon)
- **ORM:** Prisma
- **Cache:** Prisma Accelerate
- **Estilização:** Tailwind CSS
- **Componentes UI:** shadcn/ui

## 📚 Documentação

- [Guia do Neon](./saasbarbearia/docs/NEON_TABLES_GUIDE.md)
- [Guia do Prisma Accelerate](./saasbarbearia/docs/PRISMA_GUIDE.md)

## 🤝 Contribuindo

1. Sempre trabalhe dentro da pasta `saasbarbearia/`
2. Use TypeScript para novos arquivos
3. Siga o padrão de organização do Next.js App Router
4. Teste as mudanças localmente antes de commit

## 📝 Notas

- O Prisma Client é gerado em `node_modules/@prisma/client`
- Use `DIRECT_URL` para migrations e seed
- Use `DATABASE_URL` (Accelerate) para queries da aplicação
- Documentação adicional está em `saasbarbearia/docs/`

---

**Repositório:** [github.com/dev-Anastacio/fsw-barber](https://github.com/dev-Anastacio/fsw-barber)
