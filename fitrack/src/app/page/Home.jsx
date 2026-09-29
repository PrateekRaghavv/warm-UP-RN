import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Link, router } from 'expo-router';
export default function Home() {
    const { width } = useWindowDimensions();

    return (
        <View style={homeStyle.homebackground}>
            <Text style={homeStyle.title}>Home Screen</Text>

            <View style={homeStyle.buttonContainer}>
                    <Pressable  onPressOut={()=>router.push("/page/Travelling")}  style={({ pressed }) => [homeStyle.button, pressed && homeStyle.buttonPressed]} >
                        <Text style={homeStyle.buttonText}>Travelling?</Text>
                    </Pressable>

                <Pressable onPressOut={()=>router.push("/page/Order")} style={({ pressed }) => [homeStyle.button, pressed && homeStyle.buttonPressed]}>
                    <Text style={homeStyle.buttonText}>Order?</Text>
                </Pressable>

                <Pressable onPressOut={()=>router.push("/page/Browse")} style={({ pressed }) => [homeStyle.button, pressed && homeStyle.buttonPressed]}>
                    <Text style={homeStyle.buttonText}>Explore</Text>
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
        flexDirection: 'row',
        flexWrap: 'wrap'
    },

    button: {
        width: '30%',
        minWidth: 150,
        maxWidth: 500,
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