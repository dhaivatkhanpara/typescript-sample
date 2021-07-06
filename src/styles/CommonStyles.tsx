import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {baseColors, colors} from '../config';
import {wp} from '../helper/responsive';

interface Styles {
  center: ViewStyle;
  safeArea: ViewStyle;
  avatarImageContainer: ViewStyle;
  avatar: ImageStyle;
  divider: ViewStyle;
  modalContainer: ViewStyle;
  modalHeader: ViewStyle;
  modalHeaderText: TextStyle;
  separateLine: ViewStyle;
  commonFlex: ViewStyle;
  cardShadow: ViewStyle;
}

export const styles = StyleSheet.create<Styles>({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {flex: 1, backgroundColor: colors.primary_background},
  avatarImageContainer: {
    height: wp(12),
    width: wp(12),
    borderRadius: wp(12) / 2,
    marginRight: 10,
    overflow: 'hidden',
  },
  avatar: {
    aspectRatio: 1,
  },
  divider: {
    borderBottomColor: colors.secondary_font,
    opacity: 0.25,
    borderBottomWidth: 1,
  },
  modalContainer: {
    position: 'absolute',
    top: 80,
    right: wp(2),
    width: wp(80),
    backgroundColor: baseColors.white,
    zIndex: 99,
    borderRadius: 16,
    shadowColor: colors.primary_font,
    shadowOpacity: 0.5,
    elevation: 48,
    shadowRadius: 48,
  },
  modalHeader: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalHeaderText: {
    color: colors.secondary_font,
  },
  separateLine: {
    borderBottomColor: colors.secondary_font,
    opacity: 0.14,
    borderBottomWidth: 0.99,
    alignSelf: 'center',
    width: wp(65),
    marginTop: 10,
  },
  commonFlex: {
    flex: 1,
  },
  cardShadow: {
    shadowColor: colors.primary_font,
    shadowOpacity: 0.1,
    shadowRadius: 32,
    elevation: 32,
    shadowOffset: {height: 16, width: 0},
  },
});
