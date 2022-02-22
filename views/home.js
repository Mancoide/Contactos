import React, {useRef, useCallback, useState, useEffect} from 'react';
import { 
     View,
     ScrollView, 
     TextInput, 
     Text,
     Alert,
     PermissionsAndroid 
} from 'react-native';
import { Button, Box, NativeBaseProvider } from 'native-base';
import Styles from '../css/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import Contacts from 'react-native-contacts';
import ModalSubmit from '../components/modal';

const home = () => {

     const [modalVisible, setModalVisible] = useState(false);
     const [modalText, setModalText]    = useState('');
     const usernameRef = useRef();
     const [disableSubmit, setDisableSubmit] = useState(true);
     const [username, setUsername] = useState();
     const [jsonResponse, setJsonResponse] = useState();
     const [permissions, setPermissions] = useState({
          read_contacts: "",
          write_contacts: ""
     });

     const updateInputsProps = useCallback(() => {

          if(usernameRef.current.isFocused()) 
          {
               usernameRef.current.setNativeProps({ style: {borderColor: '#0891b2'} })
          } else 
          {
               usernameRef.current.setNativeProps({ style: {borderColor: '#737373'} })
          }
     }, []);

     const requestPermissions = async () => {
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

          setPermissions({
               read_contacts: andoidContactReadPermission,
               write_contacts: andoidContactWritePermission
          });
     }
     requestPermissions();

     const submitSync = () => {
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
     }

     const sendRequest = async () => {
          try {
               setModalVisible(true);
               setModalText('Enviando Solicitud');
               const response = await fetch('https://test-sistema.grupoepem.com.py/api/get-contacts', {
                    method: 'POST',
                    headers: {
                         Accept: 'application/json',
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                         username: username
                    }),
               });
               const json = await response.json();
               const array = Object.values( json );

               setJsonResponse(array);

          } catch (error) {

               if(error.message == 'Network request failed') 
               {
                    Alert.alert('Conexión', 'Direccion/Url invalida');
               }

               setModalVisible(false);
               setModalText('');
          }
     }

     useEffect(() => {
          const getUsername = async () => {
               try {
                   const usernameStorage = await AsyncStorage.getItem('username')

                   usernameStorage != "" ? setUsername(usernameStorage) : '';

               } catch (error) {
                   console.log(error)
               }
          }
   
          getUsername();
     }, []);

     useEffect(() => {
          const getPermissions = async () => {
               try {
                    if(permissions.read_contacts === PermissionsAndroid.RESULTS.GRANTED && permissions.write_contacts === PermissionsAndroid.RESULTS.GRANTED) 
                    {
                         setModalText('Eliminando contactos');
                         await Contacts.getAll().then(contacts => {
                              contacts.map(item => {
                                   if(item.displayName && item.displayName.includes('CONTRATO') || (item.company != '' && item.company.includes('REWRITE'))) 
                                   {
                                        Contacts.deleteContact(item);
                                   }
                              });
                         });

                         setModalText('Sincronizando contactos');
                         await jsonResponse.map( jsonItems => {
                              try {
                                   Contacts.addContact(jsonItems);
                              } catch (error) {
                                   setModalVisible(false);
                                   setModalText('');
     
                                   Alert.alert('', 'Hubo un inconveniente al sincronizar los contactos.');
                              }
                         });
     
                         setModalVisible(false);
                         setModalText('');
     
                         Alert.alert('', 'Sincronizacion de contactos Exitosa.');
                    } 
                    else
                    {
                         setModalVisible(false);
                         setModalText('');
                         Alert.alert('', 'No se han podido sincronizar los contactos, favor revise los permisos.')
                    }
     
               } catch (err) 
               {
                    setModalVisible(false);
                    setModalText('');
                    Alert.alert('', 'No se han podido sincronizar los contactos.')
               }
          }

          if(typeof jsonResponse !== 'undefined')
          {
               getPermissions();
          }
     }, [jsonResponse])

     useEffect(() => {

          const sotrageUsername = async () => {
               try {
                    await AsyncStorage.setItem('username', username ?? '')
               } catch (error) {
                    console.log(error)
               }
          }

          if(username != '' && username)
          {
               setDisableSubmit(false)
          }
          else
          {
               setDisableSubmit(true)
          }

          sotrageUsername();

     }, [username]);

     return (
          <ScrollView style={Styles.form}>
               <View>
                    <TextInput
                         ref={usernameRef}
                         defaultValue={ username != "" ? username : null}
                         style={Styles.input}
                         placeholder={'Usuario'}
                         placeholderTextColor="#a3a3a3" 
                         onFocus={ updateInputsProps }
                         onBlur={ updateInputsProps }
                         onChangeText={ text => setUsername(text)}
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
               <ModalSubmit modalVisible={modalVisible}  modalText={modalText} />
          </ScrollView>
     );
};

export default home;