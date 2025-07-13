// MatchedPatientsTable.js
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import axios from 'axios';
import tw from 'twrnc';

type Patient = {
  patientId: string;
  patientName: string;
  trialNames: string;
  matchingFactors: string;
  matchedDate: string;
};

const MatchedPatientsTable = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMatchedPatients = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/match-trials'); // Update to your API
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching matched patients:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatchedPatients();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={tw`flex-1 items-center justify-center bg-white`}>
        <ActivityIndicator size="large" color="#4B5563" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView>
        <View style={tw`flex-1 px-4 py-4`}>
          {/* Table Header */}
          <View style={tw`flex-row bg-purple-700 p-2 rounded-t-lg`}>
            <Text style={tw`text-white flex-1 font-bold text-xs`}>Patient ID</Text>
            <Text style={tw`text-white flex-2 font-bold text-xs`}>Name</Text>
            <Text style={tw`text-white flex-3 font-bold text-xs`}>Trial Names</Text>
            <Text style={tw`text-white flex-3 font-bold text-xs`}>Matching Factors</Text>
            <Text style={tw`text-white flex-2 font-bold text-xs`}>Matched Date</Text>
          </View>

          {/* Table Rows */}
          {patients.map((patient, index) => (
            <View
              key={index}
              style={tw`flex-row p-2 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
            >
              <Text style={tw`flex-1 text-gray-800 text-xs`}>{patient.patientId}</Text>
              <Text style={tw`flex-2 text-gray-800 text-xs`}>{patient.patientName}</Text>
              <Text style={tw`flex-3 text-gray-800 text-xs`} numberOfLines={2}>
                {patient.trialNames}
              </Text>
              <Text style={tw`flex-3 text-gray-800 text-xs`} numberOfLines={2}>
                {patient.matchingFactors}
              </Text>
              <Text style={tw`flex-2 text-gray-800 text-xs`}>
                {new Date(patient.matchedDate).toLocaleDateString()}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MatchedPatientsTable;
