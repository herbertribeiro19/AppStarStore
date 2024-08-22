import AsyncStorage from '@react-native-async-storage/async-storage';
import { Middleware, AnyAction } from '@reduxjs/toolkit';

const CART_STORAGE_KEY = 'cart_items';

const cartPersistMiddleware: Middleware = store => next => async (action: AnyAction) => {
    const result = next(action);

    if (action.type.startsWith('cart/')) {
        // Save state after a cart action
        try {
            const state = store.getState();
            await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart.items));
        } catch (error) {
            console.error('Failed to save cart to AsyncStorage', error);
        }
    }

    return result;
};

export default cartPersistMiddleware;
