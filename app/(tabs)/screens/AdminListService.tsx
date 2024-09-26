import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Modal, TextInput } from 'react-native';
import { FIRESTORE_DB } from '../firebaseConfig'; 
import { collection, getDocs, addDoc } from 'firebase/firestore';

type Service = {
  id: string;
  Creator: string;
  Price: number;
  ServiceName: string;
};

const AdminListScreen = ({ navigation }: any) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [creator, setCreator] = useState('');
  const [price, setPrice] = useState('');
  const [serviceName, setServiceName] = useState('');

  useEffect(() => {
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

    const unsubscribe = navigation.addListener('focus', fetchServices); // Gọi lại hàm fetchServices mỗi khi màn hình được lấy nét

    fetchServices(); // Gọi hàm để tải dịch vụ ngay khi màn hình được hiển thị

    return unsubscribe; // Trả về hàm unsubscribe
  }, [navigation]);

  const renderItem = ({ item }: { item: Service }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('AdminDetailScreen', { service: item })}
      activeOpacity={0.7}
    >
      <Text style={styles.itemName}>{item.ServiceName}</Text>
      <Text style={styles.itemPrice}>{item.Price} ₫</Text>
      <Text style={styles.itemCreator}>{item.Creator}</Text> 
    </TouchableOpacity>
  );

  const handleAddService = async () => {
    if (!creator || !price || !serviceName) {
      alert('Please fill in all the information');
      return;
    }

    const priceValue = parseInt(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      alert('Service price must be a positive number');
      return;
    }

    const newService = {
      Creator: creator,
      Price: priceValue,
      ServiceName: serviceName,
    };

    try {
      await addDoc(collection(FIRESTORE_DB, 'Service'), newService);
      setServices(prevServices => [...prevServices, { ...newService, id: 'new-id' }]);
      setCreator('');
      setPrice('');
      setServiceName('');
      setModalVisible(false);
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>ADMIN</Text>
        <Text style={styles.logo}>KAMI SPA</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.serviceListHeader}>
          <Text style={styles.serviceListHeaderText}>Service List</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
          <View style={{ height: 10 }} />
        </View>
        <FlatList
          data={services}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      
      <View style={styles.bottomNav}>
        <Text style={styles.navItem}>Home</Text>       
        <Text style={styles.navItem}>Customer</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
          <Text style={styles.navItem}>Setting</Text>
        </TouchableOpacity>
      </View>
      
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Service</Text>
            <TextInput
              style={styles.input}
              placeholder="Creator's Name"
              value={creator}
              onChangeText={setCreator}
            />
            <TextInput
              style={styles.input}
              placeholder="Service Price"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Service Name"
              value={serviceName}
              onChangeText={setServiceName}
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleAddService}>
              <Text style={styles.submitButtonText}>Add Service</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

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
  serviceListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  serviceListHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  addButton: {
    backgroundColor: '#E60026',
    padding: 10,
    borderRadius: 10,
  },
  addButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
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
  itemCreator: {
    fontSize: 14, // Increased the font size from 12 to 14
    color: '#999999',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#E60026',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#E5E5E5',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#333333',
    fontWeight: 'bold',
  },
});

export default AdminListScreen;
