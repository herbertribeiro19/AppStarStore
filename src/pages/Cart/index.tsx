import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../../slices/cartSlice';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';

export default function Cart() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const cartItems = useSelector((state: RootState) => state.cart.items || []);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0).toFixed(2);
    };

    return (
        <View style={styles.container}>
            <Header />
            <Text style={styles.TextTitle}>Carrinho de compras</Text>
            {cartItems.length === 0 ? (
                <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
            ) : (
                <FlatList
                    data={cartItems}
                    keyExtractor={(item) => item.product.id}
                    renderItem={({ item }) => (
                        <View style={styles.cartItem}>
                            <Image style={styles.image} source={{ uri: item.product.thumbnailHd }} />
                            <View style={styles.itemInfo}>
                                <Text style={styles.title}>{item.product.title}</Text>
                                <Text style={styles.price}>R$ {item.product.price.toFixed(2)}</Text>
                                <View style={styles.quantityControls}>
                                    <TouchableOpacity onPress={() => dispatch(decreaseQuantity(item.product.id))}>
                                        <Text style={styles.controlText}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.quantity}>{item.quantity}</Text>
                                    <TouchableOpacity onPress={() => dispatch(increaseQuantity(item.product.id))}>
                                        <Text style={styles.controlText}>+</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity onPress={() => dispatch(removeFromCart(item.product.id))}>
                                    <Text style={styles.removeText}>Remover</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            )}
            <View style={styles.footer}>
                <Text style={styles.totalText}>Valor total dos produtos: R$ {calculateTotal()}</Text>
                <Button title="Seguir para pagamento" onPress={() => navigation.navigate('Payment')} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    TextTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 16,
    },
    emptyText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
    cartItem: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff',
    },
    image: {
        width: 80,
        height: 80,
        marginRight: 16,
    },
    itemInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 16,
        color: '#666',
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    controlText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 8,
    },
    quantity: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 8,
    },
    removeText: {
        color: 'red',
        fontSize: 16,
        marginTop: 8,
    },
    footer: {
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        marginBottom: 80,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
});
