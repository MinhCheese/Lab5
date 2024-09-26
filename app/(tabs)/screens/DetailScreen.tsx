import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const DetailScreen = ({ route }: any) => {
  const { service } = route.params; // Get service information from params

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{service.ServiceName}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>Giá: <Text style={styles.price}>{service.Price} ₫</Text></Text>
        <Text style={styles.text}>Người tạo: <Text style={styles.creator}>{service.Creator}</Text></Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F7F7',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#E60026', // Color for the title
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2, // For Android shadow
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333333',
  },
  price: {
    fontWeight: 'bold',
    color: '#F08080', // Color for the price
  },
  creator: {
    fontStyle: 'italic',
    color: '#666666', // Color for the creator
  },
});

export default DetailScreen;
