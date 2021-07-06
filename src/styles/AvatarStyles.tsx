import {StyleSheet, ViewStyle} from 'react-native';
import {baseColors} from '../config';
import {wp} from '../helper/responsive';

interface Styles {
  avatarOuterContainer?: ViewStyle;
  avatarImageContainer?: ViewStyle;
  avatar?: ViewStyle;
}

export const styles = StyleSheet.create<Styles>({
  avatarOuterContainer: {
    height: wp(10),
    width: wp(10),
    borderRadius: wp(10) / 2,
  },
  avatarImageContainer: {
    height: wp(10),
    width: wp(10),
    borderRadius: wp(10) / 2,
    marginRight: 10,
    shadowColor: baseColors.black,
    shadowOpacity: 0.14,
    shadowRadius: 10,
    elevation: 10,
    shadowOffset: {height: 11, width: 0},
  },
  avatar: {
    height: wp(10),
    width: wp(10),
    borderRadius: wp(10) / 2,
    borderWidth: 4,
    borderColor: baseColors.white,
  },
});
