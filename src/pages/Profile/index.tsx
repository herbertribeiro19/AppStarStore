import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Header from '../../components/Header';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

export default function Profile() {
    const navigation = useNavigation();

    function logout() {
        SecureStore.deleteItemAsync('userToken');
        console.log("Usuário deslogado e token removido.");
        navigation.navigate("Login");
    };

    //Funçao para sair para a página inicial do APP
    function btnLeave() {
        Alert.alert(
            "Você está saindo para a página inicial",
            "Tem certeza que deseja sair?",
            [
                { text: "Não", onPress: () => navigation.navigate('Profile') },
                { text: "Sim", onPress: () => logout() },
            ]
        );
    }

    return (
        <View style={styles.container}>
            <Header />
            <Text style={styles.TextTitle}>Perfil</Text>

            <View style={styles.options}>
                <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Transactions')}>
                    <Ionicons name="receipt-sharp" size={34} color="#fff" />
                    <Text style={styles.text}>Minhas transações</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={btnLeave}>
                    <Ionicons name="exit" size={36} color="#fff" />
                    <Text style={styles.text}>Sair</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    TextTitle: {
        color: '#f1f1f1',
        fontSize: 20,
        textAlign: 'left',
        marginLeft: 20,
        fontWeight: '500',
    },
    options: {
        marginTop: 20,
    },
    option: {
        flexDirection: "row",
        alignSelf: "center",
        width: "92%",
        padding: 16,
        backgroundColor: '#232327',
        margin: 8,
        borderRadius: 20,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    text: {
        color: '#fff',
        fontSize: 18,
        marginLeft: 30,
    },
});

