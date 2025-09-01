# Configuração Inicial

## 🚀 **Primeiros Passos**

### **1. Instalar Dependências**

```bash
npm install
```

### **2. Configurar Variáveis de Ambiente**

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# API Backend
VITE_API_BASE_URL=http://localhost:8000

# Google OAuth
VITE_GOOGLE_CLIENT_ID=seu-client-id-google.apps.googleusercontent.com
```

### **3. Executar Desenvolvimento**

```bash
npm run dev
```

### **4. Build de Produção**

```bash
npm run build
```

## 🔧 **Configurações Necessárias**

### **Google OAuth Setup**

1. Acesse [Google Console](https://console.developers.google.com/)
2. Crie projeto ou selecione existente
3. Habilite Google+ API
4. Crie credenciais OAuth 2.0
5. Adicione URIs de redirecionamento:
   - `http://localhost:5173/auth/google/callback` (dev)
   - `https://seu-dominio.com/auth/google/callback` (prod)

### **API Backend**

- Certifique-se que o backend está rodando
- Configure CORS no backend para permitir `localhost:5173`
- Verifique se as rotas de autenticação estão funcionando

## 📁 **Estrutura do Projeto**

```
Sonora-UI/
├── src/
│   ├── components/     # Componentes reutilizáveis
│   ├── pages/         # Páginas da aplicação
│   ├── hooks/         # Hooks customizados
│   ├── contexts/      # Contextos React
│   ├── lib/           # Utilitários e serviços
│   └── types/         # Definições TypeScript
├── public/            # Arquivos estáticos
└── docs/             # Documentação
```

## ✅ **Verificação da Instalação**

1. **Servidor rodando:** <http://localhost:5173>
2. **Página de login:** <http://localhost:5173/login>
3. **Registro:** <http://localhost:5173/register>

## 🆘 **Problemas Comuns**

- **Erro de dependências:** Delete `node_modules` e `package-lock.json`, execute `npm install`
- **Erro de API:** Verifique se o backend está rodando e CORS configurado
- **Erro de Google OAuth:** Verifique `VITE_GOOGLE_CLIENT_ID` e URIs de redirecionamento
