import { StyleSheet } from 'react-native';


const Styles = StyleSheet.create({
    input: {
         borderBottomWidth: 1,
         borderColor: '#737373',
         color: 'black'
    },
    form: {
         marginHorizontal:20,
         marginTop: '45%',
         color: 'black'
    },
    view: {
         paddingVertical: 20
    },
    texColor:{
         color:'black'
    }, 
    centeredView: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 22,
          backgroundColor: "rgba(168, 162, 158, 0.5)"
     },
     modalView: {
          margin: 20,
          backgroundColor: "white",
          borderRadius: 20,
          padding: 35,
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: {
               width: 0,
               height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5
     },
     modalText: {
          marginBottom: 15,
          textAlign: "center"
     },
     textTitle: {
          color:'black',
          fontWeight: 'bold',
          fontSize: 33,
          textAlign: 'center'
     },
     textSubTitle: {
          color:'black',
          fontWeight: 'bold',
          fontSize: 26,
     },
     codeContent: {
          backgroundColor: "#a3a3a3",
          marginVertical: 20,
          alignContent: 'flex-start'
     },
     textCode: {
          color: 'black',
          textAlign: 'left'
     }
});

export default Styles;