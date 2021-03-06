import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DestinationSearchScreen from '../screens/DestinationSearch';
import HomeTabNavigator from '../navigation/HomeTabNavigator';
import DetailedPostScreen from '../screens/DetailedPostScreen';
import ProfileScreen from '../screens/Profile';
import ChangePassword from '../screens/ChangePassword';
import ForgotPasswordScreen from '../screens/ForgotPassword';
import DbProvider from '../Services/DbProvider';
import ListByTag from '../screens/ListByTag';
import Comment from '../screens/Comment';
import Rate from '../screens/RateScreen';

const Stack = createStackNavigator();
const AppStack = props => {
  return (
    <DbProvider>
      <Stack.Navigator>
        <Stack.Screen
          name={'HomeTabnavigator'}
          component={HomeTabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Destination Search'}
          component={DestinationSearchScreen}
          options={{
            title: 'Tìm kiếm địa điểm',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={'Detailed Post'}
          component={DetailedPostScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Profile'}
          component={ProfileScreen}
          options={{title: 'Chỉnh sửa thông tin', headerTitleAlign: 'center'}}
        />
        <Stack.Screen
          name={'Change Password'}
          component={ChangePassword}
          options={{title: 'Đổi mật khẩu', headerTitleAlign: 'center'}}
        />
        <Stack.Screen
          name={'Forgot Password'}
          component={ForgotPasswordScreen}
          options={{title: ''}}
        />
        <Stack.Screen
          name={'List by Tag'}
          component={ListByTag}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Comment'}
          component={Comment}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Rate'}
          component={Rate}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </DbProvider>
  );
};

export default AppStack;
