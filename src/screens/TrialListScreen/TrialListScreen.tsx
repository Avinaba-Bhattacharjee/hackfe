import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import styles from './TrialListScreen.styles';

const API_URL = 'http://localhost:3000/api/trials';

const TrialTable = () => {
  const [trials, setTrials] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filteredTrials, setFilteredTrials] = useState<any[]>([]);

  useEffect(() => {
    fetchTrials();
  }, []);

  const fetchTrials = async () => {
    try {
      const response = await axios.get(API_URL);
      setTrials(response.data);
      setFilteredTrials(response.data);
    } catch (error: any) {
      console.error('Error fetching trials:', error.message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTrials();
      Alert.alert('Success', 'Trial deleted successfully');
    } catch (error: any) {
      console.error('Delete error:', error.message);
    }
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = trials.filter((trial) =>
      trial.trial_name.toLowerCase().includes(text.toLowerCase()) ||
      trial.sponsor.toLowerCase().includes(text.toLowerCase()) ||
      trial.status.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredTrials(filtered);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.row}>
      <View style={styles.cell}><Text>{item.trial_name}</Text></View>
      <View style={styles.cell}><Text>{item.sponsor}</Text></View>
      <View style={styles.cell}><Text>{item.status}</Text></View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Trial Data</Text>
      <TextInput
        placeholder="Search Trials..."
        value={search}
        onChangeText={handleSearch}
        style={styles.searchInput}
      />

      <FlatList
        data={filteredTrials}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No trials found</Text>}
      />
    </View>
  );
};

export default TrialTable;
