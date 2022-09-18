import { useRef, useEffect} from 'react';
import { StatusBar } from 'react-native';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black

} from '@expo-google-fonts/inter';
import { Subscription } from 'expo-modules-core'

import { Background } from './src/components/Background';
import { Routes } from './src/routes/';
import { Loading } from './src/components/Loading';
import * as Notifications from 'expo-notifications';

import './src/service/notificationsConfigs';
import { getPushNotificationToken} from './src/service/getPushNotificationToken';



export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black

  });

  const getNoticationListener = useRef<Subscription>();

  const responseNoticationListener = useRef<Subscription>();
  
  useEffect(() => {
    getPushNotificationToken();
  });

  useEffect(() => {
    getNoticationListener.current =Notifications
    .addNotificationReceivedListener(notification => {  
      console.log(notification)
    });

    responseNoticationListener.current = Notifications
    .addNotificationResponseReceivedListener(response => {
      console.log(response)
    })

    return () => {
      if(getNoticationListener.current && responseNoticationListener.current){
        Notifications.removeNotificationSubscription(getNoticationListener.current);
        Notifications.removeNotificationSubscription(responseNoticationListener.current);
      }
    }
  },[]);

  return (
    <Background>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {
        fontsLoaded ? <Routes /> : <Loading />
      }

    </Background>

  );
}

