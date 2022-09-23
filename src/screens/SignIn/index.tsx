import { Image, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as AuthSession from 'expo-auth-session';
import logoImg from '../../assets/logo-nlw-esports.png';
import {GameController} from 'phosphor-react-native';

import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';

import { styles } from './styles';
import { THEME } from '../../theme';

export function SignIn() {
  
  async function handleDiscordSignin(){

   const response = await AuthSession.startAsync({
      // url de autenticação, pegando no site do discord
      authUrl: "https://discord.com/api/oauth2/authorize?client_id=1022692657618767893&redirect_uri=https%3A%2F%2Fauth.expo.io%2F%40michaelalbuquerque%2Fmobile&response_type=token&scope=identify"
    });

    fetch('https://discord.com/api/users/@me', {
      headers:{
        'authorization': `Bearer ${response.params.access_token}`
      }
    }).then(response => response.json())
    .then(data => console.log(data));
    
  }

  return (
    <Background>
    <SafeAreaView style={styles.container}>
      <Image 
        source={logoImg}
        style={styles.logo}
      />

      <Heading 
        title="Encontre seu duo!"
        subtitle="Selecione o game que deseja jogar..."
      />

      <TouchableOpacity
       style={styles.button}
       onPress={handleDiscordSignin}
       >

        <GameController
          color={THEME.COLORS.TEXT}
          size={20}
          />

        <Text style={styles.buttoTitle}>
        Entra com Discord
        </Text>

      </TouchableOpacity>
    </SafeAreaView>
    </Background>
  );
}