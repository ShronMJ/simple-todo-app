import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import LogOutButton from '@/components/LogOutButton';
import LoginHeader from "@/components/LoginHeader";

import { store, persistor } from '../redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
    DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
    DMRegular: require('../assets/fonts/DMSans-Regular.ttf')
  })
  useEffect(() => { SplashScreen.hideAsync(); }, []);

  if (!fontsLoaded) return null;
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack
          screenOptions={{
            headerTitle: ({ children }) => <LoginHeader title={children} />,
            headerLeft: () => null,
          }}>
          <Stack.Screen name="login" options={{
            presentation: 'modal',
            title: "log in"
          }} />
          <Stack.Screen name="home/[id]" options={{
            headerLeft: () => <LogOutButton />,
            headerRight: () => <LogOutButton />,
            headerTitle: ""
          }} />
        </Stack>
      </PersistGate>
    </Provider>
  );
}
