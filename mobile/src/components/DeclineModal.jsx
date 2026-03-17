import { View, Text, TouchableOpacity, Modal } from 'react-native'
import { useEffect } from 'react'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated'
import { modalStyles as styles } from '../styles/Modal.styles'

export default function DeclineModal({ visible, offer, timer, onConfirm, onCancel }) {
  const translateY = useSharedValue(500)
  const shakeX = useSharedValue(0)
  const badgeScale = useSharedValue(1)

  useEffect(() => {
    if (!visible) {
      translateY.value = 500
      return
    }

    translateY.value = withSpring(0, { damping: 15, stiffness: 100 })

    shakeX.value = withRepeat(
      withSequence(
        withTiming(-8, { duration: 100 }),
        withTiming(8, { duration: 100 }),
        withTiming(0, { duration: 100 })
      ),
      3,
      false
    )

    badgeScale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 600 }),
        withTiming(1, { duration: 600 })
      ),
      -1,
      true
    )
  }, [visible])

  const modalAnimStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }]
  }))

  const shakeAnimStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeX.value }]
  }))

  const badgeAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: badgeScale.value }]
  }))

  function getSavings() {
    if (offer?.type === 'product') {
      const savings = offer.original_price - offer.discount_price
      return `ECONOMIA DE R$ ${savings.toFixed(2)}`
    }
    if (offer?.type === 'coupon') return `${offer.value}% OFF`
    if (offer?.type === 'gift') return 'GRÁTIS 🎁'
    return ''
  }

  if (!offer) return null

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <Animated.View style={[styles.container, modalAnimStyle]}>

          <Animated.Text style={[{ fontSize: 60, marginBottom: 12 }, shakeAnimStyle]}>
            😱
          </Animated.Text>

          <Text style={styles.title}>Tem certeza?</Text>

          <Text style={[styles.description, { marginBottom: 8 }]}>
            Você está prestes a perder essa economia!
          </Text>

          {offer.type === 'product' && (
            <View style={styles.priceContainer}>
              <Text style={styles.originalPrice}>R$ {offer.original_price.toFixed(2)}</Text>
              <Text style={styles.discountPrice}>R$ {offer.discount_price.toFixed(2)}</Text>
            </View>
          )}

          <Animated.View style={[styles.badge, badgeAnimStyle]}>
            <Text style={styles.badgeText}>{getSavings()}</Text>
          </Animated.View>

          <View style={[styles.timerBox, timer?.isUrgent && styles.timerBoxUrgent]}>
            <Text style={[styles.timerLabel, timer?.isUrgent && styles.timerLabelUrgent]}>
              ⏰ Oferta expira em
            </Text>
            <Text style={[styles.timer, timer?.isUrgent && styles.timerUrgent]}>
              {timer?.formattedTime ?? '15:00'}
            </Text>
          </View>

          <TouchableOpacity style={styles.confirmButton} onPress={onCancel}>
            <Text style={styles.confirmText}> Voltar e aceitar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={onConfirm}>
            <Text style={styles.cancelText}> Quero recusar</Text>
          </TouchableOpacity>

        </Animated.View>
      </View>
    </Modal>
  )
}