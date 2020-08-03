import React from "react";

// import {createAppContainer} from 'react-navigation';
// import {createStackNavigator} from 'react-navigation-stack';

import {
  HomeFeed, TestStrip, Login,

} from "../Screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTab } from "../Components";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { NavigationContainer } from "@react-navigation/native";
import AppNavKeys from "../Common/AppNavKeys";
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <BottomTab {...props} />}>
        <Tab.Screen name={AppNavKeys.HomeFeed} component={HomeFeed} />
        <Tab.Screen name={AppNavKeys.TestStrip} component={TestStrip} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default createAppContainer(createSwitchNavigator(
  {
    Login: Login,
    App: MyTabs
  },
  {
    // initialRouteName: 'AuthLoading',
  }
));
