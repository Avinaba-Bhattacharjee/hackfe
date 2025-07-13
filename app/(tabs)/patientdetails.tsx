import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Switch,
  Alert,
  Platform,
} from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import tw from 'twrnc';

const PatientForm = () => {
  const [formData, setFormData] = useState({
    patient_name: '',
    age: '',
    gender: '',
    symptom_duration: '',
    muscle_weakness: false,
    twitching: false,
    speech_difficulty: false,
    swallowing_difficulty: false,
    breathing_difficulty: false,
    family_history: false,
    previous_diagnosis: '',
    current_treatment: '',
    biomarker_status: '',
    EMG_result: '',
  });

  const [genderRequirement, setGenderRequirement] = useState('Both');

  const handleChange = (key: string, value: string | boolean) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:3000/api/patients', formData);
      Alert.alert('Success', 'Patient record created successfully!');
      setFormData({
        patient_name: '',
        age: '',
        gender: '',
        symptom_duration: '',
        muscle_weakness: false,
        twitching: false,
        speech_difficulty: false,
        swallowing_difficulty: false,
        breathing_difficulty: false,
        family_history: false,
        previous_diagnosis: '',
        current_treatment: '',
        biomarker_status: '',
        EMG_result: '',
      });
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to create patient record.');
    }
  };

return (
  <ScrollView contentContainerStyle={tw`p-4 bg-white min-h-full`}>
    <Text style={tw`text-xl font-bold mb-4 text-center text-purple-700`}>
      New Patient Form
    </Text>

    {/* Standard Text Inputs */}
    <TextInput
      style={tw`border border-gray-300 p-3 rounded mb-3 text-base h-12`}
      placeholder="Patient Name"
      value={formData.patient_name}
      onChangeText={(text) => handleChange('patient_name', text)}
    />

    <TextInput
      style={tw`border border-gray-300 p-3 rounded mb-3 text-base h-12`}
      placeholder="Age (Years)"
      keyboardType="numeric"
      value={formData.age}
      onChangeText={(text) => handleChange('age', text)}
    />

        <View style={tw`mb-4`}>
          <Text style={tw`text-base text-gray-700 mb-2`}>Gender Requirement:</Text>
          <View style={tw`border border-gray-300 rounded-md bg-white`}>
            <Picker
              selectedValue={genderRequirement}
              onValueChange={(itemValue:any) => setGenderRequirement(itemValue)}
              style={tw`h-12`} // Adjust height as needed
            >
              <Picker.Item label="Both" value="Both" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>
        </View>

    <TextInput
      style={tw`border border-gray-300 p-3 rounded mb-3 text-base h-12`}
      placeholder="Symptom Duration (days)"
      keyboardType="numeric"
      value={formData.symptom_duration}
      onChangeText={(text) => handleChange('symptom_duration', text)}
    />

    {/* Switches */}
    {[
      'muscle_weakness',
      'twitching',
      'speech_difficulty',
      'swallowing_difficulty',
      'breathing_difficulty',
      'family_history',
    ].map((field) => (
      <View
        key={field}
        style={tw`flex-row justify-between items-center border border-gray-200 rounded px-3 py-2 mb-3 h-12`}
      >
        <Text style={tw`text-base text-gray-700 capitalize`}>
          {field.replace(/_/g, ' ')}
        </Text>
        <Switch
          value={formData[field as keyof typeof formData] as boolean}
          onValueChange={(value) => handleChange(field, value)}
        />
      </View>
    ))}

    {/* Dropdowns */}
{[
  { key: 'previous_diagnosis', label: 'Previous Diagnosis', options: ['ALS', 'MS', 'None'] },
  { key: 'current_treatment', label: 'Current Treatment', options: ['Riluzole', 'Edaravone', 'None'] },
  { key: 'biomarker_status', label: 'Biomarker Status', options: ['Positive', 'Negative', 'Unknown'] },
  { key: 'EMG_result', label: 'EMG Result', options: ['Normal', 'Abnormal', 'Pending'] },
].map(({ key, label, options }) => (
  <View key={key} style={tw`border border-white rounded mb-3 px-2 justify-center h-12 bg-white`}>
    <Picker
      selectedValue={formData[key as keyof typeof formData]}
      onValueChange={(value) => handleChange(key, value)}
      style={tw`text-base text-gray-800`}
      dropdownIconColor="#6B7280"
      mode="dropdown"
    >
      <Picker.Item label={`Select ${label}`} value="" />
      {options.map((opt) => (
        <Picker.Item key={opt} label={opt} value={opt} />
      ))}
    </Picker>
  </View>
))}

    <View style={tw`mb-8`}>
      <Button title="Submit" color="#734BD1" onPress={handleSubmit} />
    </View>
  </ScrollView>
);

};

export default PatientForm;
