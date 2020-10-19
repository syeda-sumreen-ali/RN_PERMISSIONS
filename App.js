import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Platform,
  PermissionsAndroid,
  View,
  Alert,
} from 'react-native';
// import {Permission, PERMISSION_TYPE} from './AppPermission';

import Geolocation from '@react-native-community/geolocation';
class App extends Component {
  geoSuccess = (position) => {
    console.log(position);
  };
  geoErr = (err) => {
    // if (err.PERMISSION_DENIED === 1) {
    //   return alert('App need to access your location please grant permission');
    // }
    console.log('Error finding location trying again: ', err);
  };

  Getlocation = () => {
    let geoConfig = {
      enableHighAccuracy: true,
      timeout: 50000,
      maximumAge: 50000,
    };

    Geolocation.getCurrentPosition(this.geoSuccess, this.geoErr, geoConfig);
  };
  async componentDidMount() {
    // // Permission.checkPermission(PERMISSION_TYPE.microphone);
    // const val = await Permission.checkPermission(PERMISSION_TYPE.location);
    // console.log('val', val);
    // if (val) {
    //   this.Getlocation();
    // }
    // const val = await Permission.locationPermission();
    // console.log('val', val);

    if (Platform.OS === 'android') {
      // Calling the permission function
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        {
          title: 'Example App Camera Permission',
          message: 'Example App needs access to your camera',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Permission Granted
        alert('YOU CAN ACCESS LOCATION');
        this.Getlocation();
      } else {
        // Permission Denied
        alert('LOCATION Permission Denied');
      }
    } else {
      alert('You ARE NOT ANDROID USER');
    }
  }

  render() {
    return (
      <View>
        <Text>React Native Permission</Text>
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({});
