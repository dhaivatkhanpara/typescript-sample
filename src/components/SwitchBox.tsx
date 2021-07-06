import React, {FunctionComponent, useState} from 'react';
import {View, StyleSheet, Switch, TextStyle, ViewStyle} from 'react-native';
import {colors} from '../config';
import {baseColors} from '../config/colors';
import {TextElement} from './common/TextComponents';

interface Styles {
  shareContainer: ViewStyle;
  shareText: TextStyle;
}

type SwitchProps = {
  title?: string;
  onSwitchChanged?: (val: boolean) => void;
};

const SwitchBox: FunctionComponent<SwitchProps> = ({
  title,
  onSwitchChanged,
}) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    onSwitchChanged && onSwitchChanged(!isEnabled);
  };
  return (
    <View style={styles.shareContainer}>
      <TextElement h5 customStyle={styles.shareText} custom_bold>
        {title}
      </TextElement>
      <Switch
        trackColor={{false: colors.secondary_font, true: colors.primary}}
        thumbColor={isEnabled ? baseColors.white : colors.inactive_switch}
        ios_backgroundColor={colors.background_switch}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create<Styles>({
  shareContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  shareText: {
    color: baseColors.black,
  },
});

export default SwitchBox;
