import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/Header';

export default function Payment() {
    return (
        <View style={styles.container}>
            <Header />
            <Text style={styles.title}>Página de Pagamento</Text>
            <Text style={styles.description}>Aqui você pode implementar a lógica de pagamento.</Text>
            {/* Adicione campos e botões para o pagamento conforme necessário */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        marginVertical: 20,
    },
});