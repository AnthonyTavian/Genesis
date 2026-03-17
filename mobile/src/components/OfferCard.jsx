import { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  interpolateColor,
} from 'react-native-reanimated'
import { styles } from '../styles/ChatScreen.styles'
import OfferPrice from './OfferPrice'
import { offerImages } from '../data/mock'
import AcceptModal from './AcceptModal'
import DeclineModal from './DeclineModal'

export default function OfferCard({ item, onDecision, timer }) {
  const [showAccept, setShowAccept] = useState(false)
  const [showDecline, setShowDecline] = useState(false)
  const image = offerImages[item.offer.id]

  const opacity = useSharedValue(0)
  const translateY = useSharedValue(20)
  const shakeX = useSharedValue(0)
  const expireProgress = useSharedValue(0)

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 600 })
    translateY.value = withSpring(0, { damping: 20, stiffness: 60 })
  }, [])

  useEffect(() => {
    if (item.expired) {
      setShowAccept(false)
      setShowDecline(false)
      expireProgress.value = withTiming(1, { duration: 500 })
      shakeX.value = withSequence(
        withTiming(-12, { duration: 80 }),
        withTiming(12, { duration: 80 }),
        withTiming(-12, { duration: 80 }),
        withTiming(12, { duration: 80 }),
        withTiming(-8, { duration: 80 }),
        withTiming(8, { duration: 80 }),
        withTiming(0, { duration: 80 })
      )
    } else {
      expireProgress.value = 0
    }
  }, [item.expired])

  const animStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value * (1 - expireProgress.value * 0.4),
      transform: [
        { translateY: translateY.value },
        { translateX: shakeX.value }
      ],
      backgroundColor: interpolateColor(
        expireProgress.value,
        [0, 1],
        ['#ffffff', '#bcbcbc']
      )
    }
  })

  return (
    <Animated.View style={[styles.offerCard, animStyle]}>
      <View style={styles.offerHeader}>
        <Text style={[styles.offerLabel, item.expired && { color: '#666' }]}>
          Oferta {item.offerNumber}/{item.total}
        </Text>
        {!item.decided && timer && !item.expired && (
          <Text style={[styles.timerText, timer.isUrgent && styles.timerTextUrgent]}>
            ⏰ {timer.formattedTime}
          </Text>
        )}
      </View>

      <View style={[styles.offerContent, item.expired && { opacity: 0.5 }]}>
        <View style={styles.offerImageBox}>
          <Image
            source={image}
            style={styles.offerImage}
            onError={() => console.warn('Erro ao carregar imagem da oferta')}
          />
        </View>

        <View style={styles.offerInfo}>
          <Text style={[styles.offerTitle, item.expired && { color: '#444' }]}>{item.offer.title}</Text>
          <Text style={[styles.offerDescription, item.expired && { color: '#666' }]}>{item.offer.description}</Text>
          <OfferPrice offer={item.offer} styles={styles} isExpired={item.expired} />
        </View>
      </View>

      {!item.decided && !item.expired ? (
        <View style={styles.offerButtons}>
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() => setShowAccept(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>✅ Aceitar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.declineButton}
            onPress={() => setShowDecline(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.declineButtonText}>❌ Recusar</Text>
          </TouchableOpacity>
        </View>
      ) : item.expired ? (
        <View style={[styles.expiredButton, { backgroundColor: '#888' }]}>
          <Text style={[styles.expiredButtonText, { color: '#eee' }]}>🚫 Oferta Expirada</Text>
        </View>
      ) : (
        <View style={item.accepted ? styles.acceptedButton : styles.declinedButton}>
          <Text style={styles.buttonText}>
            {item.accepted ? '✅ Aceito!' : '❌ Recusado'}
          </Text>
        </View>
      )}

      <AcceptModal
        visible={showAccept}
        offer={item.offer}
        timer={timer}
        onConfirm={() => {
          setShowAccept(false)
          onDecision(true)
        }}
        onCancel={() => setShowAccept(false)}
      />

      <DeclineModal
        visible={showDecline}
        offer={item.offer}
        timer={timer}
        onConfirm={() => {
          setShowDecline(false)
          onDecision(false)
        }}
        onCancel={() => setShowDecline(false)}
      />
    </Animated.View>
  )
}