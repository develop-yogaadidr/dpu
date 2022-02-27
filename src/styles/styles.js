import {StyleSheet} from 'react-native';
import {colors, size} from './skeleton';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  contentPadding: {
    padding: size.paddingSM,
  },
  btnPrimary: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnPrimaryText: {
    color: 'white',
    width: '100%',
    textAlign: 'center',
  },
  btnDefault: {
    backgroundColor: colors.default,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnDefaultText: {
    color: 'white',
    width: '100%',
    textAlign: 'center',
  },
  textHeader: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: size.marginMD,
  },
  textHeaderSM: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: size.marginSM,
  },
  textInput: {
    backgroundColor: 'white',
    height: 30,
    borderWidth: 0,
    borderColor: '#fff',
    // borderRadius: 7,
    padding: size.paddingSM,
    margin: 0,
  },
  centerAll: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerAllFit: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
  },
  alignRight: {
    alignItems: 'flex-end',
  },
  alignLeft: {
    alignItems: 'flex-start',
  },
  justifyRight: {
    justifyContent: 'flex-end',
  },
  justifyLeft: {
    justifyContent: 'flex-start',
  },
  textLeft: {
    textAlign: 'left',
  },
  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  numberPicker: {
    backgroundColor: 'white',
    flexDirection: 'row',
    width: 100,
    // borderRadius: 7,
    alignItems: 'center',
    paddingLeft: 4,
    paddingRight: 4,
  },
  numberPickerButtonsText: {
    fontSize: 24,
    color: colors.primary,
  },
  numberPickerText: {
    alignSelf: 'center',
    textAlign: 'center',
    flex: 2,
  },
  numberPickerLeftButton: {
    flex: 1,
  },
  numberPickerRightButton: {
    flex: 1,
    alignItems: 'flex-end',
  },
  validationMessage: {
    marginLeft: size.marginSM,
    marginTop: size.marginXS,
    textAlign: 'right',
    fontSize: 11,
    color: colors.primary,
  },
});
