import { Text, View, StyleSheet, TextInput } from 'react-native'

export default function Travelling() {
    return (
        <View>
            <View>
                <Text>Where are you Travelling?</Text>
            </View>

            <View style={styles.inputContainer}>
                <View style={styles.Input}>
                    <View>
                        <Text>From</Text>
                    </View>
                    <TextInput
                       style={{ width: '60%' }}
                        
                        placeholder='Enter Departure City' />
                </View>
                <input placeholder='Enter Destination' />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Input: {
        width: '80%',
        height: 200
    },
    inputContainer:{
        flex:1,
        justifyContent: 'center',
        alignItem:'center',

    }
})