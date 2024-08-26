import AsyncStorage from '@react-native-async-storage/async-storage';
import { Middleware, AnyAction } from '@reduxjs/toolkit';

const CART_STORAGE_KEY = 'cart_items';

const cartPersistMiddleware: Middleware = store => next => async (action: AnyAction) => {
    const result = next(action);

    if (action.type.startsWith('cart/')) {
        // Salva o estado depois da ação no carrinho
        try {
            const state = store.getState();
            await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart.items));
        } catch (error) {
            console.error('Falha para salvar AsyncStorage', error);
        }
    }

    return result;
};

export default cartPersistMiddleware;
