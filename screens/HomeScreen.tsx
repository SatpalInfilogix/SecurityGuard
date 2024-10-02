import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import theme from '../theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [isPunchedIn, setIsPunchedIn] = useState(false);

  const handleTogglePunch = () => {
    setIsPunchedIn((prevState) => !prevState);
    console.log(isPunchedIn ? "Punched Out!" : "Punched In!");
  };

  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <Title>Today's Location</Title>
          <Paragraph>Security Guard is currently at: {`Location Name/Address`}</Paragraph>
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
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
      </View>

      <View style={styles.linksContainer}>
        <Button
          mode="text"
          onPress={() => navigation.navigate('FAQ')}
          style={styles.linkButton}
          labelStyle={{ color: theme.colors.primary }}
        >
          FAQ
        </Button>
        <Button
          mode="text"
          onPress={() => navigation.navigate('HelpAndComplaints')}
          style={styles.linkButton}
          labelStyle={{ color: theme.colors.primary }}
        >
          Help & Complaints
        </Button>
        <Button
          mode="text"
          onPress={() => navigation.navigate('EmergencyContact')}
          style={styles.linkButton}
          labelStyle={{ color: theme.colors.primary }}
        >
          Emergency Contact
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
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
  linksContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  linkButton: {
    marginVertical: 5,
  },
});

export default HomeScreen;
