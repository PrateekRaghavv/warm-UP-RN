import { Text, View, StyleSheet, TextInput, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';


export default function Travelling() {
    const [data, setData] = useState({
        Departure: {
            city: '',
            date: ''
        },
        Arrival: {
            city: '',
            date: ''
        }
    });

    const [CitiesList, setCitiesList] = useState([]);
    const [activeField, setActiveField] = useState()

    const URL = process.env.EXPO_PUBLIC_API_URL; //for local development

    const CODESPACE_URL = process.env.CODESPACE_URL; //for codespace development
    async function cities(value) {
        let Response = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${value}&apiKey=f2c62a1d72a84f29bc671791fac91b4f`)

        const data = await Response.json()
        setCitiesList(data.features)
        return data.features
    }

    async function AddTripDetails() {
        if (data.Departure.city && data.Departure.date && data.Arrival.city && data.Arrival.date) {

            try {
                console.log(`${URL}/TravelingDetails`);
                const response = await fetch(`${URL}/TravelingDetails`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        data: data,
                    }),
                })
                const result = await response.json();
                console.log(result)// updated according to backend
            }
            catch (err) {
                console.log('err', err)
            }
        }
        else {
            console.log('please fill all the feilds')
        }
    }
    const openDatePicker = (e) => {

        return DateTimePickerAndroid.open({
            value: new Date(),
            mode: 'date',
            onChange: (event, selectedDate) => {
                if (selectedDate) {

                    if (e === 'departure') {
                        setData((prev) => ({ ...prev, Departure: { ...prev.Departure, date: selectedDate } }));
                    }
                    if (e === 'arrival') {
                        setData((prev) => ({ ...prev, Arrival: { ...prev.Arrival, date: selectedDate } }));
                    }
                }
            }
        });
    }
    return (
        <View style={styles.inputContainer}>
            <View>
                <Text style={styles.BigFontSize}>Where are you Travelling?</Text>
            </View>
            <View style={{ gap: 20, width: '100%', alignItems: 'center' }}>
                <View style={[styles.Input, { zIndex: 2, elevation: 2 }]}>
                    <View>
                        <Text style={styles.NormalFontSize}>From</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Ionicons
                            name="location-sharp"
                            size={24}
                            color="#000"
                        />

                        <View style={{ flexDirection: 'column', width: '100%', zIndex: 500 }}>

                            <TextInput
                                style={{ width: '60%', fontSize: 16 }}
                                value={data.Departure.city}

                                onChangeText={(e) => {
                                    cities(e)
                                    setActiveField('Departure')
                                    setData(prev => ({ ...prev, Departure: { ...prev.Departure, city: e } }))
                                }}
                                placeholder='Enter Departure City'

                            />


                            <View style={{ position: 'absolute', top: 35, backgroundColor: '#fff', width: '90%' }}>
                                8
                                {activeField === 'Departure' && CitiesList.map((city, index) => (
                                    <Pressable

                                        key={index} onPress={() => {
                                            setCitiesList([])
                                            setData((prev) => ({ ...prev, Departure: { ...prev.Departure, city: city.properties.formatted } }))
                                        }}
                                        style={{ borderBottomWidth: 1, borderBottomColor: '#000', padding: 5 }}>
                                        <Text>{city.properties.formatted}</Text>
                                    </Pressable>
                                ))}

                            </View>


                        </View>
                    </View>

                </View>

                <View style={[styles.Input, { zIndex: 1, elevation: 1 }]}>
                    <View>
                        <Text style={styles.NormalFontSize}>To</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Ionicons
                            name="location-sharp"
                            size={24}
                            color="#000"
                        />
                        <View style={{ flexDirection: 'column', width: '100%', zIndex: 500 }}>

                            <TextInput
                                style={{ width: '60%', fontSize: 16 }}
                                value={data.Arrival.city}
                                onChangeText={(e) => {
                                    cities(e)
                                    setActiveField('Arrival');
                                    setData(prev => ({ ...prev, Arrival: { ...prev.Arrival, city: e } }))
                                }}
                                placeholder='Enter Arrival City'
                                required
                            />


                            <View style={{ position: 'absolute', top: 35, backgroundColor: '#fff', width: '90%' }}>

                                {activeField === 'Arrival' && CitiesList.map((city, index) => (
                                    <Pressable

                                        key={index} onPress={() => {
                                            setCitiesList([])
                                            setData((prev) => ({ ...prev, Arrival: { ...prev.Arrival, city: city.properties.formatted } }))
                                        }}
                                        style={{ borderBottomWidth: 1, borderBottomColor: '#000', padding: 5 }}>
                                        <Text>{city.properties.formatted}</Text>
                                    </Pressable>
                                ))}

                            </View>


                        </View>
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
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>{data.Departure.date ? data.Departure.date.toLocaleDateString() : 'SELECT DATE'}</Text>
                        </Pressable>
                    </View>
                </View>

                <View style={styles.DateCard}>
                    <View>
                        <Text style={styles.SmallFontSize}>Arrival Date</Text>
                    </View>
                    <View>
                        <Pressable onPress={() => openDatePicker('arrival')} style={{ backgroundColor: '#5DADE2', padding: 10, borderRadius: 10, width: '80%', alignItems: 'center' }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>{data.Arrival.date ? data.Arrival.date.toLocaleDateString() : 'SELECT DATE'}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <View style={{ gap: 20, width: '100%', alignItems: 'center' }}>
                <Pressable
                    onPress={AddTripDetails}
                    style={{ backgroundColor: '#5DADE2', padding: 10, borderRadius: 10, width: '80%', alignItems: 'center' }}>
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
        gap: 10,
        zIndex: 500,
        elevation: 10
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