import { StyleSheet, StatusBar } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B5E20',
    paddingTop: StatusBar.currentHeight,
  },
  content: {
    flex: 1,
    backgroundColor: '#F0FAF0',
  },

  // Header
  header: {
    backgroundColor: '#1B5E20',
    paddingHorizontal: 20,
    paddingVertical: 14,
    paddingTop: 20,
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

  // Lista
  list: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },

  // Card
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#D5F5E3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardImageBox: {
    width: 70,
    height: 70,
    backgroundColor: '#EAFAF1',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  cardInfo: {
    flex: 1,
  },
  badge: {
    backgroundColor: '#EAFAF1',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    color: '#1B5E20',
    fontSize: 11,
    fontWeight: 'bold',
  },
  title: {
    color: '#1a1a1a',
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },
  description: {
    color: '#666',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  date: {
    color: '#aaa',
    fontSize: 11,
  },

  // Preço
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
    marginBottom: 4,
  },
  originalPrice: {
    color: '#aaa',
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
  discountPrice: {
    color: '#1B5E20',
    fontSize: 16,
    fontWeight: 'bold',
  },
  discountBadge: {
    backgroundColor: '#E8F5E9',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  discountBadgeText: {
    color: '#1B5E20',
    fontSize: 11,
    fontWeight: 'bold',
  },

  // Empty
  empty: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 14,
  },

  // Botões fixos
  sessionButton: {
    flex: 1,
    backgroundColor: '#1B5E20',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bottomButtons: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E8F5E9',
    backgroundColor: '#fff',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
    gap: 4,
  },
  tabText: {
    color: '#999',
    fontSize: 12,
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#1B5E20',
    fontWeight: 'bold',
  }, 
})