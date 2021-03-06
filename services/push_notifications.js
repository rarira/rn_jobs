import { Permissions, Notifications } from 'expo';
// import { AsyncStorage } from 'react-native';
import axios from 'axios';

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';

export default async () => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.REMOTE_NOTIFICATIONS
  );
  let finalStatus = existingStatus;
  console.log(existingStatus);

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    console.log('ask called!');
    const { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();
  console.log(token);
  await axios.post(PUSH_ENDPOINT, { token: { token } });
  // await AsyncStorage.setItem('pushtoken', token);
};
