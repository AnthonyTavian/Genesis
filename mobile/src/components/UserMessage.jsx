import { View, Text } from 'react-native'
import { styles } from '../styles/ChatScreen.styles'

export default function UserMessage({ item }) {
  return (
    <View style={styles.userRow}>
      <View style={styles.userBubble}>
        <Text style={styles.userText}>{item.text}</Text>
      </View>
    </View>
  )
}