import React, { useState, useEffect } from "react";
import { ImageBackground, StyleSheet, Text, Image, Alert, Platform, View, TouchableOpacity, Keyboard, TouchableWithoutFeedback, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export default function Login() {
    const navigation = useNavigation();
    const imageBG = require("../../img/BG.jpg");
    const logo = require("../../img/logo.png");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        // Recupera os dados armazenados nos campos de login e senha ao carregar a tela
        const loadCredentials = async () => {
            const storedEmail = await SecureStore.getItemAsync('userEmail');
            const storedPassword = await SecureStore.getItemAsync('userPassword');
            if (storedEmail && storedPassword) {
                setEmail(storedEmail);
                setPassword(storedPassword);
            }
        };
        loadCredentials();
    }, []);

    const handleEmailChange = (text) => {
        setEmail(text);
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
    };

    //Verificação da plataforma para aplicar a devida URL de localhost
    const BASE_URL = Platform.OS === 'ios' ? 'https://5072-179-189-87-179.ngrok-free.app' : 'http://10.0.2.2:3000';

    const UserLogin = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/login`, {
                email: email,
                password: password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.status === 200) {
                const { token } = response.data; // Pegue apenas o token do response
                await SecureStore.setItemAsync('userToken', token); // Armazena o token de forma segura
                await SecureStore.setItemAsync('userEmail', email); // Armazena o email de forma segura
                await SecureStore.setItemAsync('userPassword', password); // Armazena a senha de forma segura
                console.log("Token armazenado com sucesso!");

                // Navega para a página inicial após o login bem-sucedido
                navigation.navigate("Tabs");
            } else {
                console.log("Erro ao fazer o login: ");
                Alert.alert("ERRO!", "Ocorreu um erro ao tentar fazer o login.");
            }
        } catch (error) {
            console.log("Erro no login. ", error);
            Alert.alert("Falha no Login", "Email ou senha incorretos.");
        }
    };

    function createAccount() {
        navigation.navigate("Register");
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <ImageBackground source={imageBG} style={styles.image}>
                    <View style={styles.content}>
                        <Image source={logo} style={styles.logo} />

                        <View style={styles.boxLogin}>
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                keyboardType="email-address"
                                placeholderTextColor={"#f1f1f1"}
                                value={email}
                                onChangeText={handleEmailChange}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Senha"
                                secureTextEntry={true}
                                placeholderTextColor={"#f1f1f1"}
                                value={password}
                                onChangeText={handlePasswordChange}
                            />
                            <TouchableOpacity style={styles.btn} onPress={UserLogin}>
                                <Text style={styles.textBtn}>Entrar</Text>
                                <Ionicons name="chevron-forward-circle-sharp" size={32} color="black" />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.btn2} onPress={createAccount}>
                                <Text style={styles.textBtn2}>Registrar</Text>
                                <Ionicons name="enter" size={32} color="#fff" />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.text}>Developed by<Text style={styles.textStrong}> Herbert Sampaio</Text></Text>
                    </View>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    content: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: '100%',
        margin: 10,
    },
    logo: {
        justifyContent: 'center',
        marginTop: 100,
        alignSelf: 'center',
        width: 260,
        height: 100,
        marginBottom: '2%',
    },
    boxLogin: {
        flexDirection: 'column',
        marginTop: 0,
        width: "96%",
        height: "auto",
        alignSelf: "center",
        padding: 10,
        borderRadius: 20,
        position: "relative",
        justifyContent: "center",
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
    btn: {
        padding: 8,
        borderWidth: 2,
        borderColor: '#151515',
        backgroundColor: '#FFCB11',
        width: '88%',
        borderRadius: 30,
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: "row",
        justifyContent: "center",
        gap: 56,
    },
    text: {
        color: 'white',
        fontSize: 10,
        fontWeight: '400',
        textAlign: 'center',
        marginTop: '4%',
    },
    textStrong: {
        fontWeight: 'bold',
        fontSize: 10,
    },
    btn2: {
        margin: 10,
        padding: 8,
        borderWidth: 2,
        borderColor: '#151515',
        backgroundColor: '#FF0000',
        width: '88%',
        borderRadius: 30,
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: "row",
        justifyContent: "center",
        gap: 31,
    },
    textBtn: {
        color: "#111",
        fontSize: 16,
        fontWeight: "600",
    },
    textBtn2: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
