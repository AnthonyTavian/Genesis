import { View, Text, Image } from 'react-native'
import { styles } from '../styles/HistoryScreen.styles'
import { offers } from '../data/mock'
import OfferPrice from './OfferPrice'

export default function HistoryCard({ item, formatDate }) {
  const offer = offers.find(o => o.id === item.offer_id)

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>✅ RESGATADO</Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        {offer && (
          <View style={styles.cardImageBox}>
            <Image source={offer.image} style={styles.cardImage} />
          </View>
        )}

        <View style={styles.cardInfo}>
          <Text style={styles.title}>{item.offer_title}</Text>
          <Text style={styles.description}>{item.offer_description}</Text>
          {offer && <OfferPrice offer={offer} styles={styles} />}
          <Text style={styles.date}>{formatDate(item.created_at)}</Text>
        </View>
      </View>
    </View>
  )
}