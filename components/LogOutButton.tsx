import { Pressable, Text, StyleSheet } from 'react-native';
import { router } from "expo-router";
import { initializeApp } from '@firebase/app';
import { getAuth, signOut } from 'firebase/auth';
import firebaseConfig from '@/constants/firebaseConfig';

const appAuth = initializeApp(firebaseConfig);

export default function LogOutButton() {
    const auth = getAuth(appAuth);
    const handlePress = async () => {
        await signOut(auth);
        router.replace('/login')
    }

    return (
        <Pressable onPress={handlePress}
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, styles.button]}
        >
            <Text style={styles.text}>Logout</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007bff', // Blue color
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    text: {
        fontFamily: "DMMedium",
        color: 'white',
        fontSize: 16,
    }
})