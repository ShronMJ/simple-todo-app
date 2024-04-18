import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import { router, Stack } from 'expo-router';
import { initializeApp } from 'firebase/app';
import {
  User,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import firebaseConfig from '@/constants/firebaseConfig';

const appAuth = initializeApp(firebaseConfig);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidLogin, setIsValidLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth(appAuth)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth])

  useEffect(() => {
    if (user) {
      router.navigate(`home/${user.uid}`);
    }
  }, [user])

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      if (isLogin)
        await signInWithEmailAndPassword(auth, email, password);
      else
        await createUserWithEmailAndPassword(auth, email, password);
      setIsValidLogin(true);

    } catch (error: any) {
      console.error(error.message);
      setIsValidLogin(false)
    }
    setIsLoading(false);
  };
  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        title: isLogin ? "Login" : "Sign Up"
      }} />

      <Text style={styles.title}>{isLogin ? "Login" : "Sign Up"}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable
        onPress={handleLogin}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#69adf5' : '#007bff'
          },
          styles.button
        ]}>
        <Text selectable={false} style={styles.buttonText}>{isLogin ? "Login" : "Sign Up"}</Text>
      </Pressable>
      {isLoading && <ActivityIndicator size={"large"} color={"#312651"} />}
      {!isValidLogin && <Text style={styles.invalidLoginText}>Wrong email or password</Text>}
      <Text style={styles.signupText}>
        Don't have an account?
        <Text style={styles.link} onPress={() => setIsLogin((prev) => !prev)}>
          {isLogin ? "Sign Up" : "Login"}
        </Text>
      </Text>
    </View>
  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '35%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  signupText: {
    marginTop: 10,
    fontFamily: "DMRegular",
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontFamily: "DMRegular",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    margin: 10
  },
  buttonText: {
    fontFamily: "DMMedium",
    color: 'white',
    fontSize: 16,

  },
  invalidLoginText: {
    fontFamily: "DMRegular",
    color: 'red'
  }
});

export default Login;