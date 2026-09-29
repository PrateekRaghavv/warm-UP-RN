import { Text, View, StyleSheet, TextInput, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';


export default function Travelling() {
    const [departureDate, setDepartureDate] = useState();
    const [arrivalDate, setArrivalDate] = useState();
    const [Cities, setCities] = useState(false)

    function cities(value){
        fetch(`https://api.geoapify.com/v1/geocode/search?text=${value}&apiKey=f2c62a1d72a84f29bc671791fac91b4f`).then(response=>response.json()).then(data=>{
            // console.log(data); 
            setCities(data.features);
        })
    }    

    const openDatePicker = (e) => {

        return DateTimePickerAndroid.open({
            value: new Date(),
            mode: 'date',
            onChange: (event, selectedDate) => {
                if (selectedDate) {

                    if (e === 'departure') {
                        setDepartureDate(selectedDate);
                    }
                    if (e === 'arrival') {
                        setArrivalDate(selectedDate);
                    }
                }
            }});
    }
    return (
        <View style={styles.inputContainer}>
            <View>
                <Text style={styles.BigFontSize}>Where are you Travelling?</Text>
            </View>
            <View style={{ gap: 20, width: '100%', alignItems: 'center' }}>
                <View style={styles.Input}>
                    <View>
                        <Text style={styles.NormalFontSize}>From</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Ionicons
                            name="location-sharp"
                            size={24}
                            color="#000"
                        />
                        <TextInput
                            style={{ width: '60%', fontSize: 16 }}
                            onChange={(e) => cities(e.nativeEvent.text)}
                            placeholder='Enter Departure City' />
                        <View style={{ position: 'absolute', top: 50, left: 10, width: '100%', backgroundColor: '#fff', zIndex: 999 }}>
                            {Cities && Cities.map((city, index) => (
                                <Pressable key={index} onPress={() => console.log(city.properties.formatted)}>
                                    <Text>{city.properties.formatted}</Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>
                </View>
                <View style={styles.Input}>
                    <View>
                        <Text style={styles.NormalFontSize}>To</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Ionicons
                            name="location-sharp"
                            size={24}
                            color="#000"
                        />
                        <TextInput
                            style={{ width: '60%', fontSize: 16 }}
                            placeholder='Enter Destination City' />
                    </View>
                </View>
            </View>
            <View style={{ gap: 20, width: '100%', alignItems: 'center' }}>
                <View style={styles.DateCard}>
                    <View>
                        <Text style={styles.SmallFontSize}>Departure Date & Time</Text>
                    </View>
                    <View>
                        <Pressable onPress={() => openDatePicker('departure')} style={{ backgroundColor: '#5DADE2', padding: 10, borderRadius: 10, width: '80%', alignItems: 'center' }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>{departureDate ? departureDate.toLocaleDateString() : 'SELECT DATE'}</Text>
                        </Pressable>
                    </View>
                </View>

                <View style={styles.DateCard}>
                    <View>
                        <Text style={styles.SmallFontSize}>Arrival Date</Text>
                    </View>
                    <View>
                        <Pressable onPress={() => openDatePicker('arrival')} style={{ backgroundColor: '#5DADE2', padding: 10, borderRadius: 10, width: '80%', alignItems: 'center' }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>{arrivalDate ? arrivalDate.toLocaleDateString() : 'SELECT DATE'}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <View style={{ gap: 20, width: '100%', alignItems: 'center' }}>
                <Pressable style={{ backgroundColor: '#5DADE2', padding: 10, borderRadius: 10, width: '80%', alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>ADD TRIP</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Input: {
        width: '80%',
        height: 100,
        backgroundColor: '#F7F7F7',
        borderRadius: 10,
        justifyContent: 'center',
        padding: 10,
        gap: 10
    },
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F1E8',
        gap: 20,
    },
    DateCard: {
        width: '80%',
        height: 100,
        backgroundColor: '#F7F7F7',
        borderRadius: 10,
        justifyContent: 'center',
        padding: 10,
    },
    SmallFontSize: {
        fontSize: 16,
    },
    NormalFontSize: {
        fontSize: 19,
    },
    BigFontSize: {
        fontSize: 26,
        fontWeight: 'bold',
    }
})