import { useRef, useEffect } from 'react'
import { View, FlatList, StatusBar } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { styles } from '../styles/ChatScreen.styles'
import { useChat } from '../hooks/useChat'
import BotMessage from '../components/BotMessage'
import UserMessage from '../components/UserMessage'
import OfferCard from '../components/OfferCard'
import NewSessionButton from '../components/NewSessionButton'
import TabBar from '../components/TabBar'
import Header from '../components/Header'

export default function ChatScreen({ navigation }) {
  const { messages, initSession, handleDecision } = useChat()
  const flatListRef = useRef(null)
  const initialized = useRef(false)
  const insets = useSafeAreaInsets()

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    initSession()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function renderMessage({ item }) {
    if (item.type === 'bot') return <BotMessage item={item} />
    if (item.type === 'user') return <UserMessage item={item} />
    if (item.type === 'offer') return <OfferCard item={item} onDecision={handleDecision} />
    if (item.type === 'new_session') return <NewSessionButton onPress={initSession} />
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1B5E20" barStyle="light-content" />
      <Header title="GENESIS" subtitle="Ofertas exclusivas para você" />
      <View style={styles.content}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          style={styles.chatList}
          contentContainerStyle={{ paddingBottom: 16 }}
          onContentSizeChange={() => setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100)}
          renderItem={renderMessage}
        />
        <TabBar navigation={navigation} />
      </View>
       <View style={{ height: insets.bottom, backgroundColor: '#1B5E20' }} />
    </View>
  )
}