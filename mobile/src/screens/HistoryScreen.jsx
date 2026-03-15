import { View, FlatList, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { styles } from '../styles/HistoryScreen.styles'
import { useHistory } from '../hooks/useHistory'
import Header from '../components/Header'
import TabBar from '../components/TabBar'
import HistoryCard from '../components/HistoryCard'

export default function HistoryScreen({ navigation }) {
  const { rescues, formatDate } = useHistory()
  const insets = useSafeAreaInsets()

  function renderItem({ item }) {
    return <HistoryCard item={item} formatDate={formatDate} />
  }

  return (
    <View style={styles.container}>
      <Header title="GENESIS" subtitle="Histórico de resgates" onProfilePress={() => {}} />
      <View style={styles.content}>
        <FlatList
          data={rescues}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 32 }}
          style={styles.list}
          ListEmptyComponent={
            <Text style={styles.empty}>Nenhuma oferta resgatada ainda.</Text>
          }
        />
        <TabBar navigation={navigation} />
      </View>
      <View style={{ height: insets.bottom, backgroundColor: '#1B5E20' }} />
    </View>
  )
}