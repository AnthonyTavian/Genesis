import { View, Text } from 'react-native'
import { styles } from '../styles/ChatScreen.styles'

export default function BotMessage({ item }) {
  return (
    <View style={styles.botRow}>
      <View style={styles.botAvatar}>
        <Text style={styles.botAvatarText}>M</Text>
      </View>
      <View style={styles.botBubble}>
        <Text style={styles.botName}>Márcio</Text>
        <Text style={styles.botText}>{item.text}</Text>
      </View>
    </View>
  )
}