import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

//Componente que apresenta o Banner do produto na Home
export default function Banner() {
    return (
        <View>
            <TouchableOpacity style={styles.bannerContent}>
                <Image
                    style={styles.banner}
                    source={require("../../img/banner.png")}
                />
            </TouchableOpacity>
            <Image
                style={styles.dots}
                source={require("../../img/Group 84.png")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    bannerContent: {
        width: '94%',
        height: 150,
        margin: 10,
        alignContent: 'center',
        alignSelf: 'center',
    },
    banner: {
        borderRadius: 24,
        width: '100%',
    },
    dots: {
        marginTop: 8,
        width: '21%',
        alignSelf: 'center',
    },
});