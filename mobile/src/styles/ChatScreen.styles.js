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

  // Chat
  chatList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },

  // Mensagem do bot
  botRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 8,
    maxWidth: '80%',
  },
  botAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1B5E20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  botAvatarText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  botBubble: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    padding: 12,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  botName: {
    color: '#1B5E20',
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  botText: {
    color: '#333',
    fontSize: 14,
    lineHeight: 20,
  },

  // Mensagem do usuário
  userRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
    maxWidth: '80%',
    alignSelf: 'flex-end',
  },
  userBubble: {
    backgroundColor: '#1B5E20',
    borderRadius: 16,
    borderBottomRightRadius: 4,
    padding: 12,
  },
  userText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },

  // Card da oferta
  offerCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#D5F5E3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  offerLabel: {
    color: '#1B5E20',
    fontSize: 11,
    letterSpacing: 2,
    marginBottom: 12,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  offerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  offerImageBox: {
    width: 70,
    height: 70,
    backgroundColor: '#EAFAF1',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  offerImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  offerInfo: {
    flex: 1,
  },
  offerTitle: {
    color: '#1a1a1a',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
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
  offerDescription: {
    color: '#666',
    fontSize: 13,
    lineHeight: 18,
  },
  offerButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  acceptButton: {
    flex: 1,
    backgroundColor: '#1B5E20',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  declineButton: {
    flex: 1,
    backgroundColor: '#C0392B',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  acceptedButton: {
    backgroundColor: '#1B5E20',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  declinedButton: {
    backgroundColor: '#C0392B',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  declineButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },

  // Botões finais
  newSessionButton: {
    backgroundColor: '#1B5E20',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 8,
    marginBottom: 16,
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