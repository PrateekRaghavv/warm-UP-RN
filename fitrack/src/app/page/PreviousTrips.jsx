import { Text, View, StyleSheet, TextInput, Pressable } from 'react-native'
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function PreviousTrips() {
    const [tripData, setTripData] = useState([])
    const CODESPACE_URL = process.env.EXPO_PUBLIC_CODESPACE_URL; //for codespace development
    const regex = '[\w]+'
    useEffect(() => {
        fetch(`${CODESPACE_URL}/TripData/viewtrips`).then(response => response.json()).then(data => {
            console.log(data)
            setTripData(data.data)
        });
    }, [])


    return (
        <View>
            <View>
                <Text>Added Trips</Text>
            </View>
            {
                tripData.map((e) => (
                    <View style={styles.list}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>Departure City: </Text>
                            <Text>{e.Departure.city}</Text>

                        </View>
                                                    <View style={{ flexDirection: 'row' }}>

                            <Text>Departure Date: </Text>

                            <Text>
                                {new Date(e.Departure.date).toLocaleDateString('en-IN', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric'
                                })}
                            </Text>
                        </View>
                        <Text>
                            <View style={{ flexDirection: 'row' }}>

                                <Text>Arrival City: </Text>
                                <Text>{e.Arrival.city}</Text>
                            </View>
                        </Text>
                                                    <View style={{ flexDirection: 'row' }}>

                            <Text>Departure Date: </Text>

                            <Text>
                                {
                                    new Date(e.Departure.date).toLocaleDateString('en-IN', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric'
                                    })
                                }
                            </Text>
                        </View>
                        <Ionicons name="create-outline" size={24} color="black" />
                    </View>
                ))
            }

        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        gap: 5,
        justifyContent: 'space-between',
        margin: 9,
        width: '80%',
        borderWidth: 1,
        margin: 10
    }
})