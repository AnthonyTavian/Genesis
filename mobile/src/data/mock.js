export const offers = [
  {
    id: 1,
    title: 'Arroz 5kg',
    description: 'Arroz Tio João 5kg',
    image: require('../../assets/images/tio joao.png'),
    type: 'product',
    originalPrice: 26.90,
    discountPrice: 22.90,
    discount: 15,
  },
  {
    id: 2,
    title: 'Leve 3 Pague 2',
    description: 'Leve 3 iogurtes Danone e pague apenas 2',
    image: require('../../assets/images/iogurte.webp'),
    type: 'product',
    originalPrice: 14.90,
    discountPrice: 9.90,
    discount: 33,
  },
  {
    id: 3,
    title: 'Chocolate Lacta',
    description: 'Chocolate Lacta ao Leite 165g',
    image: require('../../assets/images/lacta.webp'),
    type: 'product',
    originalPrice: 12.90,
    discountPrice: 10.30,
    discount: 20,
  },
  {
    id: 4,
    title: 'Cupom 10% OFF',
    description: 'Para compras acima de R$80',
    image: require('../../assets/images/10%.avif'),
    type: 'coupon',
    value: 10,
  },
  {
    id: 5,
    title: 'Brinde Refrigerante',
    description: 'Refrigerante 2L grátis na compra de qualquer pizza congelada',
    image: require('../../assets/images/refri.webp'),
    type: 'gift',
  },
]


export const messages = {
  session_start: [
    'Olá! Me chamo Márcio, seu consultor de ofertas.',
    'Separei 5 ofertas exclusivas pra você hoje. Vamos lá?',
  ],
  offer_present: [
    'Olha o que tenho pra você...',
    'Essa aqui é especial...',
    'Não encontra isso em qualquer lugar...',
    'Vale muito a pena essa...',
  ],
  offer_accept: [
    'Ótima escolha!',
  ],
  offer_decline: [
    'Tudo bem, vamos para a próxima.',
    'Sem problemas!',
    'Entendido.',
    'Ok, próxima oferta!',
  ],
  last_offer: [
    'Última oferta do dia, não deixa passar!',
  ],
  last_offer_decline: [
    'Que pena!',
  ],
  session_end: [
    'Foi um prazer! Até a próxima visita. 👋',
  ],
}