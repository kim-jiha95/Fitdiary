import React from 'react';

import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';

import MainPage from '../pages/MainPage';
import AddPage from '../pages/AddPage';
import MyPage from '../pages/MyPage';

const Tabs = createBottomTabNavigator();

const TabNavigator = ({ navigation }) => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName = Platform.OS === 'ios' ? 'ios-' : 'md-';

          if (route.name === 'MainPage') {
            iconName += 'browsers-sharp';
          } else if (route.name === 'AddPage') {
            // iconName += 'add-circle-outline';
            // <MaterialIcons name="child-care" size={24} color="black" />
              //  iconName += 'man';
              // iconName="bicycle-outline";
              iconName="barbell-sharp";
          } else if (route.name === 'MyPage') {
            iconName += 'person-circle-outline';
          }
          return (
            <Ionicons
              name={iconName}
              color={focused ? 'tomato' : 'grey'}
              size={26}
            />
          );
        },
      })}
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: '#fff',
          borderTopColor: '#eee',
          height: 100,
          fontSize: 10,
        },
      }}
    >
      <Tabs.Screen name="MainPage" component={MainPage} />
      <Tabs.Screen name="AddPage" component={AddPage} />
      <Tabs.Screen name="MyPage" component={MyPage} />
    </Tabs.Navigator>
  );
};

export default TabNavigator;