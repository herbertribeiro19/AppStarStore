import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Alert } from 'react-native';

interface Product {
    id: string;
    title: string;
    price: number;
    zipcode: string;
    seller: string;
    thumbnailHd: string;
    date: string;
}

interface CartItem {
    product: Product;
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

// Esta função está servindo para encontrar o índice do item
const findItemIndex = (state: CartState, id: string) => {
    return state.items.findIndex(item => item.product.id === id);
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        //Adicionando produtos ao carrinho
        addToCart: (state, action: PayloadAction<Product>) => {
            const existingItemIndex = findItemIndex(state, action.payload.id);
            if (existingItemIndex >= 0) {
                state.items[existingItemIndex] = {
                    ...state.items[existingItemIndex],
                    quantity: state.items[existingItemIndex].quantity + 1,
                };
            } else {
                state.items.push({ product: action.payload, quantity: 1 });
            }
            Alert.alert(
                "Item adicionado",
                "O item foi adicionado com sucesso ao carrinho",
            );
        },

        //Removendo produtos ao carrinho
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.product.id !== action.payload);
        },

        //Incrementando produtos ao carrinho
        increaseQuantity: (state, action: PayloadAction<string>) => {
            const itemIndex = findItemIndex(state, action.payload);
            if (itemIndex >= 0) {
                state.items[itemIndex].quantity += 1;
            }
        },

        //Decrementando produtos ao carrinho
        decreaseQuantity: (state, action: PayloadAction<string>) => {
            const itemIndex = findItemIndex(state, action.payload);
            if (itemIndex >= 0) {
                const currentItem = state.items[itemIndex];
                if (currentItem.quantity > 1) {
                    currentItem.quantity -= 1;
                } else {
                    state.items = state.items.filter(item => item.product.id !== action.payload);
                }
            }
        },
    },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
