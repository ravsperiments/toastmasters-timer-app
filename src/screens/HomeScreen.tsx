import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { timerPresets } from '../config/timerPresets';
import { COLORS, SPACING, FONTS } from '../styles/theme';
import PresetCard from '../components/PresetCard';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Timer</Text>
      <FlatList
        data={timerPresets}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <PresetCard
            config={item}
            onPress={() => navigation.navigate('Timer', { config: item })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.outer,
    backgroundColor: '#f2f2f2', // Slightly darker than card
  },
  title: {
    fontSize: FONTS.title,
    marginBottom: SPACING.between,
    color: COLORS.textPrimary,
    alignSelf: 'center',
  },
  list: {
    paddingBottom: SPACING.outer,
  },
});
