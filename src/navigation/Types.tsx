import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppUser} from '../provider/FacebookProvider';

export type RootStackParamList = {
  Login: undefined;
  SignIn: undefined;
  SignUp: undefined;

};

export type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

