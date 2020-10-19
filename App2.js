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
// import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {BackHandler, DeviceEventEmitter} from 'react-native';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';

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
  componentDidMount() {
    let val = Permission.checkPermission(PERMISSION_TYPE.location);
    if (val) {
      Geolocation.getCurrentPosition((info) => console.log(info));
    } else {
      alert('Switch on Location');
    }
    // if (Platform.OS === 'android') {
    //   // Calling the permission function
    //   const granted = await PermissionsAndroid.request(
    //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //     PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    //     PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
    //     {
    //       title: 'Example App Camera Permission',
    //       message: 'Example App needs access to your camera',
    //     },
    //   );
    //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //     // Permission Granted
    //     alert('YOU CAN ACCESS LOCATION');
    //     this.Getlocation();
    //   } else {
    //     // Permission Denied
    //     alert('LOCATION Permission Denied');
    //   }
    // } else {
    //   alert('You ARE NOT ANDROID USER');
    // }
    // RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
    //   interval: 10000,
    //   fastInterval: 5000,
    // })
    //   .then((data) => {
    //     // The user has accepted to enable the location services
    //     // data can be :
    //     //  - "already-enabled" if the location services has been already enabled
    //     //  - "enabled" if user has clicked on OK button in the popup
    //     // this.Getlocation();
    //     console.log(data);
    //     let geoConfig = {
    //       enableHighAccuracy: true,
    //       timeout: 50000,
    //       maximumAge: 50000,
    //     };
    //     Geolocation.getCurrentPosition((info) => console.log(info));

    //     // Geolocation.getCurrentPosition(this.geoSuccess, this.geoErr, geoConfig);
    //   })
    //   .catch((err) => {
    //     // The user has not accepted to enable the location services or something went wrong during the process
    //     // "err" : { "code" : "ERR00|ERR01|ERR02|ERR03", "message" : "message"}
    //     // codes :
    //     //  - ERR00 : The user has clicked on Cancel button in the popup
    //     //  - ERR01 : If the Settings change are unavailable
    //     //  - ERR02 : If the popup has failed to open
    //     //  - ERR03 : Internal error
    //     console.log(err);
    //   });
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
