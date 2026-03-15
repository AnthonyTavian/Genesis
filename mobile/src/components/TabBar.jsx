import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'
import { styles } from '../styles/ChatScreen.styles'

export default function TabBar({ navigation }) {
  const route = useRoute()

  function handleNavigate(screen) {
    if (screen === 'Chat' && navigation.canGoBack()) {
      navigation.goBack()
    } else if (screen === 'History') {
      navigation.navigate('History')
    }
  }

  return (
    <View style={styles.bottomButtons}>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => handleNavigate('Chat')}
      >
        <Ionicons
          name="pricetag-outline"
          size={24}
          color={route.name === 'Chat' ? '#1B5E20' : '#999'}
        />
        <Text style={[styles.tabText, route.name === 'Chat' && styles.tabTextActive]}>
          Ofertas
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => handleNavigate('History')}
      >
        <Ionicons
          name="time-outline"
          size={24}
          color={route.name === 'History' ? '#1B5E20' : '#999'}
        />
        <Text style={[styles.tabText, route.name === 'History' && styles.tabTextActive]}>
          Histórico
        </Text>
      </TouchableOpacity>
    </View>
  )
}