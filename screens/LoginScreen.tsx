import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Provider as PaperProvider } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import theme from '../theme';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Make sure to import the icon library you need

type Props = {
  navigation: StackNavigationProp<any>;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const handleLogin = () => {
    console.log('Username:', username);
    console.log('Password:', password);
    navigation.navigate('HomeTabs');
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          label="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          mode="outlined"
          theme={{
            colors: {
              primary: theme.colors.primary
            },
          }}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={styles.input}
          mode="outlined"
          theme={{
            colors: {
              primary: theme.colors.primary
            },
          }}
          right={
            <TextInput.Icon
                icon={() => (
                <Icon 
                    name={showPassword ? 'visibility-off' : 'visibility'} 
                    size={24} 
                    onPress={handleTogglePasswordVisibility} 
                />
                )}
                onPress={handleTogglePasswordVisibility}
            />
          }
        />
        <Button mode="contained" onPress={handleLogin} style={[styles.button, { backgroundColor: theme.colors.secondary }]}>
          Login
        </Button>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff', // or theme.colors.background if preferred
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#000', // or theme.colors.primary if preferred
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
});

export default LoginScreen;
