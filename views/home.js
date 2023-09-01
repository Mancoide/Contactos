import React, {useRef, useCallback, useState, useEffect} from 'react';
import { 
     View,
     ScrollView, 
     TextInput, 
     Alert,
     PermissionsAndroid 
} from 'react-native';
import { Button, Box, NativeBaseProvider } from 'native-base';
import Styles from '../css/styles';
import NetInfo from "@react-native-community/netinfo";
import Contacts from 'react-native-contacts';
import ModalSubmit from '../components/modal';
import DeviceInfo from 'react-native-device-info';

const Home = () => {

     const [modalVisible, setModalVisible] = useState(false);
     const [modalText, setModalText]    = useState('');
     const usernameRef = useRef();
     const [disableSubmit, setDisableSubmit] = useState(true);
     const [username, setUsername] = useState();
     const [permissions, setPermissions] = useState({
          read_contacts: "",
          write_contacts: ""
     });
     
     const handleChangeUserName = async (textInput) => {
          setDisableSubmit(!(textInput != '' && textInput))
          setUsername(textInput)
     }

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
               const response = await fetch('https://sistema.grupoepem.com.py/api/get-contacts', {
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

               const arrayResponse = Object.values(json);
               handleReceivedInformation(arrayResponse);

          } catch (error) {

               if(error.message == 'Network request failed') 
               {
                    Alert.alert('Conexión', 'Direccion/Url invalida');
               }

               setModalVisible(false);
               setModalText('');
          }
     }

     const handleReceivedInformation = async (arrayResponse) => {

          try {
               if(permissions.read_contacts === PermissionsAndroid.RESULTS.GRANTED && permissions.write_contacts === PermissionsAndroid.RESULTS.GRANTED) 
               {
                    let quantityContacts = 0;

                    setModalText(`Sincronizando ${arrayResponse.length} contactos`);
                    await Contacts.getAllWithoutPhotos().then((contacts) => {

                         contacts.filter((contact) => 
                              contact.displayName && contact.displayName.includes('CONTRATO')   ||
                              contact.familyName && contact.familyName.includes('CONTRATO')     ||
                              contact.givenName && contact.givenName.includes('CONTRATO')       ||
                              contact.company != '' && contact.company.includes('REWRITE')
                         ).map(item => {
                              Contacts.deleteContact({recordID: item.recordID})
                         })

                    });

                    let androidVersion = DeviceInfo.getSystemVersion();

                    await arrayResponse.map( jsonItems => {
                         try {
                              let itemToStore = jsonItems;

                              if(androidVersion > 8 && !itemToStore.displayName) 
                              {
                                   itemToStore = {
                                        ...itemToStore,
                                        displayName: itemToStore.givenName
                                   }
                              }

                              Contacts.addContact(itemToStore);

                              quantityContacts = quantityContacts + 1;

                         } catch (error) {
                              setModalVisible(false);
                              setModalText('');

                              Alert.alert('', 'Hubo un inconveniente al sincronizar los contactos.');
                         }
                    });

                    setModalVisible(false);
                    setModalText('');

                    Alert.alert('', `Se agregaron ${quantityContacts} contactos.`);
               } 
               else
               {
                    setModalVisible(false);
                    setModalText('');
                    Alert.alert('', 'No se han podido sincronizar los contactos, favor revise los permisos.')
                    requestPermissions();
               }

          } catch (err) 
          {
               setModalVisible(false);
               setModalText('');
               Alert.alert('', 'No se han podido sincronizar los contactos.')
          }
     }


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
                         onChangeText={ (text) => handleChangeUserName(text)}
                    />
               </View>
               <View style={Styles.view}>
                    <NativeBaseProvider isSSR={false}>
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

export default Home;