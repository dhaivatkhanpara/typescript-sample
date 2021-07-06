import React, {FunctionComponent, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import LocalizedStrings from 'react-native-localization';
import * as RNLocalize from 'react-native-localize';
import en from '../localization/en.json';
import ru from '../localization/ru.json';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Constants from '../constants/Constants';

type Languages = 'en' | 'ru';

const translations = new LocalizedStrings({en, ru});

type LocalizeProviderProps = {
  children: React.ReactNode;
};

type LocalizeContextType = {
  appLanguage: Languages;
  setAppLanguage: (value: Languages) => void;
  initializeAppLanguage: () => void;
  translations: typeof translations;
};

export const LocalizeContext = React.createContext<
  LocalizeContextType | undefined
>({}); //to prevent lint error

export const LocalizeProvider: FunctionComponent<LocalizeProviderProps> = ({
  children,
}) => {
  const [appLanguage, setAppLanguage] = useState<Languages>('en');

  const setLanguage = (language: Languages) => {
    translations.setLanguage(language);
    setAppLanguage(language);
    AsyncStorage.setItem(Constants.STORAGE.APP_LANGUAGE, language);
  };

  const initializeAppLanguage = async () => {
    const currentLanguage = await AsyncStorage.getItem(
      Constants.STORAGE.APP_LANGUAGE,
    );

    if (currentLanguage) {
      setLanguage(currentLanguage as Languages);
    } else {
      let localeCode = Constants.DEFAULT_LANGUAGE;
      const supportedLocaleCodes = translations.getAvailableLanguages();
      const phoneLocaleCodes = RNLocalize.getLocales().map(
        locale => locale.languageCode,
      );
      phoneLocaleCodes.some(code => {
        if (supportedLocaleCodes.includes(code)) {
          localeCode = code;
          return true;
        }
      });
      setLanguage(localeCode as Languages);
    }
  };

  return (
    <SafeAreaProvider>
      <LocalizeContext.Provider
        value={{
          translations,
          setAppLanguage: setLanguage,
          appLanguage,
          initializeAppLanguage,
        }}>
        {children}
      </LocalizeContext.Provider>
    </SafeAreaProvider>
  );
};
