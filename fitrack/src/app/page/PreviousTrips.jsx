import { Text, View, StyleSheet, TextInput, Pressable } from 'react-native'
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function PreviousTrips() {
    const [tripData, setTripData] = useState([])
    const [tripId, setTripId] = useState()
    const CODESPACE_URL = process.env.EXPO_PUBLIC_CODESPACE_URL; //for codespace development

    useEffect(() => {
        fetch(`${CODESPACE_URL}/TripData/viewtrips`).then(response => response.json()).then(data => {
            setTripData(data.data)
        });
    }, [])

    function updateFunc(value) {
        console.log('executing', value)
        fetch(`${CODESPACE_URL}/TripData/updatetrip`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/JSON',

            },
            body: JSON.stringify(value)
        }
        ).then(response => response.json()).then(data => {
            console.log(data)
        }).catch(err => console.log(err))
    }

    function deleteFunc(value) {
        console.log('deleting', value._id)
        fetch(`${CODESPACE_URL}/TripData/deletetrip`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/JSON',

            },
            body: JSON.stringify({ _id: value._id })
        }
        ).then(response => {
            if(response.ok){
                setTripData(prev=>{
                    let update=prev.filter((e)=>(
                        e._id!= value._id
                    ))
                    return update
                })
            }
        }
        ).catch(err => console.log(err))
    }
    return (
        <View>
            <View>
                <Text>Added Trips</Text>
            </View>
            {
                tripData.map((e) => (

                    <View style={styles.list}>

                        {tripId == e._id ?
                            <View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text>Departure City: </Text>
                                    <TextInput value={e.Departure.city} onChangeText={(value) => {
                                        setTripData(prev => {
                                            let updated = [...prev]
                                            for (let i = 0; i < updated.length; i++) {
                                                if (updated[i]._id == e._id) {
                                                    updated[i].Departure.city = value
                                                }
                                            }
                                            return updated
                                        })
                                    }}
                                    />
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text>Departure Date: </Text>
                                </View>
                                <Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>Arrival City: </Text>
                                        <TextInput value={e.Arrival.city} onChangeText={(value) => {
                                            setTripData(prev => {
                                                let updated = [...prev]

                                                for (let i = 0; i < updated.length; i++) {
                                                    if (updated[i]._id == e._id) {
                                                        updated[i].Arrival.city = value
                                                    }
                                                }
                                                return updated
                                            })
                                        }}
                                        />
                                    </View>
                                </Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text>Arrival Date: </Text>
                                </View>
                                <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                                    <Pressable style={{ backgroundColor: 'lightblue', padding: 5, margin: 2 }} onPressOut={() => updateFunc(e)}>
                                        <Text style={{ color: 'white' }}>Save</Text>
                                    </Pressable>
                                    <Pressable style={{ backgroundColor: '#d83838', padding: 5 }} onPressOut={() => deleteFunc(e)}>
                                        <Text>Delete</Text>
                                    </Pressable>
                                </View>
                            </View> :
                            <View>
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
                                <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                                    <Pressable onPressOut={() => setTripId(e._id)}>
                                        <Ionicons name="create-outline" size={34} color="black" />
                                    </Pressable>
                                </View>
                            </View>

                        }
                    </View>
                ))
            }
        </View >
    )
}

const styles = StyleSheet.create({
    list: {
        gap: 5,
        justifyContent: 'space-between',
        margin: 9,
        width: '80%',
        borderWidth: 0.5,
        margin: 10,
        backgroundColor: '#FFFDD0'
    }
})