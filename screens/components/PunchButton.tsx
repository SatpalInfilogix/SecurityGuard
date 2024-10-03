import React, { useState } from 'react';
import { View, StyleSheet, PermissionsAndroid, Platform, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import theme from '../../theme';
import Geolocation from '@react-native-community/geolocation';

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

    const handleTogglePunch = async () => {
        const hasPermission = await requestLocationPermission();
        if (!hasPermission) {
            Alert.alert("Permission Denied", "Location permission is required to punch in.");
            return;
        }

        Geolocation.getCurrentPosition(info => console.log(info));

        setIsPunchedIn((prevState) => !prevState);
        console.log(isPunchedIn ? "Punched Out!" : "Punched In!");
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
});

export default PunchButton;
