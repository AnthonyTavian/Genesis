import { StyleSheet } from 'react-native'

export const modalStyles = StyleSheet.create({

  // Accept Modal  
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  imageBox: {
    width: 160,
    height: 160,
    backgroundColor: '#EAFAF1',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: 130,
    height: 130,
  },
  badge: {
    backgroundColor: '#FFD700',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 12,
  },
  badgeText: {
    color: '#1a1a1a',
    fontWeight: 'bold',
    fontSize: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 6,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  timerBox: {
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  timerBoxUrgent: {
    backgroundColor: '#FFEBEE',
  },
  timerLabel: {
    fontSize: 13,
    color: '#E65100',
    marginBottom: 4,
  },
  timerLabelUrgent: {
    color: '#B71C1C',
  },
  timer: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#E65100',
  },
  timerUrgent: {
    color: '#B71C1C',
  },
  confirmButton: {
    backgroundColor: '#1B5E20',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  confirmText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    padding: 12,
    alignItems: 'center',
    width: '100%',
  },
  cancelText: {
    color: '#999',
    fontSize: 14,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  originalPrice: {
    color: '#aaa',
    fontSize: 14,
    textDecorationLine: 'line-through',
  },
  discountPrice: {
    color: '#1B5E20',
    fontSize: 20,
    fontWeight: 'bold',
  },

  // Decline Modal
  lossBox: {
    backgroundColor: '#FFEBEE',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  lossLabel: {
    fontSize: 13,
    color: '#B71C1C',
    marginBottom: 4,
  },
  lossValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#B71C1C',
  },
})