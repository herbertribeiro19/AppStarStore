import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const existingItemIndex = state.items.findIndex(item => item.product.id === action.payload.id);
            if (existingItemIndex >= 0) {
                // Imutavelmente atualize a quantidade
                state.items[existingItemIndex] = {
                    ...state.items[existingItemIndex],
                    quantity: state.items[existingItemIndex].quantity + 1,
                };
                console.log(`Updated quantity for product ID: ${action.payload.id}`);
            } else {
                // Adicione o novo item imutavelmente
                state.items.push({ product: action.payload, quantity: 1 });
                console.log(`Added new product to cart: ${action.payload.id}`);
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.product.id !== action.payload);
        },
        increaseQuantity: (state, action: PayloadAction<string>) => {
            const itemIndex = state.items.findIndex(item => item.product.id === action.payload);
            if (itemIndex >= 0) {
                state.items[itemIndex] = {
                    ...state.items[itemIndex],
                    quantity: state.items[itemIndex].quantity + 1,
                };
                console.log(`Increased quantity for product ID: ${action.payload}`);
            }
        },
        decreaseQuantity: (state, action: PayloadAction<string>) => {
            const itemIndex = state.items.findIndex(item => item.product.id === action.payload);
            if (itemIndex >= 0) {
                const currentItem = state.items[itemIndex];
                if (currentItem.quantity > 1) {
                    state.items[itemIndex] = {
                        ...currentItem,
                        quantity: currentItem.quantity - 1,
                    };
                    console.log(`Decreased quantity for product ID: ${action.payload}`);
                } else {
                    state.items = state.items.filter(item => item.product.id !== action.payload);
                    console.log(`Removed product ID: ${action.payload} from cart`);
                }
            }
        },
    },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
