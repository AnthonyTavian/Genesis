import { View, Text, TouchableOpacity, StatusBar } from 'react-native'
import { useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay, withSpring } from 'react-native-reanimated'
import Header from '../components/Header'
import { styles } from '../styles/EndScreen.styles'

export default function EndScreen({ navigation, route }) {
  const insets = useSafeAreaInsets()
  const { accepted } = route.params || {}

  const emojiScale = useSharedValue(0)
  const titleOpacity = useSharedValue(0)
  const subtitleOpacity = useSharedValue(0)
  const buttonsOpacity = useSharedValue(0)

  useEffect(() => {
    emojiScale.value = withSpring(1, { damping: 8, stiffness: 100 })
    titleOpacity.value = withDelay(300, withTiming(1, { duration: 500 }))
    subtitleOpacity.value = withDelay(500, withTiming(1, { duration: 500 }))
    buttonsOpacity.value = withDelay(600, withTiming(1, { duration: 400 }))
  }, [])

  const emojiStyle = useAnimatedStyle(() => ({
    transform: [{ scale: emojiScale.value }]
  }))

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value
  }))

  const subtitleStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value
  }))

  const buttonsStyle = useAnimatedStyle(() => ({
    opacity: buttonsOpacity.value,
  }))

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1B5E20" barStyle="light-content" />
      <View style={{ height: insets.top, backgroundColor: '#1B5E20' }} />
      <Header title="GENESIS" subtitle="Fim da sessão" />

      <View style={styles.content}>
        <Animated.Text style={[styles.emoji, emojiStyle]}>
          {accepted ? '🎉' : '😔'}
        </Animated.Text>

        <Animated.Text style={[styles.title, titleStyle]}>
          {accepted ? 'Oferta resgatada!' : 'Sessão encerrada'}
        </Animated.Text>

        <Animated.Text style={[styles.subtitle, subtitleStyle]}>
          {accepted
            ? 'Sua oferta foi salva no histórico.'
            : 'Você recusou todas as ofertas dessa sessão.'}
        </Animated.Text>
      </View>

      <Animated.View style={[styles.buttons, buttonsStyle]}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.replace('Chat')}
        >
          <Text style={styles.primaryText}>🔄 Nova sessão</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('History')}
        >
          <Text style={styles.secondaryText}>📋 Histórico</Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={{ height: insets.bottom, backgroundColor: '#1B5E20' }} />
    </View>
  )
}