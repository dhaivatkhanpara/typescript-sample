import React from 'react';
import {FacebookContext, FacebookProvider} from '../provider/FacebookProvider';
import {LocalizeContext, LocalizeProvider} from '../provider/LocalizeProvider';
import {AppleContext, AppleProvider} from '../provider/AppleProvider';
import {UserContext, UserProvider} from '../provider/UserProvider';

export const useFacebook = () => React.useContext(FacebookContext);
export const useUser = () => React.useContext(UserContext);
export const useApple = () => React.useContext(AppleContext);
export const useLocal = () => React.useContext(LocalizeContext);

type RootProviderProps = {
  children: React.ReactNode;
};

export const RootProvider = (props: RootProviderProps) => {
  return (
    <LocalizeProvider>
      <UserProvider>
        <FacebookProvider>
          <AppleProvider>{props.children}</AppleProvider>
        </FacebookProvider>
      </UserProvider>
    </LocalizeProvider>
  );
};
export default RootProvider;
