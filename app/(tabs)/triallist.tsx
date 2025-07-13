import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import tw from 'twrnc';

const API_URL = 'http://localhost:3000/api/trials';

const TrialTable = () => {
  const [trials, setTrials] = useState<any[]>([]);
  const [editingTrial, setEditingTrial] = useState<any | null>(null);
  const [editData, setEditData] = useState({ trial_name: '', sponsor: '', status: '' });

  useEffect(() => {
    fetchTrials();
  }, []);

  const fetchTrials = async () => {
    try {
      const response = await axios.get(API_URL);
      setTrials(response.data);
    } catch (error: any) {
      console.error('Error fetching trials:', error.message);
    }
  };

  const handleDelete = async (trial_id: number) => {
    try {
      await axios.delete(`${API_URL}/${trial_id}`);
      fetchTrials();
      Alert.alert('Success', 'Trial deleted successfully');
    } catch (error: any) {
      console.error('Delete error:', error.message);
    }
  };

  const handleEdit = (trial: any) => {
    setEditingTrial(trial);
    setEditData({
      trial_name: trial.trial_name,
      sponsor: trial.sponsor,
      status: trial.status,
    });
  };

  const submitEdit = async () => {
    if (!editingTrial) return;

    try {
      await axios.put(`${API_URL}/${editingTrial.trial_id}`, editData);
      fetchTrials();
      Alert.alert('Success', 'Trial updated successfully');
      setEditingTrial(null);
    } catch (error: any) {
      console.error('Update error:', error.message);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={tw`flex-row border-b border-gray-300 py-2 px-2 items-center`}>
      <View style={tw`flex-1`}><Text>{item.trial_name}</Text></View>
      <View style={tw`flex-1`}><Text>{item.sponsor}</Text></View>
      <View style={tw`flex-1`}><Text>{item.status}</Text></View>
      <View style={tw`flex-row`}>
        <TouchableOpacity
          style={[tw`px-3 py-1 rounded mr-2`, { backgroundColor: '#FF6961' }]} // pastel green
          onPress={() => handleEdit(item)}
        >
          <Text style={tw`text-black font-semibold`}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[tw`px-3 py-1 rounded`, { backgroundColor: '#AEDFF7' }]} // pastel blue
          onPress={() => handleDelete(item.trial_id)}
        >
          <Text style={tw`text-black font-semibold`}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={tw`p-4 bg-white flex-1`}>
      <Text style={tw`text-xl font-bold mb-4 text-center`}>Trial Data</Text>

      {/* Edit Form */}
      {editingTrial && (
        <View style={tw`mb-4 p-4 border border-blue-300 rounded`}>
          <Text style={tw`font-bold text-lg mb-2`}>Edit Trial</Text>
          <TextInput
            style={tw`border border-gray-300 p-2 mb-2`}
            placeholder="Trial Name"
            value={editData.trial_name}
            onChangeText={(text) => setEditData({ ...editData, trial_name: text })}
          />
          <TextInput
            style={tw`border border-gray-300 p-2 mb-2`}
            placeholder="Sponsor"
            value={editData.sponsor}
            onChangeText={(text) => setEditData({ ...editData, sponsor: text })}
          />
          <TextInput
            style={tw`border border-gray-300 p-2 mb-2`}
            placeholder="Status"
            value={editData.status}
            onChangeText={(text) => setEditData({ ...editData, status: text })}
          />
          <View style={tw`flex-row justify-between`}>
            <TouchableOpacity
              style={tw`bg-blue-500 px-4 py-2 rounded`}
              onPress={submitEdit}
            >
              <Text style={tw`text-white`}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`bg-gray-500 px-4 py-2 rounded`}
              onPress={() => setEditingTrial(null)}
            >
              <Text style={tw`text-white`}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Trial List */}
      <FlatList
        data={trials}
        keyExtractor={(item, index) => item?.trial_id?.toString() ?? index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={tw`text-center text-gray-500`}>No trials found</Text>}
      />
    </View>
  );
};

export default TrialTable;
