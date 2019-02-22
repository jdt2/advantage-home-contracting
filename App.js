import React from 'react';
import { Text, View } from 'react-native';
import styles from './Styles';
import {createAppContainer, createBottomTabNavigator} from 'react-navigation';



const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
})

export default createAppContainer(TabNavigator);