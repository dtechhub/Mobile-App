import * as React from 'react';
import { SafeAreaView, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HomePage } from './pages/Home';
import { AboutPage } from './pages/About';
import { SearchPage } from './pages/Search';

const Tab = createBottomTabNavigator();

let App = () => {
  return (
    <SafeAreaView style={styles.app}>
      <NavigationContainer>
        <Tab.Navigator
          style={styles.navigation}
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              
              if (route.name === 'Home') {
                iconName = focused
                  ? 'home'
                  : 'home-outline';
              } else if (route.name === 'About') {
                iconName = focused ? 'information-circle' : 'information-circle-outline';
              } else if (route.name === 'Search') {
                iconName = focused ? 'search' : 'search-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarLabel: () => null,
            tabBarActiveTintColor: 'teal',
            tabBarInactiveTintColor: 'gray',
            tabBarPosition: 'bottom',
            swipeEnabled: true,
            animationEnabled: true,
          })}
        >
          <Tab.Screen name="Home" component={HomePage} />
          <Tab.Screen name="About" component={AboutPage} />
          <Tab.Screen name="Search" component={SearchPage} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

let styles = StyleSheet.create({
  app: {
    flex: 1,
    flexDirection: 'column',
  },
  navigation: {
    
  },
});

export default App;
