import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native';
import Header from '../../components/Header';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import * as SecureStore from 'expo-secure-store';


//Definindo os tipos de dados relacionadas a API
interface Transacao {
    id: number;
    value: number;
    dateTime: string;
    lastFourDigits: number;
    cardHolderName: string;
    createdAt: string;
    updatedAt: string;
}

export default function Transactions() {
    const [transacoes, setTransacoes] = useState<Transacao[]>([]);
    const [error, setError] = useState<string | null>(null);

    //Verificando a plataforma para aplicar a devida URL de localhost
    const BASE_URL = Platform.OS === 'ios' ? 'https://95db-179-189-87-179.ngrok-free.app' : 'https://95db-179-189-87-179.ngrok-free.app';

    //Pegando TOKEN
    const getToken = async () => {
        const token = await SecureStore.getItemAsync('userToken');
        return token;
    };

    //Fazendo o GET na API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await getToken();
                if (!token) {
                    throw new Error('Token não encontrado');
                }
                const response = await axios.get(`${BASE_URL}/transactions`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                setTransacoes(response.data);
                console.log(response.data);
            } catch (error) {
                setError('Erro ao carregar transações');
                console.log("ERRO AO CARREGAR!", error);
            }
        };
        fetchData();
    }, []);

    //Formatando a data que vem da API para ficar da forma correta
    const formatDate = (dateTime: string) => {
        const date = new Date(dateTime);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    return (
        <View style={styles.container}>
            <Header />
            <Text style={styles.title}>Transações</Text>
            <Text style={styles.description}>Histórico das transações que foram realizadas</Text>

            <FlatList
                data={transacoes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity>
                        <View style={styles.box}>
                            <View style={styles.infos}>
                                <Text style={styles.valor}><Text style={styles.valorBold}>Valor:</Text> R${item.value}</Text>
                                <Text style={styles.dateTime}><Text style={styles.dateTimeBold}>Data e horário: </Text>{formatDate(item.dateTime)}</Text>
                            </View>
                            <View>
                                <LinearGradient
                                    style={styles.cardData}
                                    colors={["#3B2A00", "#554102", '#836A1F']}>
                                    <View style={styles.up}>
                                        <Text style={styles.numberCard}>**** **** **** {item.lastFourDigits}</Text>
                                        <Ionicons name="card" size={34} color="#fff" />
                                    </View>
                                    <View style={styles.down}>
                                        <Text style={styles.nameCard}>{item.cardHolderName}</Text>
                                    </View>
                                </LinearGradient>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
                }
                scrollEnabled={true}
            />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 5,
    },
    description: {
        fontSize: 16,
        color: '#fff',
        marginVertical: 20,
        marginLeft: 5,
    },
    box: {
        flexDirection: "column",
        alignSelf: "center",
        width: "96%",
        paddingVertical: 16,
        paddingHorizontal: 2,
        backgroundColor: '#232327',
        margin: 5,
        borderRadius: 20,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    infos: {
        flexDirection: "column",
        width: "92%",
        marginVertical: 10,
    },
    cardData: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
        borderRadius: 20,
        width: "90%",
        gap: 20,
        paddingHorizontal: 22,
        paddingVertical: 36,
    },
    up: {
        flexDirection: "row",
        alignItems: "center",
        width: "90%",
        justifyContent: "space-between",
    },
    down: {
        flexDirection: "row",
        alignSelf: "flex-start",
        width: "90%",
        justifyContent: "space-between",
    },
    valor: {
        fontSize: 18,
        color: "#fff",
    },
    valorBold: {
        fontSize: 20,
        fontWeight: "bold",
    },
    dateTime: {
        color: "#fff",
        fontSize: 18,
    },
    dateTimeBold: {
        fontSize: 20,
        fontWeight: "bold",
    },
    numberCard: {
        fontSize: 18,
        color: "#fff",
    },
    nameCard: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#fff",
    },
});
