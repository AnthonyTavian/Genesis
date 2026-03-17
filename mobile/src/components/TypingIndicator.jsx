import { useEffect } from 'react'
import { View, Text } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay
} from 'react-native-reanimated'
import { styles } from '../styles/ChatScreen.styles'

function Dot({ delay }) {
  const opacity = useSharedValue(0.3)

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 400 }),
          withTiming(0.3, { duration: 400 })
        ),
        -1,
        true
      )
    )
  }, [])

  const dotStyle = useAnimatedStyle(() => ({
    opacity: opacity.value
  }))

  return <Animated.View style={[styles.typingDot, dotStyle]} />
}

export default function TypingIndicator() {
  return (
    <View style={styles.botRow}>
      <View style={styles.botAvatar}>
        <Text style={styles.botAvatarText}>M</Text>
      </View>
      <View style={styles.typingBubble}>
        <Dot delay={0} />
        <Dot delay={200} />
        <Dot delay={400} />
      </View>
    </View>
  )
}