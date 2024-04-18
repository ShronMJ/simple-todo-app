import { Text, View, StyleSheet } from "react-native";
import React from "react";

const LoginHeader: React.FC<{title:string}>= ({title}) => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>ToDo List</Text>
        <Text style={styles.subtitle}>{`Please ${title} to proceed.`}</Text>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      alignItems: "flex-start",
      marginTop: 20,
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontFamily: "DMBold"
    },
    subtitle: {
      fontSize: 16,
      color: "gray",
      fontFamily: "DMRegular"
    },
  });
  
  export default LoginHeader;