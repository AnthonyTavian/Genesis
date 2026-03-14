import { View, FlatList, Text, StatusBar } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { styles } from '../styles/HistoryScreen.styles'
import { useHistory } from '../hooks/useHistory'
import Header from '../components/Header'
import TabBar from '../components/TabBar'
import HistoryCard from '../components/HistoryCard'

export default function HistoryScreen({ navigation }) {
  const { rescues, formatDate } = useHistory()
  const insets = useSafeAreaInsets()

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1B5E20" barStyle="light-content" />
      <Header title="GENESIS" subtitle="Histórico de resgates" />
      <View style={styles.content}>
        <FlatList
          data={rescues}
          keyExtractor={item => item.id.toString()}
          style={styles.list}
          contentContainerStyle={{ paddingBottom: 32 }}
          ListEmptyComponent={
            <Text style={styles.empty}>Nenhuma oferta resgatada ainda.</Text>
          }
          renderItem={({ item }) => (
            <HistoryCard item={item} formatDate={formatDate} />
          )}
        />
        <TabBar navigation={navigation} />
      </View>
      <View style={{ height: insets.bottom, backgroundColor: '#1B5E20' }} />
    </View>
  )
}