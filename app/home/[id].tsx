import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider, theme } from "react-native-design-system";
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams } from "expo-router";

import ToDoList from '@/components/TodoList';

const Home: React.FC = () => {
  const [showChild, setShowChild] = useState(false);
  const { id } = useLocalSearchParams()
  const userId: string = Array.isArray(id) ? id[0] : id.toString();

  // Wait until after client-side hydration to show
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) { return null; }

  return (
    <GestureHandlerRootView>
      <ThemeProvider theme={theme} components={{}}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
              <View style={styles.containerTitle}>
                <FontAwesome name="list" size={30} color="black" style={styles.icon} />
                <Text style={styles.textTitle}>ToDo List</Text>
              </View>
              <ToDoList userId={userId} />
          </View>
        </SafeAreaView>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  containerTitle: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 20,
    paddingTop: 20,
  },
  textTitle: {
    fontFamily: "DMBold",
    fontSize: 30,
    marginTop: 5
  },
  icon: {
    padding: 10,
  }
})
export default Home