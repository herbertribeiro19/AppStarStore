import React from 'react';
import { View, Text, FlatList, Alert, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../../slices/cartSlice';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Cart() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const cartItems = useSelector((state: RootState) => state.cart.items || []);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    };

    const handleCheckout = () => {
        const total = calculateTotal();
        if (total > 0) {
            navigation.navigate('Payment', { totalAmount: total });
        }
        else {
            Alert.alert(
                "Seu carrinho está vazio",
                "Adicione items ao seu carrinho para avançar para o pagamento.",
                [
                    { text: "Comprar produtos", onPress: () => navigation.navigate("Home") },
                ]
            );
        }
    };

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.content}>
                <Text style={styles.TextTitle}>Carrinho de compras</Text>
                {cartItems.length === 0 ? (
                    <View style={styles.contentEmpty}>
                        <Text style={styles.emptyText}>Não há itens no seu carrinho</Text>
                        <Text style={styles.description}>
                            Deseja continuar comprando?
                            <TouchableOpacity onPress={() => navigation.navigate('Home')}><Text style={styles.btncompras}>Voltar para página de compras</Text></TouchableOpacity>
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={cartItems}
                        keyExtractor={(item) => item.product.id}
                        renderItem={({ item }) => (
                            <View style={styles.cartItem}>
                                <Image style={styles.image} source={{ uri: item.product.thumbnailHd }} />
                                <View style={styles.itemInfo}>
                                    <Text style={styles.title}>{item.product.title}</Text>
                                    <Text style={styles.price}>R$ {item.product.price}</Text>
                                    <View style={styles.quantityControls}>
                                        <TouchableOpacity onPress={() => dispatch(decreaseQuantity(item.product.id))}>
                                            <Text style={styles.controlText}>-</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.quantity}>{item.quantity}</Text>
                                        <TouchableOpacity onPress={() => dispatch(increaseQuantity(item.product.id))}>
                                            <Text style={styles.controlText}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => dispatch(removeFromCart(item.product.id))}>
                                    <Ionicons name={"trash"} size={32} color={'#FF0000'} />
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                )}
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.btnPayment} onPress={handleCheckout}>
                        <View>
                            <Text style={styles.pagamento}>Seguir para pagamento</Text>
                            <Text style={styles.valorTotal}>R$ {calculateTotal()}</Text>
                        </View>
                        <Ionicons name={"chevron-forward-circle-sharp"} size={40} color={'#222'} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: "space-between",
    },
    TextTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 16,
        color: "#fff",
    },
    contentEmpty: {
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
    },
    emptyText: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
        fontWeight: "700",
        color: "#fff",
    },
    description: {
        flexDirection: "column",
        fontSize: 16,
        fontWeight: "500",
        color: '#fff',
        marginVertical: 20,
        textAlign: "center",
    },
    btncompras: {
        fontSize: 16,
        marginTop: 10,
        color: '#FFCB11',
    },
    cartItem: {
        alignSelf: "center",
        width: "95%",
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#232327',
        margin: 5,
        borderRadius: 20,
    },
    image: {
        width: 80,
        height: 80,
        marginRight: 16,
        borderRadius: 10,
        alignSelf: "center",
    },
    itemInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#fff",
        marginBottom: 6,
    },
    price: {
        fontSize: 18,
        color: "#fff",
        fontWeight: '400',
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        color: "#fff",
    },
    controlText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 8,
        color: "#fff",
    },
    quantity: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 8,
        color: "#fff",
    },
    removeText: {
        color: 'red',
        fontSize: 16,
        marginTop: 8,
    },
    footer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFCB11',
        marginBottom: 84,
        margin: 12,
        borderRadius: 10,
        alignItems: 'flex-start',
        justifyContent: "space-between",
    },
    btnPayment: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
    },
    pagamento: {
        fontSize: 16,
        fontWeight: '500',
    },
    valorTotal: {
        fontSize: 26,
        fontWeight: '800',
        marginVertical: 8,
    },
    btncompras2: {
        fontSize: 14,
        left: -5,
        fontWeight: "400",
        color: '#fff',
        padding: 6,
        backgroundColor: "#444",
        borderRadius: 0,
    },
});
