// App.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import AttendanceScreen from './screens/AttendanceScreen';
import EarnedPayrollScreen from './screens/EarnedPayrollScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from './theme';
import FAQScreen from './screens/FAQScreen';
import HelpAndComplaintsScreen from './screens/HelpAndComplaintsScreen';
import EmergencyContactScreen from './screens/EmergencyContactScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: { 
        backgroundColor: theme.colors.primary,
        paddingTop: 10,
        paddingBottom: 10,
        height: 50,
      },
      tabBarActiveTintColor: theme.colors.secondary,
      tabBarInactiveTintColor: theme.colors.accent, 
      headerShown: false
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: () => null,
        tabBarIcon: ({ color, size }) => (
          <Ionicons
            name={color === theme.colors.secondary ? 'home' : 'home-outline'}
            color={color}
            size={size}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Attendance"
      component={AttendanceScreen}
      options={{
        tabBarLabel: () => null,
        tabBarIcon: ({ color, size }) => (
          <Ionicons
            name={color === theme.colors.secondary ? 'calendar-sharp' : 'calendar-outline'}
            color={color}
            size={size}
          />
        ),
      }}
    />
    <Tab.Screen
      name="EarnedPayroll"
      component={EarnedPayrollScreen}
      options={{
        tabBarLabel: () => null,
        tabBarIcon: ({ color, size }) => {
          const IconComponent = color === theme.colors.secondary ? FontAwesome6 : MaterialIcons;
          const iconName = color === theme.colors.secondary ? 'money-bills' : 'money';
          
          return (
            <IconComponent
              name={iconName}
              color={color}
              size={size}
            />
          );
        },
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: () => null,
        tabBarIcon: ({ color, size }) => (
          <FontAwesome
            name={color === theme.colors.secondary ? 'user' : 'user-o'}
            color={color}
            size={size}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FAQ" component={FAQScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HelpAndComplaints" component={HelpAndComplaintsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EmergencyContact" component={EmergencyContactScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
