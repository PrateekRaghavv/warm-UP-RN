import { View, TextInput, Text, Image, Pressable } from "react-native"
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';

export default function Order() {
    const [image, setImage] = useState(null);
    const [itemDetails, setItemDetails] = useState({
        name: "",
        QTY: "",
        ItemUrl: "",
        Brand: "",
        City: "",
        Country: "",
    });
    const URL = process.env.EXPO_PUBLIC_API_URL; //for local development
    const CODESPACE_URL = process.env.EXPO_PUBLIC_CODESPACE_URL; //for codespace development


    async function pickImage() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 0.8,
        });

        if (!result.canceled) {
            setImage(result.assets[0]);
        }
    }

    async function orderFunc() {
        try {
            let Response = await fetch(`${CODESPACE_URL}/order/addorder`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/JSON"
                },
                body: JSON.stringify(itemDetails)
            })

            const data = await Response.json()
            console.log(data);

        }
        catch (error) {
            console.log('err', error)
        }
    }
    return (
        <View>
            <View>
                <TextInput style={{ borderWidth: 1, width: 100 }} value={itemDetails.Name} onChangeText={(e) => setItemDetails(prev => ({ ...prev, Name: e }))} placeholder="Name" />

                <TextInput keyboardType="numeric" style={{ borderWidth: 1, width: 100 }} value={itemDetails.QTY} onChangeText={(e) => setItemDetails(prev => ({ ...prev, QTY: e }))} placeholder="QTY" />

                <TextInput keyboardType="url" style={{ borderWidth: 1, width: 100 }} value={itemDetails.ItemUrl} onChangeText={(e) => setItemDetails(prev => ({ ...prev, ItemUrl: e }))} placeholder="Any URL" />

                <TextInput style={{ borderWidth: 1, width: 100 }} value={itemDetails.Brand} onChangeText={(e) => setItemDetails(prev => ({ ...prev, Brand: e }))} placeholder="Brand" />

                <TextInput style={{ borderWidth: 1, width: 100 }} value={itemDetails.City} onChangeText={(e) => setItemDetails(prev => ({ ...prev, City: e }))} placeholder="City/Address" />

                <TextInput style={{ borderWidth: 1, width: 100 }} value={itemDetails.Country} onChangeText={(e) => setItemDetails(prev => ({ ...prev, Country: e }))} placeholder="Country" />
            </View>

            <View style={{ padding: 20, gap: 15 }}>
                <Pressable
                    onPress={pickImage}
                    style={{
                        backgroundColor: '#5DADE2',
                        padding: 12,
                        borderRadius: 10,
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                        Choose Image
                    </Text>
                </Pressable>

                {image && (
                    <Image
                        source={{ uri: image.uri }}
                        style={{
                            width: 200,
                            height: 200,
                            borderRadius: 10,
                        }}
                        resizeMode="cover"
                    />
                )}
                <Pressable
                    style={{
                        backgroundColor: '#5DADE2',
                        padding: 12,
                        borderRadius: 10,
                        alignItems: 'center',
                    }}
                    onPressOut={() => orderFunc()}
                >
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Order</Text>
                </Pressable>
            </View>

        </View>
    )
}