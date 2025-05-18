import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { timerPresets } from '../config/timerPresets';
import { COLORS, SPACING, FONTS } from '../styles/theme';

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
          <Pressable
            style={styles.card}
            onPress={() => navigation.navigate('Timer', { config: item })}
          >
            <Text style={styles.cardText}>{item.name}</Text>
            <Text style={styles.cardSub}>
              Max: {Math.floor(item.duration / 60)}:{(item.duration % 60).toString().padStart(2, '0')}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.outer,
    backgroundColor: COLORS.background,
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
  card: {
    backgroundColor: COLORS.gray,
    padding: SPACING.between,
    borderRadius: 12,
    marginBottom: SPACING.between,
  },
  cardText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  cardSub: {
    color: '#ddd',
    marginTop: 4,
  },
});
