
const Constants = {
  LOGIN_FACEBOOK_PERMISSION: [
    'public_profile',
    'email',
    'user_friends',
    'user_birthday',
    'user_photos',
    'user_gender',
    'publish_video',
  ],
  FACEBOOK_APP_VERSION: 'v10.0',
  GraphQuery: {
    GET_FRIENDS: '/me/friends',
    LIVE_NOW: 'me/live_videos',
    GET_USER_INFO: '/me',
  },
  GraphRequest: {
    FRIEND_REQUEST_PARAMS: {
      fields: {
        string: 'id,name,picture,first_name,last_name',
      },
    },
    LIVE_VIDEO_PARAMS: {
      title: {
        string: 'Live on facebook',
      },
      status: {
        string: 'LIVE_NOW',
      },
      value: {
        string: 'all',
      },
    },
    LIVE_END_VIDEO_PARAMS: {
      end_live_video: {
        string: 'true',
      },
    },
    USER_REQUEST_PARAMS: {
      fields: {
        string: 'id,name,picture,first_name,last_name',
      },
    },
  },
  STORAGE: {
    APP_LANGUAGE: 'appLanguage',
    FACEBOOK_ACCESS_TOKEN: 'facebookAccessToken',
    APPLE_ACCESS_TOKEN: 'appleAccessToken',
    FRIENDS_LIST: 'friendsList',
    APPLE_USER: 'appleUser',
    USER_INFO: 'facebookUserInfo',
    ACCESS_TOKEN: 'accessToken',
    LAST_UPDATED_SESSION_TIME: 'lastUpdatedSessionTime',
  },
  DEFAULT_LANGUAGE: 'en',
  FCMTOKEN: 'FCMTOKEN',
  LiveTranscoding: {
    width: 640,
    height: 360,
    videoBitrate: 400,
    videoFramerate: 15,
    audioSampleRate: AudioSampleRateType.Type48000,
    audioBitrate: 48,
    audioChannels: 1,
    videoGop: 30,
    videoCodecProfile: VideoCodecProfileType.High,
    transcodingUsers: [],
  },
};
export default Constants;
