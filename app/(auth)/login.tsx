import { Stack } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  AppState,
  TextInput,
  Button,
  Pressable,
  Text,
} from 'react-native';

import { supabase } from '~/utils/supabase';

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert('Por favor revisa tu bandeja de entrada para verificar el correo electrónico');
    setLoading(false);
  }

  return (
    <View className="flex-1 gap-3 bg-white p-5 pt-10">
      <Stack.Screen options={{ title: 'Iniciar sesión', headerTitleAlign: 'center' }} />
      <TextInput
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="direccion@email.com"
        autoCapitalize="none"
        className="rounded-md border border-gray-200 p-3"
      />
      <TextInput
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
        placeholder="Contraseña"
        autoCapitalize="none"
        className="rounded-md border border-gray-200 p-3"
      />
      <View className="flex-row gap-3">
        <Pressable
          onPress={() => signInWithEmail()}
          disabled={loading}
          className="flex-auto items-center rounded-md border-2 border-rose-500 p-3 px-8">
          <Text className="text-lg font-bold text-rose-500">Iniciar sesión</Text>
        </Pressable>
        <Pressable
          onPress={() => signUpWithEmail()}
          disabled={loading}
          className="flex-auto items-center rounded-md bg-rose-500 p-3 px-8">
          <Text className="text-lg font-bold text-white">Registrarse</Text>
        </Pressable>
      </View>
    </View>
  );
}
