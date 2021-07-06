import AsyncStorage from '@react-native-community/async-storage';
import {PermissionsAndroid, Alert} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {navigationRef} from '../navigation/RootNavigation';
import {VideoRemoteState} from 'react-native-agora';
import {AppUser} from '../provider/FacebookProvider';
import Constants from '../constants/Constants';
export const requestCameraAndAudioPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);
    const cameraPermission =
      granted['android.permission.RECORD_AUDIO'] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.CAMERA'] ===
        PermissionsAndroid.RESULTS.GRANTED;
    if (cameraPermission) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export const videoStateMessage = (state: VideoRemoteState) => {
  switch (state) {
    case VideoRemoteState.Stopped:
      return 'Video turned off by Host';

    case VideoRemoteState.Frozen:
      return 'Connection Issue, Please Wait';

    case VideoRemoteState.Failed:
      return 'Network Error';
  }
};

export const makeid = (length: number) => {
  var result = [];
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength)),
    );
  }
  return result.join('');
};

export const getRandomInt = (min = 30, max = 10000) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getDataFromStorage = async (key: string) => {
  const data = await AsyncStorage.getItem(key);
  if (data) {
    return Promise.resolve(JSON.parse(data));
  } else {
    return Promise.reject();
  }
};

export const isTokenExpire = (token: string) => {
  const TOKEN_REFRESH_TIME = 2400 * 60 * 1000;
  return token
    ? new Date() - new Date(Number(token)) > TOKEN_REFRESH_TIME
    : false;
};

export const clearStorage = () => {
  AsyncStorage.multiRemove([
    Constants.STORAGE.APP_LANGUAGE,
    Constants.STORAGE.FACEBOOK_ACCESS_TOKEN,
    Constants.STORAGE.FRIENDS_LIST,
    Constants.STORAGE.LAST_UPDATED_SESSION_TIME,
    Constants.STORAGE.ACCESS_TOKEN,
    Constants.STORAGE.USER_INFO,
    Constants.STORAGE.APPLE_ACCESS_TOKEN,
    Constants.STORAGE.APPLE_USER,
  ]);
};

export const insertOrRemoveFromArray = (data: AppUser, list: AppUser[]) => {
  let newArray = [...list];
  const isExist = list.find(friend => friend.id === data?.id);
  if (!isExist) {
    newArray.push(data);
  } else {
    newArray = list.filter(friend => friend.id !== data?.id);
  }
  return newArray;
};

export const clearStackAndNavigate = async (screen: string) => {
  navigationRef?.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: screen}],
    }),
  );
};

export const saveDataToStorage = (key: string, data: String) => {
  return AsyncStorage.setItem(key, JSON.stringify(data));
};

export const convertObjectToQueryString = (params: any) => {
  return Object.keys(params)
    .map(key => key + '=' + params[key])
    .join('&');
};

// const generateRtcToken = (title: string) => {
//   // Rtc Examples
//   const appID = Secrets.REACT_APP_AGORA_APP_ID;
//   const appCertificate = Secrets.REACT_APP_AGORA_APP_CERTIFICATE;
//   const channelName = title;
//   const uid = 0;
//   const role = RtcRole.PUBLISHER;

//   const expirationTimeInSeconds = 3600;

//   const currentTimestamp = Math.floor(Date.now() / 1000);

//   const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

//   // IMPORTANT! Build token with either the uid or with the user account. Comment out the option you do not want to use below.

//   // Build token with uid
//   const tokenA = RtcTokenBuilder.buildTokenWithUid(
//     appID,
//     appCertificate,
//     channelName,
//     uid,
//     role,
//     privilegeExpiredTs,
//   );
//   return tokenA;

//   // Build token with user account
//   // const tokenB = RtcTokenBuilder.buildTokenWithAccount(appID, appCertificate, channelName, account, role, privilegeExpiredTs);
//   // console.log("Token With UserAccount: " + tokenB);
// };

// const generateRtmToken = () => {
//   // Rtm Examples
//   const appID  = process.env.REACT_APP_AGORA_APP_ID;
//   const appCertificate = process.env.REACT_APP_AGORA_APP_CERTIFICATE;
//   const account = '0';

//   const expirationTimeInSeconds = 3600
//   const currentTimestamp = Math.floor(Date.now() / 1000)

//   const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds

//   const token = RtmTokenBuilder.buildToken(appID, appCertificate, account, RtmRole, privilegeExpiredTs);
//   return token
// }

// generateRtcToken()
// generateRtmToken()
export const showAlert = (
  title: string = '',
  msg: string = '',
  buttonTitle: string,
  onPress: () => void,
) => {
  Alert.alert(
    title,
    msg,
    [
      {
        text: buttonTitle,
        onPress: () => onPress(),
        style: 'cancel',
      },
    ],
    {cancelable: false},
  );
};
