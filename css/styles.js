import React from 'react';
import { StyleSheet } from 'react-native';


const Styles = StyleSheet.create({
    input: {
         borderBottomWidth: 1,
         borderColor: '#737373',
         color: 'black'
    },
    form: {
         marginHorizontal:20,
         marginTop: 40,
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
     }
});

export default Styles;