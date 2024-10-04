import React, { useState } from 'react';
import { View, StyleSheet, PermissionsAndroid, Platform, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import theme from '../../theme';
import Geolocation from '@react-native-community/geolocation';
import { launchCamera, ImagePickerResponse, CameraOptions } from 'react-native-image-picker';

const PunchButton: React.FC = () => {
    const [isPunchedIn, setIsPunchedIn] = useState(false);

    const requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Location Permission",
                    message: "This app needs access to your location.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK",
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } else {
            return true; // Assume permission is granted for simplicity
        }
    };

    const requestCameraPermission = async (): Promise<boolean> => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Camera Permission",
                    message: "This app needs access to your camera.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK",
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } else {
            // For iOS, you should ideally check using react-native-permissions,
            // but for simplicity, we'll assume permission is granted.
            return true;
        }
    };

    const handleTogglePunch = async () => {
        const hasLocationPermission = await requestLocationPermission();
        if (!hasLocationPermission) {
            Alert.alert("Permission Denied", "Location permission is required to punch in.");
            return;
        }

        const hasCameraPermission = await requestCameraPermission();
        if (!hasCameraPermission) {
            Alert.alert("Camera Permission Denied", "Camera access is required to take a selfie.");
            return;
        }

        const cameraOptions: CameraOptions = {
            mediaType: 'photo',
            cameraType: 'front', // To capture a selfie
            saveToPhotos: false,
        };

        launchCamera(cameraOptions, (response: ImagePickerResponse) => {
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.errorCode) {
                Alert.alert("Camera Error", response.errorMessage);
                return;
            } else if (response.assets && response.assets.length > 0) {
                console.log('assets', response.assets)
                //setPhoto(response.assets[0].uri);

                Geolocation.getCurrentPosition(info => console.log(info));
                setIsPunchedIn((prevState) => !prevState);
                console.log(isPunchedIn ? "Punched Out!" : "Punched In!");
            }
        });
    };


    return (<View style={styles.buttonContainer}>

        {!isPunchedIn ? (
            <Button
                mode="contained"
                onPress={handleTogglePunch}
                style={[styles.button, { backgroundColor: theme.colors.secondary }]}
                labelStyle={{ color: theme.colors.white }}
                icon={() => <SimpleLineIcons name="energy" size={20} color={theme.colors.white} />}
            >
                Punch In
            </Button>
        ) : (
            <Button
                mode="outlined"
                onPress={handleTogglePunch}
                style={[styles.button, { backgroundColor: theme.colors.secondary }]}
                labelStyle={{ color: theme.colors.white }}
                icon={() => <SimpleLineIcons name="clock" size={20} color={theme.colors.white} />}
            >
                Punch Out
            </Button>
        )}
    </View>);
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 16,
        marginTop: 20,
    },
    button: {
        flex: 1,
        marginHorizontal: 8,
    },
    preview: {
        flex: 1,
    },
});

export default PunchButton;
