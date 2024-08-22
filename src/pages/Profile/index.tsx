import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/Header';

export default function Profile() {
    return (
        <View style={styles.container}>
            <Header />
            <Text style={styles.TextTitle}>Perfil</Text>
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
});

