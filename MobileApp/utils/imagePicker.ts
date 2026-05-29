import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';



export const imagePicker = async () => {
    try {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert('Permission to access camera roll is required!');
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const avatar = {
                uri: result.assets[0].uri,
                type:  'image/jpeg',
                name: result.assets[0].fileName || "avatar.jpg",
            }
            return avatar
        }
    } catch (error) {
        console.log("Error while pick avatar image: ", error)
    }
}