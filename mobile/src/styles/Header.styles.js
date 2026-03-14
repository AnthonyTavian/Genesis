import { StyleSheet } from 'react-native'

export const headerStyles = StyleSheet.create({
  header: {
    backgroundColor: '#1B5E20',
    paddingHorizontal: 20,
    paddingVertical: 8,
    paddingTop: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  headerSubtitle: {
    color: '#A5D6A7',
    fontSize: 12,
    marginTop: 2,
    letterSpacing: 1,
  },
})