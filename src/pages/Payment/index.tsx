import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Platform } from 'react-native';
import Header from '../../components/Header';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function Payment({ route }) {
    const navigation = useNavigation();
    const { totalAmount } = route.params;
    const [value, setValue] = useState('');
    const [valueNumber, setValueNumber] = useState('');
    const [valueCVV, setValueCVV] = useState('');
    const [nameValue, setNameValue] = useState('');
    const BASE_URL = Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';

    const TextMaskName = (text) => {
        setNameValue(text);
    };

    const TextMaskOnlyNumber = (text) => {
        let formattedText = text.replace(/\D/g, '');
        setValueNumber(formattedText);
    };

    const TextMaskOnlyNumberCVC = (text) => {
        let formattedText = text.replace(/\D/g, '');
        setValueCVV(formattedText);
    };

    const TextMaskData = (text) => {
        let formattedText = text.replace(/\D/g, '');

        if (formattedText.length >= 4) {
            formattedText = `${formattedText.slice(0, 2)}/${formattedText.slice(2, 4)}`;

            const [mes, ano] = formattedText.split('/').map(Number);
            if (mes < 1 || mes > 12) {
                console.log("Mês inválido: O mês deve estar entre 01 e 12.");
                Alert.alert(
                    "Data incorreta",
                    "O mês inserido é inválido. Insira um mês entre 01 e 12.",
                );
                return;
            }
            if (ano < 24 || (ano === 24 && mes < 8)) {
                console.log(`Data é menor que 08/24: ${formattedText}`);
                Alert.alert(
                    "Data incorreta",
                    "A data de vencimento do cartão deve ser posterior a data atual.",
                );
                return;
            }
            console.log("Data válida.");
        }
        setValue(formattedText);
    };

    const FinishPayment = async () => {
        if (
            valueNumber.length > 15 &&
            totalAmount.length !== '' &&
            valueCVV.length > 2 &&
            value.length > 3 &&
            nameValue !== ''
        ) {
            try {
                const response = await axios.post(`${BASE_URL}/transaction`, {
                    card_number: valueNumber,
                    value: totalAmount,
                    cvv: valueCVV,
                    card_holder_name: nameValue,
                    exp_date: value,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (response.status === 201) {
                    console.log(response.data);
                    Alert.alert(
                        "Cartão adicionado com sucesso",
                        "Parabéns, verificamos e validamos os dados do seu cartão de crédito.",
                    );
                    navigation.navigate('Transactions');
                }
                else {
                    Alert.alert(
                        "Falha ao adicionar o cartão",
                        "Ocorreu uma falha ao adicionar o seu cartão de crédito, preencha os campos novamente.",
                    );
                }
            } catch (error) {
                console.error("Erro ao processar o pagamento:", error);
                Alert.alert(
                    "Dados inválidos",
                    "Os dados estão inválidos",
                );
            }
        } else {
            Alert.alert(
                "Dados incorretos",
                "Preencha as informações do cartão de crédito da forma correta para adicionar o cartão",
            );
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Header />
                <Text style={styles.title}>Pagamento</Text>
                <Text style={styles.description}>Adicione o cartão de crédito para pagamento</Text>

                <View style={styles.boxCard}>
                    <View style={styles.row}>
                        <TextInput
                            placeholder="Número do cartão"
                            keyboardType='numeric'
                            placeholderTextColor={"#f1f1f1"}
                            style={styles.input}
                            maxLength={16}
                            onChangeText={TextMaskOnlyNumber}
                            value={valueNumber}
                        />
                        <Ionicons style={styles.icon} name={"card"} size={30} color={'#fff'} />
                    </View>
                    <View style={styles.row}>
                        <TextInput
                            placeholder="CVV"
                            keyboardType='numeric'
                            placeholderTextColor={"#f1f1f1"}
                            style={styles.inputRow}
                            maxLength={3}
                            onChangeText={TextMaskOnlyNumberCVC}
                            value={valueCVV}
                        />
                        <TextInput
                            value={value}
                            onChangeText={TextMaskData}
                            placeholder="MM/YY"
                            keyboardType="numeric"
                            placeholderTextColor={"#f1f1f1"}
                            maxLength={5}
                            style={styles.inputRow}
                        />
                    </View>
                    <TextInput
                        placeholder="Nome do cartão"
                        keyboardType='ascii-capable'
                        placeholderTextColor={"#f1f1f1"}
                        style={styles.input}
                        onChangeText={TextMaskName}
                        value={nameValue}
                    />
                    <TouchableOpacity style={styles.button} onPress={FinishPayment}>
                        <Text style={styles.textBuy}>Pagar <Text style={styles.textBuyBold}>R${totalAmount}</Text></Text>
                        <Ionicons name={"bag-check-sharp"} size={22} color={'#111'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.contentEnd}>
                    <Text style={styles.description2}>
                        Deseja continuar comprando?
                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                            <Text style={styles.btncompras}> Voltar para página de compras</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
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
    boxCard: {
        marginTop: 20,
        backgroundColor: '#444',
        alignSelf: 'center',
        borderRadius: 20,
        padding: 20,
        width: '98%',
        // Removido 'height' para permitir flexibilidade
        alignContent: 'center',
        justifyContent: 'center',
        position: "relative",
    },
    input: {
        padding: 14,
        color: '#fff',
        fontSize: 14,
        textTransform: 'uppercase',
        marginVertical: 5,
        borderColor: "#f1f1f1",
        borderWidth: 0.2,
        borderRadius: 10,
        width: '100%',
    },
    inputRow: {
        padding: 14,
        color: '#fff',
        fontSize: 14,
        textTransform: 'uppercase',
        marginVertical: 5,
        borderColor: "#f1f1f1",
        borderWidth: 0.2,
        borderRadius: 10,
        width: '48%',
    },
    icon: {
        position: 'absolute',
        right: 14,
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        marginTop: 20,
        backgroundColor: '#FFCB11',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderRadius: 14,
    },
    textBuy: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111',
    },
    textBuyBold: {
        fontSize: 16,
        fontWeight: '800',
        color: '#111',
    },
    description2: {
        flexDirection: "column",
        fontSize: 16,
        fontWeight: "500",
        color: '#fff',
        marginVertical: 20,
        textAlign: "center",
    },
    btncompras: {
        fontSize: 14,
        marginTop: 10,
        color: '#FFCB11',
    },
    contentEnd: {
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
    },
});
