import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end'
  },
  modalView: {
    paddingVertical: 20,
    paddingHorizontal: 35,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 20
  },
  modalInput: {
    borderWidth: 0.5,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 20
  },
  btnCustom: {
    borderRadius: 5,
    marginTop: 20
  }
});

export default styles;
