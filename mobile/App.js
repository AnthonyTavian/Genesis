import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import ChatScreen from './src/screens/ChatScreen'
import HistoryScreen from './src/screens/HistoryScreen'
import { useEffect } from 'react'
import { setupDatabase } from './src/database/database'
import { StatusBar } from 'react-native'

const Stack = createStackNavigator()

export default function App() {

   useEffect(() => {
    setupDatabase()
  }, [])

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#1B5E20" barStyle="light-content" />
      <Stack.Navigator initialRouteName="Chat">
        <Stack.Screen 
          name="Chat" 
          component={ChatScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="History" 
          component={HistoryScreen} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}