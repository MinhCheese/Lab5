import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FIRESTORE_DB } from '../firebaseConfig'; // Firebase configuration
import { collection, getDocs } from 'firebase/firestore'; // Firebase Firestore SDK

// Define the Service data type
type Service = {
  id: string;
  Creator: string;
  Price: number;
  ServiceName: string;
};

const CustomerListService = ({ navigation }: any) => {
  const [services, setServices] = useState<Service[]>([]); // Services data
  const [loading, setLoading] = useState(true); // Data loading state

  useEffect(() => {
    // Function to fetch data from Firestore
    const fetchServices = async () => {
      try {
        const querySnapshot = await getDocs(collection(FIRESTORE_DB, 'Service'));
        const serviceList: Service[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data() as Omit<Service, 'id'>,
        }));
        setServices(serviceList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching service list:', error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Function to render each item in the service list
  const renderItem = ({ item }: { item: Service }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('DetailScreen', { service: item })}
      activeOpacity={0.7}
    >
      <Text style={styles.itemName}>{item.ServiceName}</Text>
      <Text style={styles.itemPrice}>{item.Price} ₫</Text>
    </TouchableOpacity>
  );

  // Show loading indicator while data is loading
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>CUSTOMER</Text>
        <Text style={styles.logo}>KAMI SPA</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.serviceListHeaderText}>Service List</Text>
        <FlatList
          data={services}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.bottomNav}>
        <Text style={styles.navItem}>Home</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
            <Text style={styles.navItem}>Setting</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Define styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  header: {
    backgroundColor: '#F8C0C8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E60026',
  },
  content: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  serviceListHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  itemPrice: {
    fontSize: 14,
    color: '#666666',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F8C0C8',
  },
  navItem: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default CustomerListService;
