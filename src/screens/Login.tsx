import React, {FunctionComponent, useEffect} from 'react';
import {
  View,
  Animated,
  Easing,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
} from 'react-native';
import {styles} from '../styles/LoginStyles';
import {useApple, useFacebook, useLocal, useUser} from '../context';
import {SOCIAL_AUTH} from '../graphql/Schema';
import {useMutation} from 'react-apollo';
import SVGIcons from '../assets/svg';
import {TextElement} from '../components/common/TextComponents';
import AsyncStorage from '@react-native-community/async-storage';
import Constants from '../constants/Constants';
import {hp, wp} from '../helper/responsive';
import {
  clearStackAndNavigate,
  clearStorage,
  makeid,
  saveDataToStorage,
} from '../helper/Utils';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {LoginType} from '../provider/UserProvider';
import {LoginScreenNavigationProp} from '../navigation/Types';
const btnType = {email: 'email', fb: 'fb', apple: 'apple'};

type LoginProps = {
  navigation: LoginScreenNavigationProp;
};

const Login: FunctionComponent<LoginProps> = ({navigation}) => {
  const {onFacebookLoginPress, faceBookaccessToken} = useFacebook()!;
  const {setAccessToken, setUserInfo, setLoginType} = useUser()!;

  const {onAppleLoginPress, appleAccessToken} = useApple()!;

  const {translations, initializeAppLanguage} = useLocal()!;
  const [socialAuth, {data: socialAuthData, error: errorInLogin}] =
    useMutation(SOCIAL_AUTH);
  const bottomAnimationHeight = new Animated.Value(0);
  const opacity = new Animated.Value(0.5);
  const screenHeight = useWindowDimensions().height;

  initializeAppLanguage();

  useEffect(() => {
    const startAnimation = () => {
      Animated.timing(bottomAnimationHeight, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => {
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start();
      });
    };
    startAnimation();
    if (!appleAuth.isSupported) {
      return;
    }
    return appleAuth.onCredentialRevoked(async () => {
      console.warn('Credential Revoked');
    });
  }, []);

  useEffect(() => {
    if (socialAuthData?.socialAuth?.success === true) {
      const {
        socialAuth: {token, user},
      } = socialAuthData;
      setUserInfo(user);
      saveDataToStorage(Constants.STORAGE.USER_INFO, user);
      AsyncStorage.setItem(Constants.STORAGE.ACCESS_TOKEN, token);
      AsyncStorage.setItem(
        Constants.STORAGE.LAST_UPDATED_SESSION_TIME,
        new Date().valueOf().toString(),
      );
      setLoginType(
        user?.connectedFacebook ? LoginType.Facebook : LoginType.Apple,
      );
      setAccessToken(token);
      clearStackAndNavigate('Home');
    } else if (socialAuthData?.socialAuth?.success === false) {
      clearStorage();
    }
  }, [socialAuthData]);

  useEffect(() => {
    //if login fail from Backend clear saved tokens!
    if (errorInLogin) {
      clearStorage();
    }
  }, [errorInLogin]);

  useEffect(() => {
    if (faceBookaccessToken || appleAccessToken) {
      socialAuthApi(
        faceBookaccessToken || appleAccessToken,
        faceBookaccessToken ? LoginType.Facebook : LoginType.Apple,
      );
    }
  }, [faceBookaccessToken, appleAccessToken]);

  const socialAuthApi = async (
    token: string | undefined,
    logintype: string,
  ) => {
    const fcmToken = await AsyncStorage.getItem(Constants.FCMTOKEN);
    socialAuth({
      variables: {
        DeviceType: {
          deviceId: fcmToken ? fcmToken : makeid(5),
          platform: Platform.OS,
        },
        logintype: logintype,
        name: 'Apple User',
        token: token,
      },
    });
  };

  const animationHeight = bottomAnimationHeight.interpolate({
    inputRange: [0, 0.9],
    outputRange: [0, (screenHeight * 0.5) / 1.1],
  });
  const onPressEmail = () => {
    navigation.navigate('SignIn');
  };

  const renderAuthOption = (
    buttonType: string,
    title: string,
    onPressButton: () => void,
  ) => {
    const ButtonIcon =
      buttonType === btnType.email
        ? SVGIcons.EmailIcon
        : buttonType === btnType.fb
        ? SVGIcons.FacebookIcon
        : SVGIcons.AppleIcon;
    return (
      <TouchableOpacity
        style={[styles.loginContainer]}
        onPress={() => onPressButton()}
        activeOpacity={0.5}>
        <View style={styles.buttonContainer}>
          <ButtonIcon width={wp(8)} height={wp(8)} />
          <TextElement h4 customStyle={styles.loginText} custom_medium>
            {title}
          </TextElement>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.topContainer, {opacity: opacity}]}>
        <TextElement h5 customStyle={styles.welcome} custom_medium>
          {translations['Login.welcomeTo']}
        </TextElement>
        <SVGIcons.LogoIconWhite width={wp(54)} height={hp(4.9)} />
        <TextElement h4 customStyle={styles.text} custom_medium>
          {translations['Login.description']}
        </TextElement>
      </Animated.View>
      <Animated.View
        style={[styles.bottomContainer, {height: animationHeight}]}>
        {renderAuthOption(
          btnType.email,
          `${translations['Login.continueWithEmail']}`,
          onPressEmail,
        )}
        {renderAuthOption(
          btnType.fb,
          `${translations['Login.continueWithFb']}`,
          onFacebookLoginPress,
        )}
        {Platform.OS === 'ios' &&
          renderAuthOption(
            btnType.apple,
            `${translations['Login.continueWithApple']}`,
            onAppleLoginPress,
          )}
        <TextElement h6 customStyle={styles.privacyText} light>
          {translations['Login.termAndPrivacy']}
        </TextElement>

        <TextElement h5 customStyle={styles.notAccountMessage} custom_regular>
          {translations['Login.noAccountMessage']}
          <TextElement
            h5
            customStyle={styles.signUpText}
            onPress={() => navigation.replace('SignUp')}
            custom_bold>
            {` ${translations['Login.signUp']}`}
          </TextElement>
        </TextElement>
      </Animated.View>
    </View>
  );
};

export default Login;
