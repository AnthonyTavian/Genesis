import { View, Text, Image } from 'react-native'
import { useEffect } from 'react'
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated'
import { styles } from '../styles/HistoryScreen.styles'
import { offerImages } from '../data/mock'
import OfferPrice from './OfferPrice'

export default function HistoryCard({ item, formatDate }) {
  const image = offerImages[item.offer_id]
  const opacity = useSharedValue(0)
  const translateY = useSharedValue(20)

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 200 })
    translateY.value = withSpring(0, { damping: 10, stiffness: 100 })
  }, [])

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }]
  }))

  return (
    <Animated.View style={[styles.card, animStyle]}>
      <View style={styles.cardHeader}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>✅ RESGATADO</Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        {image && (
          <View style={styles.cardImageBox}>
            <Image source={image} style={styles.cardImage} />
          </View>
        )}

        <View style={styles.cardInfo}>
          <Text style={styles.title}>{item.offer_title}</Text>
          <Text style={styles.description}>{item.offer_description}</Text>
          {item && <OfferPrice offer={item} styles={styles} />}
          <Text style={styles.date}>{formatDate(item.created_at)}</Text>
        </View>
      </View>
    </Animated.View>
  )
}