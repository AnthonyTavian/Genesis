import { View, Text, TextInput } from 'react-native'
import { styles } from '../styles/HistoryScreen.styles'

export default function HistoryStats({ totalSaved, totalCount, search, setSearch }) {
  if (totalCount === 0) return null

  return (
    <View style={styles.historyHeader}>
      <View style={styles.statsCard}>
        <Text style={styles.statsLabel}>ECONOMIA TOTAL</Text>
        <Text style={styles.statsValue}>R$ {totalSaved.toFixed(2)}</Text>
        <Text style={styles.statsSub}>Em {totalCount} ofertas</Text>
      </View>

      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar pelo título..."
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={setSearch}
          clearButtonMode="while-editing"
        />
      </View>
    </View>
  )
}