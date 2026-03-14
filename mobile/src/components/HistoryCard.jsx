import { View, Text, Image } from 'react-native'
import { styles } from '../styles/HistoryScreen.styles'
import { ofertas } from '../data/mock'
import OfferPrice from './OfferPrice'

export default function HistoryCard({ item, formatDate }) {
  const oferta = ofertas.find(o => o.id === item.offer_id)

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>✅ RESGATADO</Text>
        </View>
      </View>
      <View style={styles.cardContent}>
        {oferta && (
          <View style={styles.cardImageBox}>
            <Image source={oferta.image} style={styles.cardImage} />
          </View>
        )}
        <View style={styles.cardInfo}>
          <Text style={styles.title}>{item.offer_title}</Text>
          <Text style={styles.description}>{item.offer_description}</Text>
          <OfferPrice offer={oferta} styles={styles} />
          <Text style={styles.date}>{formatDate(item.created_at)}</Text>
        </View>
      </View>
    </View>
  )
}