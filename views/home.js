import React, {useRef, useCallback, useState} from 'react';
import { 
     View,
     ScrollView, 
     TextInput, 
     Text,
     StyleSheet
} from 'react-native';
import { Button, Box, NativeBaseProvider } from 'native-base';
import Styles from '../css/styles';
import modal from '../components/modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const home = () => {

     const textInputRef = useRef();
     const [disableSubmit, setDisableSubmit] = useState(true);
     const [headerArray, setHeaderArray] = useState([]);

     const updateInputsProps = useCallback(() => {

          if(textInputRef.current.isFocused()) 
          {
               textInputRef.current.setNativeProps({ style: {borderColor: '#0891b2'} })
          } else 
          {
               textInputRef.current.setNativeProps({ style: {borderColor: '#737373'} })
          }
     }, []);

     const submitSync = async () => {
          console.log('hola');
          const headerKeyArray = await AsyncStorage.getItem('keyTextValuesheader')
          const headerValueArray = await AsyncStorage.getItem('valueTextValuesheader')
          const bodyKeyArray = await AsyncStorage.getItem('keyTextValuesheader')
          const bodyValueArray = await AsyncStorage.getItem('valueTextValuesheader')

          if(headerKeyArray && headerValueArray)
          {
               const headerKeyArray = JSON.parse(keyTexts)
               const headerValueArray = JSON.parse(valueText)

               headerKeyArray.map( (index, value) => {
                    console.log(index, value);
               })
          }
     }

     const changeUrl = (text) => {
          if(text !== '')
          {
               // console.log(document.getElementById('button_submit'))
               setDisableSubmit(false)
          }
          else
          {
               setDisableSubmit(true)
          }
     }

     return (
          <ScrollView style={Styles.form}>
               <View>
                    <Text>Ingrese URL</Text>
                    <TextInput
                         ref={textInputRef}
                         style={Styles.input}
                         placeholder={'www.example.com'}
                         onFocus={ updateInputsProps }
                         onBlur={ updateInputsProps }
                         onChangeText={ text => changeUrl(text) }
                    />
               </View>
               <View style={Styles.view}>
                    <NativeBaseProvider>
                         <Box>
                              <Button key='sm' size='sm' id="button_submit" isDisabled={disableSubmit} onClick={ () => submitSync}>
                                   Sincronizar
                              </Button>
                         </Box>
                    </NativeBaseProvider>
               </View>
          </ScrollView>
     );
};

export default home;