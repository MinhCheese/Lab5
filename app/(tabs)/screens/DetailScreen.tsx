import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetailScreen = ({ route }: any) => {
  const { service } = route.params; // Get service information from params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{service.ServiceName}</Text>
      <Text style={styles.text}>Giá: {service.Price} ₫</Text>
      <Text style={styles.text}>Người tạo: {service.Creator}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default DetailScreen;
