import React, { useState } from "react";
import { ImageBackground, StyleSheet, Text, Image, Alert, Platform, View, TouchableOpacity, Keyboard, TouchableWithoutFeedback, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function Register() {
    const navigation = useNavigation();
    const imageBG = require("../../img/BG.jpg");
    const logo = require("../../img/logo.png");
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const TextName = (text) => {
        setName(text);
        console.log(name);
    };

    const TextEmail = (text) => {
        setEmail(text);
        console.log(email);
    };

    const TextPassword = (text) => {
        setPassword(text);
        console.log(password);
    };

    //Verificação da plataforma para aplicar a devida URL de locahost
    const BASE_URL = Platform.OS === 'ios' ? 'https://5072-179-189-87-179.ngrok-free.app' : 'http://10.0.2.2:3000';

    const CreateRegister = async () => {
        if (name != '' && email != '' && password != '') {
            try {
                const response = await axios.post(`${BASE_URL}/register`, {
                    name: name,
                    email: email,
                    password: password,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (response.status === 201) {
                    console.log(response.data);
                    Alert.alert("Conta criada com sucesso", "Faça o login para acessar a StarStore",);
                    navigation.navigate("Login");
                }
                else {
                }
            } catch (error) {
                Alert.alert("Esse usuário já existe", "Tente novamente com informações diferentes",);
                console.log("Erro ao processar o Registro: ", error);
            }
        } else {
            Alert.alert(
                "Os campos estão vazios",
                "Preencha os campos para prosseguir com o registro",
            );
        }

    };

    //Avanço para a página inicial, após o press no botão
    function nextStep() {
        navigation.navigate("Tabs");
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
                                placeholder="Nome"
                                keyboardType="ascii-capable"
                                placeholderTextColor={"#f1f1f1"}
                                value={name}
                                onChangeText={TextName}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                keyboardType="email-address"
                                placeholderTextColor={"#f1f1f1"}
                                value={email}
                                onChangeText={TextEmail}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Senha"
                                secureTextEntry={true}
                                placeholderTextColor={"#f1f1f1"}
                                value={password}
                                onChangeText={TextPassword}
                            />
                            <TouchableOpacity style={styles.btn2} onPress={CreateRegister}>
                                <Text style={styles.textBtn}>Criar conta</Text>
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
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
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
    }
});
