import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import * as Animatable from 'react-native-animatable';
import { useRouter } from 'expo-router';

const photos = [
  { id: 1, source: require('../../assets/images/car1.png') },
  { id: 2, source: require('../../assets/images/car2.png') },
  { id: 3, source: require('../../assets/images/car3.png') },
  { id: 4, source: require('../../assets/images/car4.png') },
];

const LandingPage = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/patientdetails');
  };

  return (
    <ScrollView style={tw`bg-white`} contentContainerStyle={tw`pb-10`}>
      <Animatable.View animation="fadeInDown" duration={1000} style={tw`items-center mt-10`}>
        <Text style={tw`text-3xl font-bold text-[#734BD1]`}>Welcome to MedTrials</Text>
        <Text style={tw`text-base text-gray-600 mt-2 px-4 text-center`}>
          Explore cutting-edge clinical trials near you and be a part of medical innovation.
        </Text>
      </Animatable.View>

      <View style={tw`flex-row flex-wrap justify-center mt-8 px-4`}>
        {photos.map((photo, index) => (
          <Animatable.View
            key={photo.id}
            animation="zoomIn"
            delay={index * 200}
            style={tw`w-40 h-28 m-2 rounded-xl overflow-hidden shadow-lg`}
          >
            <Image
              source={photo.source}
              style={tw`w-full h-full`}
              resizeMode="cover"
            />
          </Animatable.View>
        ))}
      </View>

      <Animatable.View animation="fadeInUp" delay={800} style={tw`mt-10 px-6`}>
        <Text style={tw`text-lg text-gray-700 text-center mb-4`}>
          Join our mission to accelerate healthcare discoveries. Track your progress. Stay informed.
        </Text>
        <TouchableOpacity
          style={tw`bg-[#734BD1] rounded-full py-3 px-8 self-center`}
          onPress={handleGetStarted}
        >
          <Text style={tw`text-white text-base font-semibold`}>Get Started</Text>
        </TouchableOpacity>
      </Animatable.View>
    </ScrollView>
  );
};

export default LandingPage;
