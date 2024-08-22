import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../slices/cartSlice';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';

interface Produto {
    id: string;
    title: string;
    price: number;
    zipcode: string;
    seller: string;
    thumbnailHd: string;
    date: string;
}

interface ProdutosProps {
    searchTerm: string;
}

export default function Produtos({ searchTerm }: ProdutosProps) {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [carregando, setCarregando] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('https://raw.githubusercontent.com/stone-pagamentos/desafio-mobile/master/store/products.json')
            .then(response => {
                const produtosComId = response.data.map((produto: any, index: number) => ({
                    ...produto,
                    id: `${index}-${Date.now()}` // Gerando um ID único
                }));
                setProdutos(produtosComId);
                setCarregando(false);
                console.log(response.data);
            })
            .catch(error => {
                setError('Erro ao carregar produtos');
                setCarregando(false);
                console.log("ERRO AO CARREGAR!");
            });
    }, []);

    if (carregando) {
        return (
            <View>
                <Text>Carregando</Text>
                <ActivityIndicator color="#091833" size="large" />
            </View>
        );
    }

    const filteredProducts = produtos.filter((produto) =>
        produto.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory ? produto.title.toLowerCase().includes(selectedCategory.toLowerCase()) : true)
    );

    return (
        <View style={styles.BoxContent}>

            <Text style={styles.TextTitle}>Categorias</Text>
            <Text style={styles.subTitle}>Selecione o produto relacionado ao personagem</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={styles.contentCategories}>
                    <TouchableOpacity style={styles.categories} onPress={() => setSelectedCategory('')}>
                        <Ionicons name="pricetags-outline" size={53} color="#222" />
                        <Text style={styles.nameCategories}>Todos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categories} onPress={() => setSelectedCategory('trooper')}>
                        <Image style={styles.imageCategories} source={require("../../img/1x/trooper.png")} />
                        <Text style={styles.nameCategories}>Trooper</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categories} onPress={() => setSelectedCategory('vader')}>
                        <Image style={styles.imageCategories} source={require("../../img/1x/vader.png")} />
                        <Text style={styles.nameCategories}>Vader</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categories} onPress={() => setSelectedCategory('bb')}>
                        <Image style={styles.imageCategories} source={require("../../img/1x/BB8.png")} />
                        <Text style={styles.nameCategories}>BB-8</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categories} onPress={() => setSelectedCategory('c3')}>
                        <Image style={styles.imageCategories} source={require("../../img/1x/C3PO.png")} />
                        <Text style={styles.nameCategories}>C3-PO</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <Text style={styles.TextTitle}>Produtos</Text>
            <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.touch}>
                        <View style={styles.produtosLista}>
                            <View style={styles.contentLeft}>
                                <Image style={styles.image} source={{ uri: item.thumbnailHd }} />
                            </View>
                            <View style={styles.contentRight}>
                                <Text style={styles.title}>{item.title}</Text>
                                <View style={styles.sellerpart}>
                                    <Ionicons name="people-circle-outline" size={22} color="#f1f1f1" />
                                    <Text style={styles.seller}> {item.seller}</Text>
                                </View>
                                <Text style={styles.preco}>R$ {item.price.toFixed(2)}</Text>
                                <TouchableOpacity style={styles.btnComprar} onPress={() => dispatch(addToCart(item))}>
                                    <Ionicons name="cart" size={26} color="#333" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                scrollEnabled={false}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    BoxContent: {
        margin: 10,
        marginBottom: 100,
    },
    TextTitle: {
        color: '#f1f1f1',
        fontSize: 20,
        textAlign: 'left',
        margin: 10,
        fontWeight: '500',
    },
    subTitle: {
        color: '#f1f1f1',
        fontSize: 10,
        textAlign: 'left',
        marginLeft: 12,
        fontWeight: '400',
    },
    contentCategories: {
        flexDirection: 'row',
        width: '90%',
        gap: 10,
        marginLeft: 14,
        padding: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categories: {
        borderRadius: 20,
        backgroundColor: '#FFCB11',
        padding: 14,
        alignItems: 'center',
        margin: 5,
        gap: 6,
        maxWidth: 100,
    },
    imageCategories: {
        width: 50,
        height: 53,
    },
    nameCategories: {
        color: '#222',
        fontSize: 14,
        fontWeight: '500',
    },
    touch: {
        width: '96%',
        alignSelf: 'center',
        marginBottom: 10,
    },
    produtosLista: {
        height: 140,
        flexDirection: 'row',
        backgroundColor: '#232327',
        borderRadius: 20,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'flex-start',
        marginTop: 6,

        shadowColor: '#333',
        shadowRadius: 6,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
    },
    contentLeft: {
        width: '36%',
    },
    contentRight: {
        width: '64%',
        gap: 6,
        marginLeft: 16,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#f1f1f1',
    },
    sellerpart: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    seller: {
        fontSize: 10,
        color: '#f1f1f1',
    },
    image: {
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    preco: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#f1f1f1',
    },
    btnComprar: {
        backgroundColor: '#fff',
        width: 60,
        flexDirection: 'row',
        padding: 6,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        borderRadius: 20,
    },
    buy: {
        fontSize: 18,
        fontWeight: '500',
    },
    icon: {
        width: 50,
        height: 50,
    }
});