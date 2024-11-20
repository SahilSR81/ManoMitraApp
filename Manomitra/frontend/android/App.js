import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import MoodTrackerScreen from './src/screens/MoodTrackerScreen';
import ContentRecommendationsScreen from './src/screens/ContentRecommendationsScreen';
import PushNotification from 'react-native-push-notification';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    PushNotification.configure({
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });

    // Schedule notification every 3 hours
    PushNotification.createChannel(
      {
        channelId: "manomitra-reminders",
        channelName: "Manomitra Reminders",
        channelDescription: "Reminders for Manomitra app",
        soundName: "default",
        importance: 4,
        vibrate: true,
      },
      (created) => console.log(`createChannel returned '${created}'`)
    );

    PushNotification.localNotificationSchedule({
      channelId: "manomitra-reminders",
      title: "Manomitra Reminder",
      message: "Take a moment for your mental wellness!",
      date: new Date(Date.now() + 5 * 1000),
      repeatType: 'time',
      repeatTime: 3 * 60 * 60 * 1000, // 3 hours
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="MoodTracker" component={MoodTrackerScreen} />
        <Stack.Screen name="ContentRecommendations" component={ContentRecommendationsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;