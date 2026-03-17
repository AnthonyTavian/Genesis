import { View, Text } from 'react-native'
import { useEffect } from 'react'
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated'
import { styles } from '../styles/ChatScreen.styles'

export default function UserMessage({ item }) {
  const { text } = item
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
    <Animated.View style={[styles.userRow, animStyle]}>
      <View style={styles.userBubble}>
        <Text style={styles.userText}>{text}</Text>
      </View>
    </Animated.View>
  )
}