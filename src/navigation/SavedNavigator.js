import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WishlistScreen from '../screens/WishlistScreen';
import WishlistDetail from '../screens/WishlistDetail';
import MenuWishlist from '../screens/MenuWishlist';

const Stack = createStackNavigator();

const SavedNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'SavedList'}
        component={WishlistScreen}
        options={{
          title: 'Yêu thích',
          headerStyle: {
            backgroundColor: '#f2f2f2',
            height: 120,
          },
          headerTitleStyle: {
            fontSize: 30,
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name={'SavedDetail'}
        component={WishlistDetail}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#f2f2f2',
            height: 100,
          },
        }}
      />
      <Stack.Screen
        name={'MenuWishlist'}
        component={MenuWishlist}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#f2f2f2',
            height: 100,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default SavedNavigator;
