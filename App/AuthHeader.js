// AuthHeader.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AuthHeader = ({ onLoginPress, onRegisterPress, isOnSignupScreen }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity 
                onPress={onLoginPress} 
                style={[styles.button, isOnSignupScreen ? styles.inactive : styles.active]} 
            >
                <Text style={isOnSignupScreen ? styles.inactiveText : styles.activeText}>LOG IN</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={onRegisterPress} 
                style={[styles.button, isOnSignupScreen ? styles.active : styles.inactive]} 
            >
                <Text style={isOnSignupScreen ? styles.activeText : styles.inactiveText}>REGISTER</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#4169E1',
        borderTopRightRadius: 15,
        height: 50,
        marginTop: 40, // Add marginTop here
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    active: {
        backgroundColor: '#4169E1', // Active button color
    },
    inactive: {
        backgroundColor: '#2C3E50', // Inactive button color
    },
    activeText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    inactiveText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});

export default AuthHeader;