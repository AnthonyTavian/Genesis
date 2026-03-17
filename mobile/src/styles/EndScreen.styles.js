import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FAF0',
  },
  content: {
    flex: 1,
    backgroundColor: '#F0FAF0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttons: {
    padding: 24,
    gap: 12,
    backgroundColor: '#F0FAF0',  
  },
  primaryButton: {
    backgroundColor: '#1B5E20',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D5F5E3',
  },
  secondaryText: {
    color: '#1B5E20',
    fontWeight: 'bold',
    fontSize: 16,
  },
})