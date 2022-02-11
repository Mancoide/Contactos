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
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import Contacts from 'react-native-contacts';

const home = () => {

     const usernameRef = useRef();
     const textInputRef = useRef();
     const [disableSubmit, setDisableSubmit] = useState(true);
     const [isUpdate, setIsUpdate] = useState(false);
     const [urlText, setUrlText] = useState();
     const [username, setUsername] = useState();
     const [jsonResponse, setJsonResponse] = useState();

     const updateInputsProps = useCallback(() => {

          if(textInputRef.current.isFocused()) 
          {
               textInputRef.current.setNativeProps({ style: {borderColor: '#0891b2'} })
          } else 
          {
               textInputRef.current.setNativeProps({ style: {borderColor: '#737373'} })
          }

          if(usernameRef.current.isFocused()) 
          {
               usernameRef.current.setNativeProps({ style: {borderColor: '#0891b2'} })
          } else 
          {
               usernameRef.current.setNativeProps({ style: {borderColor: '#737373'} })
          }
     }, []);

     const submitSync = () => {

          setIsUpdate(!isUpdate);
     }

     useEffect(() => {
          const getText = async () => {
               try {
                   const urlTextStorage = await AsyncStorage.getItem('urlText')
                   const usernameStorage = await AsyncStorage.getItem('username')

                   urlTextStorage != "" ? setUrlText(urlTextStorage) : '';
                   usernameStorage != "" ? setUsername(usernameStorage) : '';

               } catch (error) {
                   console.log(error)
               }
           }
   
           getText();
     }, []);

     useEffect(() => {
          setJsonResponse([{  phoneNumbers: [{
               label: "mobile",
               number: "094581561561651651",
             }],
             displayName: "Venta y Alquiler",
             company: "REWRITE",
             givenName: "Friedrich"}]);
          // const sendRequest = async () => {
          //      try {
          //           const response = await fetch(urlText, {
          //                method: 'POST',
          //                headers: headerArray,
          //                body: JSON.stringify(bodyArray)
          //           });
     
          //           const json = await response.json();
          //           setJsonResponse(json);

          //      } catch (error) {
          //           if(error.message == 'Network request failed') 
          //           {
          //                Alert.alert('Conexión', 'Direccion/Url invalida');
          //           }
          //      }
          // }

          // NetInfo.fetch().then(state => {
          //      if ( state.isConnected )
          //      {
          //           sendRequest();
          //      }
          //      else
          //      {
          //           Alert.alert('Conexión', 'Asegurese de que su dispositivo tenga acceso a internet.');
          //      }
          // });
          
     }, [isUpdate]);

     useEffect(() => {
          const getPermissions = async () => {
               try {
                    const andoidContactReadPermission = await PermissionsAndroid.request(
                         PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                         {
                              title: "Permisos",
                              message:
                                   "Permitir ver tus contactos.",
                              buttonNegative: "Rechazar",
                              buttonPositive: "Permitir"
                         }
                    );

                    const andoidContactWritePermission = await PermissionsAndroid.request(
                         PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
                         {
                              title: "Permisos",
                              message:
                                   "Permitir editar tus contactos.",
                              buttonNegative: "Rechazar",
                              buttonPositive: "Permitir"
                         }
                    );

                    if(andoidContactReadPermission === PermissionsAndroid.RESULTS.GRANTED && andoidContactWritePermission === PermissionsAndroid.RESULTS.GRANTED) {

                         Contacts.getAll().then(contacts => {
                              contacts.map(item => {
                                   if(item.displayName && item.displayName.includes('CONTRATO') || (item.company != '' && item.company.includes('REWRITE'))) 
                                   {
                                        Contacts.deleteContact(item);
                                   }
                              });
                         });

                         jsonResponse.map( jsonItems => {
                              Contacts.addContact(jsonItems)
                         });
                    } 

               } catch (err) 
               {
                    console.log(err);
               }
          }

          getPermissions();
          
     }, [jsonResponse]);
     
     useEffect(() => {

          const storeUrl = async() => {
               try {
                    await AsyncStorage.setItem('urlText', urlText ?? '')
               } catch (error) {
                    console.log(error)
               }
          }

          if(urlText != '' && urlText)
          {
               setDisableSubmit(false)
          }
          else
          {
               setDisableSubmit(true)
          }

          storeUrl();

     }, [urlText]);

     useEffect(() => {

          const sotrageUsername = async () => {
               try {
                    await AsyncStorage.setItem('username', username ?? '')
               } catch (error) {
                    console.log(error)
               }
          }

          sotrageUsername();

     }, [username]);
     

     return (
          <ScrollView style={Styles.form}>
               <View>
                    <Text style={Styles.texColor}>Usuario</Text>
                    <TextInput
                         ref={usernameRef}
                         defaultValue={ username != "" ? username : null}
                         style={Styles.input}
                         placeholder={'Usuario'}
                         placeholderTextColor="#a3a3a3" 
                         onFocus={ updateInputsProps }
                         onBlur={ updateInputsProps }
                         onChangeText={text => setUsername(text)}
                    />
               </View>
               <View style={Styles.view}>
                    <Text style={Styles.texColor}>Ingrese URL</Text>
                    <TextInput
                         ref={textInputRef}
                         defaultValue={ urlText != "" ? urlText : null}
                         style={Styles.input}
                         placeholder={'www.example.com'}
                         placeholderTextColor="#a3a3a3" 
                         onFocus={ updateInputsProps }
                         onBlur={ updateInputsProps }
                         onChangeText={ text => setUrlText(text) }
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