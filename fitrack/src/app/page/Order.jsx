import { View, TextInput, Text, Image , Pressable} from "react-native"
import {useState} from 'react'
import * as ImagePicker from 'expo-image-picker';

export default function Order() {
    const [image, setImage] = useState(null);

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

    return (
        <View>
            <View>
                <TextInput style={{ borderWidth: 1, width: 100 }} placeholder="QTY" />
                <TextInput style={{ borderWidth: 1, width: 100 }} placeholder="Any URL" />
                <TextInput style={{ borderWidth: 1, width: 100 }} placeholder="Brand" />
                <TextInput style={{ borderWidth: 1, width: 100 }} placeholder="City/Address" />
                <TextInput style={{ borderWidth: 1, width: 100 }} placeholder="Country" />
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
            </View>

        </View>
    )
}