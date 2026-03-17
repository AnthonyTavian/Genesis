import { useRef, useEffect } from 'react'
import { View, FlatList, StatusBar } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { styles } from '../styles/ChatScreen.styles'
import { useChat } from '../hooks/useChat'
import BotMessage from '../components/BotMessage'
import UserMessage from '../components/UserMessage'
import OfferCard from '../components/OfferCard'
import TabBar from '../components/TabBar'
import Header from '../components/Header'
import TypingIndicator from '../components/TypingIndicator'

export default function ChatScreen({ navigation }) {
  const { messages, startNewSession, handleDecision, timer, isFinished, wasAccepted, isTyping, isExpired } = useChat()
  const initialized = useRef(false)
  const insets = useSafeAreaInsets()
  const flatListRef = useRef(null)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    startNewSession()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const scrollTimer = setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true })
    }, 100)
    return () => clearTimeout(scrollTimer)
  }, [messages, isTyping])

  useEffect(() => {
    if (isFinished) {
      navigation.replace('End', { accepted: wasAccepted })
    }
  }, [isFinished])

  const allMessages = isTyping
    ? [...messages, { id: 'typing', type: 'typing' }]
    : messages

  function renderMessage({ item }) {
    switch (item.type) {
      case 'bot':
        return <BotMessage item={item} />
      case 'user':
        return <UserMessage item={item} />
      case 'offer':
        return <OfferCard item={item} onDecision={handleDecision} timer={timer} isExpired={isExpired} />
      case 'typing':
        return <TypingIndicator />
      default:
        return null
    }
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar backgroundColor="#1B5E20" barStyle="light-content" />
      <Header title="GENESIS" subtitle="Ofertas exclusivas para você" onProfilePress={() => {}} />
      <View style={styles.content}>
        <FlatList
          ref={flatListRef}
          data={allMessages}
          keyExtractor={item => item.id.toString()}
          renderItem={renderMessage}
          ListFooterComponent={<View style={{ height: 16 }} />}
          style={styles.chatList}
        />
        <TabBar navigation={navigation} />
      </View>
      <View style={{ height: insets.bottom, backgroundColor: '#1B5E20' }} />
    </View>
  )
}