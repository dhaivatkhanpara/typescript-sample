import {Dimensions} from 'react-native';

export const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

const Variables = {
  remoteWidth: (dimensions.height - 150) / 2,
  remoteHeight: (dimensions.height - 150) / 2,
  btnHeight: 100,
  fullViewHeight: dimensions.height - 130,
};
export default Variables;
