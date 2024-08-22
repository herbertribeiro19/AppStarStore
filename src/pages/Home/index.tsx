import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import Header from '../../components/Header';
import Banner from '../../components/Banner';
import { ScrollView } from 'react-native-gesture-handler';
import Produtos from '../../components/Produtos';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView scrollEnabled={true}>
        <TextInput
          style={styles.input}
          placeholder="Pesquise seu produto"
          value={searchTerm}
          placeholderTextColor={"#f1f1f1"}
          onChangeText={(text) => setSearchTerm(text)}
        />
        <Banner />
        <Produtos searchTerm={searchTerm} />
      </ScrollView>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingBottom: 6,
    alignContent: 'center',
    alignSelf: 'center',
  },
  input: {
    width: '90%',
    borderRadius: 40,
    padding: 18,
    borderWidth: 0.5,
    borderColor: '#000',
    backgroundColor: '#232327',
    color: "#fff",
    alignSelf: 'center',
    fontSize: 16,
    marginBottom: 10,
  },
});