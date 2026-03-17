import { View, Text } from 'react-native'
import { useEffect } from 'react'
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated'
import { styles } from '../styles/ChatScreen.styles'

export default function BotMessage({ item }) {
  const opacity = useSharedValue(0)
  const translateY = useSharedValue(20)

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 600 })
    translateY.value = withSpring(0, { damping: 20, stiffness: 60 })
  }, [])

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }]
  }))

  return (
    <Animated.View style={[styles.botRow, animStyle]}>
      <View style={styles.botAvatar}>
        <Text style={styles.botAvatarText}>M</Text>
      </View>
      <View style={styles.botBubble}>
        <Text style={styles.botName}>Márcio</Text>
        <Text style={styles.botText}>{item.text}</Text>
      </View>
    </Animated.View>
  )
}