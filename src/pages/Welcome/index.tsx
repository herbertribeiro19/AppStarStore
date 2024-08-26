import React from "react";
import { ImageBackground, StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
    const navigation = useNavigation();
    const imageBG = require("../../img/BG.jpg");
    const logo = require("../../img/logo.png");

    //Avanço para a página inicial, após o press no botão
    function nextStep() {
        navigation.navigate("Tabs");
    }

    return (
        <View style={styles.container} >
            <ImageBackground source={imageBG} style={styles.image}>
                <View style={styles.content}>
                    <Image source={logo} style={styles.logo} />
                    <TouchableOpacity style={styles.btn} onPress={nextStep}>
                        <Ionicons name="arrow-forward-circle-sharp" size={40} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.text}>Developed by<Text style={styles.textStrong}> Herbert Sampaio</Text></Text>
                </View>
            </ImageBackground>
        </View>
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
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '50%',
        margin: 10,
    },
    logo: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: '76%',
        height: '26%',
        marginBottom: '2%',
    },
    btn: {
        padding: 8,
        borderWidth: 2,
        borderColor: '#151515',
        backgroundColor: '#FFCB11',
        width: '30%',
        borderRadius: 30,
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 10,
        fontWeight: '400',
        textAlign: 'center',
        marginTop: '10%',
    },
    textStrong: {
        fontWeight: 'bold',
        fontSize: 10,
    }
});
