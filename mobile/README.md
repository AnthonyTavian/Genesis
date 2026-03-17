# 🛒 Genesis Offers

Aplicativo mobile de ofertas personalizadas para supermercado, inspirado no sistema de ofertas do CS2 (Arms Dealer). O usuário recebe 5 ofertas em formato de chat e pode aceitar ou recusar cada uma.

---

## 📱 Telas

### Chat de Ofertas
- Chat guiado com consultor virtual (Márcio)
- 5 ofertas sequenciais com imagem, preço e desconto
- Suporte a 3 tipos de oferta: produto, cupom e brinde
- Botões de aceitar e recusar
- Mensagens do Márcio vindas da API com delay

### Histórico de Resgates
- Lista todas as ofertas aceitas de todas as sessões
- Exibe imagem, título, descrição, preço e data
- Atualiza automaticamente ao acessar a tela

---

## 🚀 Como Rodar

### API
```bash
cd api
npm install
node src/app.js
```
Crie um arquivo `.env` na pasta `api/` com PORT=3000

### Mobile
```bash
cd mobile
npm install
npx expo start
```

Crie um arquivo `.env` na pasta `mobile/` com o IP da sua máquina:
```
EXPO_PUBLIC_API_URL=http://SEU_IP:3000

Se for Android Studio

EXPO_PUBLIC_API_URL=http://10.0.2.2:3000
```

Escaneie o QR code com o app **Expo Go** no celular. O celular e o PC precisam estar na mesma rede Wi-Fi.

---

## 🏗️ Arquitetura

### Mobile
```
src/
├── components/   # Componentes reutilizáveis
├── data/         # Mapeamento de imagens locais
├── hooks/        # Lógica de negócio (useChat, useHistory)
├── screens/      # Telas do app
├── services/     # Chamadas à API
└── styles/       # Styles separados por componente/tela
```

### API
```
src/
├── db/           # Conexão e migrations do SQLite
├── routes/       # Endpoints
└── services/     # Lógica de negócio
```

---

## 🔌 Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/session/start` | Inicia sessão e retorna primeira oferta |
| GET | `/offers/current` | Retorna oferta atual da sessão |
| POST | `/offers/decision` | Registra decisão e avança para próxima oferta |
| GET | `/rescues/history` | Lista todas as ofertas aceitas |

---

## 🛠️ Tecnologias

### Mobile
- React Native + Expo
- react-navigation
- uuidv7

### API
- Node.js + Express
- better-sqlite3
- uuidv7
- dotenv