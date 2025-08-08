# Flugo - Cadastro de Colaboradores

Este projeto foi desenvolvido como parte do desafio técnico da empresa **Flugo**.

## ✨ Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI](https://mui.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Yup](https://github.com/jquense/yup)
- [Firebase](https://firebase.google.com/)
- [Vite](https://vitejs.dev/)

## 🧩 Funcionalidades

- Cadastro de novos colaboradores em 2 etapas (formulário multi-step):
  - Informações básicas (nome, e-mail e status ativo)
  - Informações profissionais (departamento)
- Exibição da lista de colaboradores cadastrados com:
  - Ordenação por colunas
  - Avatar, status e departamento
- Design moderno e responsivo com Material UI
- Notificações de sucesso ao cadastrar um colaborador
- Barra de progresso visual nas etapas de cadastro
- Interface clara com navegação por stepper lateral

## 🚀 Como executar

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/flugo-colaboradores.git
cd flugo-colaboradores
```

2. Instale as dependências:
```bash
npm install
```

3. Crie um arquivo `.env` com as chaves do seu projeto Firebase:
```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

4. Rode o projeto:
```bash
npm run dev
```

## 📦 Deploy

Hospedado na [Vercel](https://vercel.com/). Basta conectar o repositório, configurar as variáveis de ambiente e o comando de build (`npm run build`) e de start (`npm run preview`).

## 🔗 Links

- [Demo no Vercel][(https://seu-projeto.vercel.ap](https://test-flugo-colaboradores-jb2wzjbvk-mauricio2025s-projects.vercel.app/)p)
- [Repositório GitHub](https://github.com/Mauricio2025/test-flugo-colaboradores)

## 📝 Licença

Este projeto está sob a licença MIT.
