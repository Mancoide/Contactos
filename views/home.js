import React, {useRef, useCallback, useState, useEffect} from 'react';
import { 
     View,
     ScrollView, 
     TextInput, 
     Text,
     StyleSheet,
     Alert,
     PermissionsAndroid 
} from 'react-native';
import { Button, Box, NativeBaseProvider } from 'native-base';
import Styles from '../css/styles';
import modal from '../components/modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import Contacts from 'react-native-contacts';

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
     const [jsonResponse, setJsonResponse] = useState();

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

          setIsUpdate(!isUpdate);
     }

     useEffect(() => {
          setJsonResponse({  emailAddresses: [{
               label: "work",
               email: "mrniet@example.com",
             }],
             familyName: "Nietzsche",
             givenName: "Friedrich"});
          const sendRequest = async () => {
               try {
                    const response = await fetch(urlText, {
                         method: 'POST',
                         headers: headerArray,
                         body: JSON.stringify(bodyArray)
                    });
     
                    const json = await response.json();
                    setJsonResponse(json);

               } catch (error) {
                    if(error.message == 'Network request failed') 
                    {
                         Alert.alert('Conexión', 'Direccion/Url invalida');
                    }
               }
          }

          NetInfo.fetch().then(state => {
               if ( state.isConnected )
               {
                    sendRequest();
               }
               else
               {
                    Alert.alert('Conexión', 'Asegurese de que su dispositivo tenga acceso a internet.');
               }
          });
          
     }, [isUpdate]);

     useEffect(() => {
          const getPermissions = async () => {
               try {
                    const andoidContactPermission = await PermissionsAndroid.request(
                      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                      {
                        title: "Contacts Permission",
                        message:
                          "This app would like to view your contacts.",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                      }
                    );
                    if (andoidContactPermission === PermissionsAndroid.RESULTS.GRANTED) {
                         Contacts.getAll((andoidContactPermission, contacts) => {
                              console.log(contacts);
                         });
                    } 

               } catch (err) 
               {
                    console.log(err);
               }
          }

          getPermissions();
          
     }, [jsonResponse]);
     

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
                    <Text style={Styles.texColor}>Ingrese URL</Text>
                    <TextInput
                         ref={textInputRef}
                         style={Styles.input}
                         placeholder={'www.example.com'}
                         onFocus={ updateInputsProps }
                         onBlur={ updateInputsProps }
                         onChangeText={ text => changeUrl(text) }
                         placeholderTextColor="#a3a3a3" 
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