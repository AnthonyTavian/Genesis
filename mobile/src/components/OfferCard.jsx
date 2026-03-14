import { View, Text, Image, TouchableOpacity } from 'react-native'
import { styles } from '../styles/ChatScreen.styles'
import OfferPrice from './OfferPrice'

export default function OfferCard({ item, onDecision }) {
  return (
    <View style={styles.offerCard}>
      <Text style={styles.offerLabel}>Oferta {item.offerNumber}/{item.total}</Text>
      <View style={styles.offerContent}>
        <View style={styles.offerImageBox}>
          <Image source={item.offer.image} style={styles.offerImage} />
        </View>
        <View style={styles.offerInfo}>
          <Text style={styles.offerTitle}>{item.offer.title}</Text>
          <Text style={styles.offerDescription}>{item.offer.description}</Text>
          <OfferPrice offer={item.offer} styles={styles} />
        </View>
      </View>
      {!item.decided ? (
        <View style={styles.offerButtons}>
          <TouchableOpacity style={styles.acceptButton} onPress={() => onDecision(true)}>
            <Text style={styles.buttonText}>✅ Aceitar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.declineButton} onPress={() => onDecision(false)}>
            <Text style={styles.declineButtonText}>❌ Recusar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={item.accepted ? styles.acceptedButton : styles.declinedButton}>
          <Text style={styles.buttonText}>{item.accepted ? '✅ Aceito!' : '❌ Recusado'}</Text>
        </View>
      )}
    </View>
  )
}