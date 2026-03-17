import { View, FlatList, Text, StatusBar } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { styles } from '../styles/HistoryScreen.styles'
import { useHistory } from '../hooks/useHistory'
import { useHistorySearch } from '../hooks/useHistorySearch' 
import Header from '../components/Header'
import TabBar from '../components/TabBar'
import HistoryCard from '../components/HistoryCard'
import HistoryStats from '../components/HistoryStats' 

export default function HistoryScreen({ navigation }) {
  const { rescues, formatDate } = useHistory()
  const insets = useSafeAreaInsets()
  
  
  const { search, setSearch, filteredRescues, totalSaved } = useHistorySearch(rescues)

  return (
    <View style={styles.container}>
      <View style={{ height: insets.top, backgroundColor: '#1B5E20' }} />
      <StatusBar backgroundColor="#1B5E20" barStyle="light-content" />
      <Header title="GENESIS" subtitle="Histórico de resgates" onProfilePress={() => {}} />

      <View style={styles.content}>
        <FlatList
          data={filteredRescues}
          keyExtractor={item => item.id.toString()}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => <HistoryCard item={item} formatDate={formatDate} />}
          ListHeaderComponent={
            <HistoryStats 
              totalSaved={totalSaved} 
              totalCount={rescues?.length || 0} 
              search={search} 
              setSearch={setSearch} 
            />
          }
          contentContainerStyle={{ paddingBottom: 16 }}
          style={styles.list}
          ListEmptyComponent={
            <Text style={styles.empty}>
              {search ? 'Nenhuma oferta encontrada.' : 'Você ainda não possui resgates.'}
            </Text>
          }
        />
        <TabBar navigation={navigation} />
      </View>

      <View style={{ height: insets.bottom, backgroundColor: '#1B5E20' }} />
    </View>
  )
}