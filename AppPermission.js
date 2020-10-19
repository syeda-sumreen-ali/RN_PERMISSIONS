import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {Platform} from 'react-native';
import {PermissionsAndroid} from 'react-native';

const PLATFORM_MICROPHONE_PERMISSIONS = {
  ios: PERMISSIONS.IOS.MICROPHONE,
  android: PERMISSIONS.ANDROID.RECORD_AUDIO,
};
const PLATFORM_LOCATION_PERMISSIONS = {
  ios: null,
  android: PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
};
const REQUEST_PERMISSION_TYPE = {
  microphone: PLATFORM_MICROPHONE_PERMISSIONS,
  location: PLATFORM_LOCATION_PERMISSIONS,
};
const PERMISSION_TYPE = {
  microphone: 'microphone',
  location: 'location',
};
class AppPermission {
  checkPermission = async (type): Promise<boolean> => {
    console.log('AppPermission checkPermission Type:', type);
    const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS];
    console.log('AppPermission checkPermission permissions:', permissions);
    if (!permissions) {
      return true;
    }

    try {
      const result = await check(permissions);
      console.log('AppPermission checkPermission result:', result);
      if (result === RESULTS.GRANTED) return true;
      return this.requestPermission(permissions); //request permission
    } catch (err) {
      return false;
    }
  };

  requestPermission = async (permissions): Promise<boolean> => {
    console.log('AppPermission checkPermission permissions:', permissions);
    try {
      const result = await request(permissions);
      console.log('AppPermission requestPermission reuslt:', result);

      return result;
    } catch (err) {
      return false;
    }
  };

  // locationPermission = async function requestLocationPermission() {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: 'Example App',
  //         message: 'Example App access to your location ',
  //       },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('You can use the location');
  //       alert('You can use the location');
  //     } else {
  //       console.log('location permission denied');
  //       alert('Location permission denied');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };
}

const Permission = new AppPermission();
export {Permission, PERMISSION_TYPE};
