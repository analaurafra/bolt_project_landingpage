# NeuroBoost AI - Sistema Completo

Uma aplicação web moderna e responsiva que combina uma landing page premium para o produto NeuroBoost AI com um painel administrativo completo para gestão de usuários.

## Visão Geral

A aplicação possui duas seções principais:

1. **Landing Page** - Página de vendas moderna e minimalista para o NeuroBoost AI com design responsivo, animações ao rolar, depoimentos e formulário de newsletter.
2. **Painel Admin** - Sistema de cadastro de usuários com persistência em banco de dados Supabase, validação em tempo real e listagem automática.

## Funcionalidades

### Landing Page (NeuroBoost AI)
- Hero section com slogan impactante e CTA "Compre Agora"
- Seção de 3 benefícios com ícones animados
- 3 depoimentos fictícios reais com fotos e ratings
- Tabela de preços com plano único
- Formulário de captura de e-mail para newsletter
- Rodapé com links de contato e redes sociais
- Animações suaves ao rolar a página
- Design minimalista com cores azul-claro e branco

### Painel Admin
- Cadastro de usuários com nome, e-mail e idade
- Validação em tempo real dos campos
- Listagem de todos os usuários cadastrados
- Atualização automática após cadastro
- Mensagens de feedback para sucesso e erro
- Design responsivo e intuitivo

## Tecnologias Utilizadas

- **React 18** - Biblioteca para construção de interfaces
- **React Router DOM** - Gerenciamento de rotas e navegação
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool rápido e moderno
- **Tailwind CSS** - Framework CSS utilitário
- **Supabase** - Backend as a Service (PostgreSQL + Auth + API)
- **Lucide React** - Ícones SVG modernos

## Pré-requisitos

- Node.js 18 ou superior
- npm ou yarn
- Conta no Supabase (gratuita)

## Configuração do Ambiente

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd projeto
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

### 4. Configure o banco de dados

Execute a migration no Supabase SQL Editor:

```sql
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  age integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all operations on users"
  ON users
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);
```

## Executando a Aplicação

### Desenvolvimento

```bash
npm run dev
```

Acesse em `http://localhost:5173`

- Landing Page: `/`
- Painel Admin: `/admin`

### Build para Produção

```bash
npm run build
```

## Estrutura do Projeto

```
src/
├── pages/
│   ├── Landing.tsx        # Landing page NeuroBoost AI
│   └── Admin.tsx          # Painel administrativo
├── components/
│   ├── UserForm.tsx       # Formulário de cadastro
│   └── UsersList.tsx      # Lista de usuários
├── lib/
│   └── supabase.ts        # Cliente Supabase
├── App.tsx                # Router principal
├── main.tsx               # Entrada da aplicação
└── index.css              # Estilos globais com animações
```

## Variáveis Estáticas Editáveis

A landing page usa variáveis JavaScript como placeholders para fácil personalização:

- Preço: `R$ 147` (editável em Landing.tsx)
- Depoimentos: Nomes, textos e imagens (array testimonials)
- Benefícios: Títulos e descrições (array benefits)
- Links do rodapé: Todos customizáveis
- Slogan hero: Totalmente editável

## Deploy

### Netlify (Recomendado)

1. Conecte seu repositório GitHub ao Netlify
2. Build Command: `npm run build`
3. Publish Directory: `dist`
4. As redirects estão configuradas automaticamente

### Vercel

```bash
vercel deploy
```

### Outras plataformas

```bash
npm run build
```

Faça upload da pasta `dist/` para seu serviço de hospedagem.

## Validações

- **Nome**: Obrigatório
- **Email**: Obrigatório, deve ser válido e único
- **Idade**: Obrigatória, entre 1 e 149 anos

## Personalizações Recomendadas

1. Substitua as imagens de depoimentos com suas próprias fotos
2. Atualize o preço e os benefícios conforme necessário
3. Customize os links do footer com seus dados de contato
4. Modifique as cores azul-claro para sua marca
5. Adicione seu próprio domínio

## Licença

MIT - Desenvolvido como projeto de demonstração.
