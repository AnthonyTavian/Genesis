# 🛒 Genesis Offers

Aplicativo mobile de ofertas personalizadas para supermercado, inspirado no sistema de ofertas do CS2 (Arms Dealer). O usuário recebe 5 ofertas em formato de chat e pode aceitar ou recusar cada uma.

---

## 📱 Telas

### Chat de Ofertas
- Chat guiado com consultor virtual (Márcio)
- 5 ofertas sequenciais com imagem, preço e desconto
- Suporte a 3 tipos de oferta: produto, cupom e brinde
- Botões de aceitar e recusar
- Mensagens do usuário e do bot com delay

### Histórico de Resgates
- Lista todas as ofertas aceitas
- Exibe imagem, título, descrição, preço e data
- Atualiza automaticamente ao acessar a tela

---

## 🚀 Como Rodar
```bash
cd mobile
npm install
npx expo start
```

Escaneie o QR code com o app **Expo Go** no celular.

---

## 🏗️ Arquitetura Mobile
```
src/
├── components/  
├── data/        
├── database/     
├── hooks/        
├── screens/      
└── services/     
```

---

## 🛠️ Tecnologias

- React Native + Expo
- expo-sqlite
- react-navigation
- uuidv7