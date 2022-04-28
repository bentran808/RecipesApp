import { StyleSheet } from 'react-native';
import { width } from 'theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  footer: {
    paddingHorizontal: 20
  },
  sectionText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 30
  },
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5
  },
  toPayWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10
  },
  discountWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10
  },
  discountInput: {
    borderRadius: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 20,
    marginVertical: 10
  },
  addressWrapper: {
    paddingVertical: 10
  },
  addressControl: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  addressText: {
    color: 'gray',
    paddingVertical: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    width: width - 50,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
});

export default styles;
