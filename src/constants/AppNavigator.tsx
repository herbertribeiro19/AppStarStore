import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from '../../store';
import Home from '../pages/Home';
import Cart from '../pages/Cart';
import Profile from '../pages/Profile';
import Ionicons from '@expo/vector-icons/Ionicons';
import Welcome from '../pages/Welcome';
import Payment from '../pages/Payment';
import Transactions from '../pages/Transactions';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

//Aplicando cor default para background
const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#151515',
    },
};

function StackNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Tabs" component={MainTabs} />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="Transactions" component={Transactions} />
        </Stack.Navigator>
    );
}

function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home-outline' : 'home-outline';
                        size = 26;
                    } else if (route.name === 'Cart') {
                        iconName = focused ? 'cart-outline' : 'cart-outline';
                        size = 30;
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person-outline' : 'person-outline';
                        size = 26;
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#FFCB11',
                tabBarInactiveTintColor: 'gray',
                tabBarLabel: () => null,
                tabBarStyle: {
                    backgroundColor: '#232327',
                    borderTopColor: 'transparent',
                    position: 'absolute',
                    borderTopLeftRadius: 14,
                    borderTopRightRadius: 14,
                    height: '9%',
                    padding: 8,
                    // backgroundColor: "#101010", borderRadius: 40, paddingBottom: 0, overflow: "hidden", marginHorizontal: 14, marginBottom: 20, height: '9%', justifyContent: "space-between", alignItems: "center", position: "absolute", borderTopColor: '#151515',
                },
                tabBarHideOnKeyboard: true,
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Cart" component={Cart} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    return (
        <Provider store={store}>
            <NavigationContainer theme={MyTheme}>
                <StackNavigator />
            </NavigationContainer>
        </Provider>
    );
}
