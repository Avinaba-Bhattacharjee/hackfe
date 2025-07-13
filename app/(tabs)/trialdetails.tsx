import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import { View, Text, TextInput, Switch, ScrollView, TouchableOpacity, Alert } from 'react-native';
import tw from 'twrnc'; // twrnc import
import { Picker } from '@react-native-picker/picker'; // For dropdowns
import axios from 'axios';


// You might need to install this package:
// npm install @react-native-picker/picker
// or yarn add @react-native-picker/picker

const CreateTrialForm = () => {
  // State for each form field, initialized with empty or default values
  const [trialName, setTrialName] = useState('');
  const [sponsor, setSponsor] = useState('');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [genderRequirement, setGenderRequirement] = useState('Both'); // Default value
  const [minSymptomDuration, setMinSymptomDuration] = useState('');
  const [requiresMuscleWeakness, setRequiresMuscleWeakness] = useState(false);
  const [requiresTwitching, setRequiresTwitching] = useState(false);
  const [requiresPositiveBiomarker, setRequiresPositiveBiomarker] = useState('');
  const [requiresAbnormalEmg, setRequiresAbnormalEmg] = useState('');
  const [allowedTreatments, setAllowedTreatments] = useState('');
  const [exclusionPreviousDiagnosis, setExclusionPreviousDiagnosis] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('Recruiting'); // Default value
  const [startDate, setStartDate] = useState(''); // YYYY-MM-DD format
  const [endDate, setEndDate] = useState('');   // YYYY-MM-DD format
  const [showStartPicker, setShowStartPicker] = useState(false);
const [showEndPicker, setShowEndPicker] = useState(false);


  // Function to handle form submission
const handleSubmit = async () => {
  if (!trialName || !sponsor || !minAge || !maxAge || !location || !startDate || !endDate) {
    Alert.alert(
      'Validation Error',
      'Please fill in all required fields (Trial Name, Sponsor, Min/Max Age, Location, Start/End Date).'
    );
    return;
  }

  const formData = {
    trial_name: trialName,
    sponsor: sponsor,
    min_age: parseInt(minAge),
    max_age: parseInt(maxAge),
    gender_requirement: genderRequirement,
    min_symptom_duration: minSymptomDuration ? parseInt(minSymptomDuration) : null,
    requires_muscle_weakness: requiresMuscleWeakness,
    requires_twitching: requiresTwitching,
    requires_positive_biomarker: requiresPositiveBiomarker,
    requires_abnormal_emg: requiresAbnormalEmg,
    allowed_treatments: allowedTreatments,
    exclusion_previous_diagnosis: exclusionPreviousDiagnosis,
    location: location,
    status: status,
    start_date: startDate,
    end_date: endDate,
  };

  try {
    const response = await axios.post('http://localhost:3000/api/trials', formData);

    if (response.status === 201 || response.status === 200) {
      Alert.alert('Success', 'Trial created successfully!');
      console.log('Response:', response.data);
      // Optionally reset form fields here
    } else {
      Alert.alert('Error', 'Failed to create trial.');
    }
  } catch (error) {
    console.error('API Error:', error);
    if (axios.isAxiosError(error) && error.response) {
      Alert.alert('Error', error.response.data?.message || 'Server responded with an error.');
    } else {
      Alert.alert('Error', 'Network error or server not reachable.');
    }
  }
};


  return (
    <ScrollView style={tw`flex-1 bg-gray-100 p-4`}>
      <View style={tw`bg-white rounded-lg shadow-md p-6 mb-8`}>
        <Text style={tw`text-3xl font-bold text-gray-800 mb-6 text-center`}>Create New Trial</Text>

        {/* Trial Name */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-base text-gray-700 mb-2`}>Trial Name:</Text>
          <TextInput
            style={tw`border border-gray-300 rounded-md p-3 text-base bg-white`}
            placeholder="Enter trial name"
            value={trialName}
            onChangeText={setTrialName}
          />
        </View>

        {/* Sponsor */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-base text-gray-700 mb-2`}>Sponsor:</Text>
          <TextInput
            style={tw`border border-gray-300 rounded-md p-3 text-base bg-white`}
            placeholder="Enter sponsor name"
            value={sponsor}
            onChangeText={setSponsor}
          />
        </View>

        {/* Min Age */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-base text-gray-700 mb-2`}>Minimum Age:</Text>
          <TextInput
            style={tw`border border-gray-300 rounded-md p-3 text-base bg-white`}
            placeholder="e.g., 18"
            keyboardType="numeric"
            value={minAge}
            onChangeText={setMinAge}
          />
        </View>

        {/* Max Age */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-base text-gray-700 mb-2`}>Maximum Age:</Text>
          <TextInput
            style={tw`border border-gray-300 rounded-md p-3 text-base bg-white`}
            placeholder="e.g., 65"
            keyboardType="numeric"
            value={maxAge}
            onChangeText={setMaxAge}
          />
        </View>

        {/* Gender Requirement */}
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

        {/* Minimum Symptom Duration */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-base text-gray-700 mb-2`}>Minimum Symptom Duration (months, optional):</Text>
          <TextInput
            style={tw`border border-gray-300 rounded-md p-3 text-base bg-white`}
            placeholder="e.g., 6"
            keyboardType="numeric"
            value={minSymptomDuration}
            onChangeText={setMinSymptomDuration}
          />
        </View>

        {/* Requires Muscle Weakness */}
        <View style={tw`mb-4 flex-row items-center justify-between`}>
          <Text style={tw`text-base text-gray-700`}>Requires Muscle Weakness:</Text>
          <Switch
            trackColor={{ false: tw.color('gray-300'), true: tw.color('blue-500') }}
            thumbColor={requiresMuscleWeakness ? tw.color('blue-700') : tw.color('gray-500')}
            onValueChange={setRequiresMuscleWeakness}
            value={requiresMuscleWeakness}
          />
        </View>

        {/* Requires Twitching */}
        <View style={tw`mb-4 flex-row items-center justify-between`}>
          <Text style={tw`text-base text-gray-700`}>Requires Twitching:</Text>
          <Switch
            trackColor={{ false: tw.color('gray-300'), true: tw.color('blue-500') }}
            thumbColor={requiresTwitching ? tw.color('blue-700') : tw.color('gray-500')}
            onValueChange={setRequiresTwitching}
            value={requiresTwitching}
          />
        </View>

        {/* Requires Positive Biomarker */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-base text-gray-700 mb-2`}>Requires Positive Biomarker:</Text>
          <TextInput
            style={tw`border border-gray-300 rounded-md p-3 text-base bg-white`}
            placeholder="e.g., Specific gene mutation"
            value={requiresPositiveBiomarker}
            onChangeText={setRequiresPositiveBiomarker}
          />
        </View>

        {/* Requires Abnormal EMG */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-base text-gray-700 mb-2`}>Requires Abnormal EMG:</Text>
          <TextInput
            style={tw`border border-gray-300 rounded-md p-3 text-base bg-white`}
            placeholder="e.g., Yes/No/Specific findings"
            value={requiresAbnormalEmg}
            onChangeText={setRequiresAbnormalEmg}
          />
        </View>

        {/* Allowed Treatments */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-base text-gray-700 mb-2`}>Allowed Treatments:</Text>
          <TextInput
            style={tw`border border-gray-300 rounded-md p-3 text-base bg-white h-24`}
            placeholder="List allowed treatments (e.g., Standard care, specific medications)"
            multiline
            textAlignVertical="top"
            value={allowedTreatments}
            onChangeText={setAllowedTreatments}
          />
        </View>

        {/* Exclusion Previous Diagnosis */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-base text-gray-700 mb-2`}>Exclusion Previous Diagnosis:</Text>
          <TextInput
            style={tw`border border-gray-300 rounded-md p-3 text-base bg-white h-24`}
            placeholder="List previous diagnoses that exclude participation"
            multiline
            textAlignVertical="top"
            value={exclusionPreviousDiagnosis}
            onChangeText={setExclusionPreviousDiagnosis}
          />
        </View>

        {/* Location */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-base text-gray-700 mb-2`}>Location:</Text>
          <TextInput
            style={tw`border border-gray-300 rounded-md p-3 text-base bg-white`}
            placeholder="e.g., New York, NY"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        {/* Status */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-base text-gray-700 mb-2`}>Status:</Text>
          <View style={tw`border border-gray-300 rounded-md bg-white`}>
            <Picker
              selectedValue={status}
              onValueChange={(itemValue:any) => setStatus(itemValue)}
              style={tw`h-12`}
            >
              <Picker.Item label="Recruiting" value="Recruiting" />
              <Picker.Item label="Active" value="Active" />
              <Picker.Item label="Closed" value="Closed" />
              <Picker.Item label="On Hold" value="On Hold" />
            </Picker>
          </View>
        </View>

        {/* Start Date */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-base text-gray-700 mb-2`}>Start Date (YYYY-MM-DD):</Text>
          <TextInput
            style={tw`border border-gray-300 rounded-md p-3 text-base bg-white`}
            placeholder="e.g., 2023-01-15"
            value={startDate}
            onChangeText={setStartDate}
          />
        </View>

        {/* End Date */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-base text-gray-700 mb-2`}>End Date (YYYY-MM-DD):</Text>
          <TextInput
            style={tw`border border-gray-300 rounded-md p-3 text-base bg-white`}
            placeholder="e.g., 2024-12-31"
            value={endDate}
            onChangeText={setEndDate}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={tw`bg-blue-600 py-4 rounded-md items-center justify-center shadow-lg`}
          onPress={handleSubmit}
        >
          <Text style={tw`text-white text-lg font-semibold`}>Create Trial</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateTrialForm;
