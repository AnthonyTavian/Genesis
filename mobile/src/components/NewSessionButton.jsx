import { TouchableOpacity, Text } from 'react-native'
import { styles } from '../styles/ChatScreen.styles'

export default function NewSessionButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.newSessionButton} onPress={onPress}>
      <Text style={styles.buttonText}>🔄 Nova sessão</Text>
    </TouchableOpacity>
  )
}