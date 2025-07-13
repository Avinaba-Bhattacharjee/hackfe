import { Tabs } from 'expo-router';
import { View } from 'react-native';
import Header from '../../components/Header';
import tw from 'twrnc';

export default function TabLayout() {
  return (
    <View style={tw`flex-1 bg-white`}>
      <Header />
      <View style={tw`flex-1`}>
        <Tabs
          screenOptions={{
            headerShown: false,
          }}
          tabBar={() => null} // Hide default tab bar
        >
          <Tabs.Screen name="patientslist" />
          <Tabs.Screen name="triallist" />
          <Tabs.Screen name="patientdetails" />
          <Tabs.Screen name="trialdetails" />
          <Tabs.Screen name="patient_match" />
        </Tabs>
      </View>
    </View>
  );
}
