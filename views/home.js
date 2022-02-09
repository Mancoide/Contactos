import React, {useRef, useCallback, useState, useEffect} from 'react';
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
     const [headerArray, setHeaderArray] = useState({
          Accept: 'application/json',
          'Content-Type': 'application/json'
     });
     const [bodyArray, setBodyArray] = useState({});
     const [isUpdate, setIsUpdate] = useState(false);
     const [urlText, setUrlText] = useState('');

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

          const headerKeyStorage = await AsyncStorage.getItem('keyTextValuesheader')
          const headerValueStorage = await AsyncStorage.getItem('valueTextValuesheader')
          const bodyKeyStorage = await AsyncStorage.getItem('keyTextValuesheader')
          const bodyValueStorage = await AsyncStorage.getItem('valueTextValuesheader')

          if(headerKeyStorage && headerValueStorage)
          {
               const headerKeyArray = JSON.parse(headerKeyStorage)
               const headerValueArray = JSON.parse(headerValueStorage)

               headerKeyArray.map( (item, index) => {
                    var newObjet = Object.assign( headerArray , { [item.text]: headerValueArray[index].text });
                    setHeaderArray(newObjet)
               })
          }

          if(bodyKeyStorage && bodyValueStorage)
          {
               const bodyKeyArray = JSON.parse(bodyKeyStorage)
               const bodyValueArray = JSON.parse(bodyValueStorage)

               bodyKeyArray.map( (item, index) => {
                    var newObjet = Object.assign( bodyArray, { [item.text]: bodyValueArray[index].text });
                    setBodyArray(newObjet)
               })
          }

          setIsUpdate(true);
     }

     useEffect(() => {
          
          const sendRequest = async () => {
               try {
                    const response = await fetch(urlText, {
                         method: 'POST',
                         headers: headerArray,
                         body: JSON.stringify(bodyArray)
                    });
     
                    const json = await response.json();
                    console.log('json', json);
               } catch (error) {
                    console.log(error);
               }
               

          }
          
          sendRequest();
     }, [isUpdate]);
     

     const changeUrl = (text) => {
          if(text !== '')
          {
               // console.log(document.getElementById('button_submit'))
               setUrlText(text);
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
                              <Button key='sm' size='sm' id="button_submit" isDisabled={disableSubmit} onPress={ () => submitSync() }>
                                   Sincronizar
                              </Button>
                         </Box>
                    </NativeBaseProvider>
               </View>
          </ScrollView>
     );
};

export default home;