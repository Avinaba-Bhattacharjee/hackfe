import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import axios from "axios";
import moment from "moment";
import tw from "twrnc";

const API_URL = "http://localhost:3000/api/patients";

interface Patient {
  id: number;
  patient_name: string;
  age: number | string;
  gender: string;
  date_added: string;
  symptom_duration?: string;
  muscle_weakness?: boolean;
  speech_difficulty?: boolean;
}

const PatientList = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [editMode, setEditMode] = useState<number | null>(null);
  const [editedPatient, setEditedPatient] = useState<Partial<Patient>>({});
    const [deleteMode, setDeleteMode] = useState<number | null>(null);
  const [deletedPatient, setDeletedPatient] = useState<Partial<Patient>>({});

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get(API_URL);
      setPatients(response.data);
    } catch (err) {
      console.error("Failed to fetch patients:", err);
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
    setEditMode(null);
    setDeleteMode(null);
  };

  const handleEdit = (patient: Patient) => {
    setEditedPatient(patient);
    setEditMode(patient.id);
  };
const handleDelete = (patient: Patient) => {
  console.log("Delete button pressed for:", patient.id);
  deletePatient(patient.id); // Call directly
};



  const saveEdit = async () => {
    try {
      await axios.put(`${API_URL}/${editedPatient.id}`, editedPatient);
      setEditMode(null);
      fetchPatients();
    } catch (err) {
      console.error("Update error:", err);
    }
  };
const deletePatient = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    setPatients(patients.filter((p) => p.id !== id));
  } catch (err) {
    console.error("Delete error:", err);
    Alert.alert("Error", "Failed to delete patient.");
  }
};



  const renderItem = ({ item }: { item: Patient }) => {
    const isExpanded = expandedId === item.id;
    const isEditing = editMode === item.id;
    const isDeleting = deleteMode === item.id;

    return (
      <View style={tw`border border-gray-300 rounded-lg p-3 mb-3 bg-white shadow-sm`}>
        <TouchableOpacity onPress={() => toggleExpand(item.id)}>
          <View style={tw`mb-2`}>
            <Text style={tw`text-lg font-bold text-gray-800`}>{item.patient_name}</Text>
            <Text style={tw`text-sm text-gray-600`}>
              {item.age} | {item.gender}
            </Text>
            <Text style={tw`text-xs text-gray-400 mt-1`}>
              {moment(item.date_added).format("YYYY-MM-DD")}
            </Text>
          </View>
        </TouchableOpacity>

        {isExpanded && (
          <View style={tw`mt-2`}>
            {isEditing ? (
              <>
                <TextInput
                  style={tw`border border-gray-400 p-2 my-1 rounded`}
                  value={editedPatient.patient_name}
                  onChangeText={(text) =>
                    setEditedPatient({ ...editedPatient, patient_name: text })
                  }
                  placeholder="Name"
                />
                <TextInput
                  style={tw`border border-gray-400 p-2 my-1 rounded`}
                  keyboardType="numeric"
                  value={String(editedPatient.age)}
                  onChangeText={(text) =>
                    setEditedPatient({ ...editedPatient, age: text })
                  }
                  placeholder="Age"
                />
                <TextInput
                  style={tw`border border-gray-400 p-2 my-1 rounded`}
                  value={editedPatient.gender}
                  onChangeText={(text) =>
                    setEditedPatient({ ...editedPatient, gender: text })
                  }
                  placeholder="Gender"
                />
                <TouchableOpacity style={tw`bg-green-600 py-2 mt-2 rounded`} onPress={saveEdit}>
                  <Text style={tw`text-white text-center font-semibold`}>Save</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text>Symptom Duration: {item.symptom_duration}</Text>
                <Text>Muscle Weakness: {item.muscle_weakness ? "Yes" : "No"}</Text>
                <Text>Speech Difficulty: {item.speech_difficulty ? "Yes" : "No"}</Text>
                <View style={tw`flex-row mt-3 justify-between`}>
                  <TouchableOpacity
                    style={tw`bg-blue-500 px-3 py-2 rounded mr-1 flex-1`}
                    onPress={() => handleEdit(item)}
                  >
                    <Text style={tw`text-white text-center font-semibold`}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={tw`bg-red-500 px-3 py-2 rounded ml-1 flex-1`}
                    onPress={() => handleDelete(item)}
                  >
                    <Text style={tw`text-white text-center font-semibold`}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <FlatList
      data={patients}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={tw`p-4`}
    />
  );
};

export default PatientList;
