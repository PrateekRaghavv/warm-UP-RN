import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Link, router } from 'expo-router';
export default function Home() {
    return (
        <View style={homeStyle.homebackground}>
            <Text style={homeStyle.title}>Home Screen</Text>

            <View style={homeStyle.buttonContainer}>
                <Link href="/page/Travelling">
                    <Pressable style={({ pressed }) => [homeStyle.button, pressed && homeStyle.buttonPressed]} >
                        <Text style={homeStyle.buttonText}>Travelling?</Text>

                    </Pressable>
                </Link>
                <Pressable style={({ pressed }) => [homeStyle.button, pressed && homeStyle.buttonPressed]}>
                    <Text style={homeStyle.buttonText}>Order?</Text>
                </Pressable>

                <Pressable style={({ pressed }) => [homeStyle.button, pressed && homeStyle.buttonPressed]}>
                    <Text style={homeStyle.buttonText}>Browse</Text>
                </Pressable>
            </View>
        </View >
    );
}

const homeStyle = StyleSheet.create({
    homebackground: {
        flex: 1,
        backgroundColor: '#F5F1E8',
    },

    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#222',
        textAlign: 'center',
        marginTop: 80,
    },

    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
        flexDirection: 'row'
    },

    button: {
        width: 220,
        minHeight: 56,
        backgroundColor: '#5DADE2',
        borderRadius: 14,

        justifyContent: 'center',
        alignItems: 'center',

        paddingHorizontal: 24,

        // iOS shadow
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 6,

        // Android
        elevation: 4,
    },

    buttonPressed: {
        opacity: 0.7,
        transform: [{ scale: 0.97 }],
    },

    buttonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '600',
    },
});