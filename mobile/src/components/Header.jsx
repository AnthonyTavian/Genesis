import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { headerStyles } from '../styles/Header.styles'

export default function Header({ title, subtitle, onProfilePress }) {
  return (
    <View style={headerStyles.header}>
      <View style={headerStyles.headerRow}>
        <View>
          <Text style={headerStyles.headerTitle}>{title}</Text>
          <Text style={headerStyles.headerSubtitle}>{subtitle}</Text>
        </View>
        <TouchableOpacity onPress={onProfilePress}>
          <Ionicons name="person-circle-outline" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  )
}