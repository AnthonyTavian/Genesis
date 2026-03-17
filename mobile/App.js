import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import ChatScreen from './src/screens/ChatScreen'
import HistoryScreen from './src/screens/HistoryScreen'
import EndScreen from './src/screens/EndScreen'


const Stack = createStackNavigator()

export default function App() {


  return (
    <NavigationContainer>
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
        <Stack.Screen 
          name="End" 
          component={EndScreen} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}