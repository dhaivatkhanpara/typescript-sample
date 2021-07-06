import * as React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import App from '../../App';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      customColor: string;
    }

    interface Theme {
      myOwnProperty: boolean;
    }
  }
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    customColor: '#BADA55',
  },
  myOwnProperty: true,
};

export default function Theme() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}
