import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Styles from '../css/styles';

const Help = () => {
    return (
        <ScrollView style={Styles.form}>
            <View>
                <Text style={Styles.textTitle} >Sincronizar Contactos</Text>
            </View>
            <View style={Styles.view}>
                <Text style={Styles.textSubTitle}>¿Como sincronizar?</Text>
            </View>
            <View style={Styles.view}>
                <Text style={Styles.texColor}>
                    La Direccion de consulta, debe escribirse siempre con el metodo http:// o https:// seguido de la ruta api. www.example.com/api. {"\n\n"}
                </Text>
                <Text style={Styles.texColor}>
                    El formato esperado es el siguiente:
                </Text>
            </View>
            <View style={Styles.codeContent}>
                <Text style={Styles.textCode}>
                    {
                        `
                        recordID: '6b2237ee0df85980',
                        backTitle: '',
                        company: '',
                        emailAddresses: [{
                            label: 'work',
                            email: 'carl-jung@example.com',
                        }],
                        familyName: 'Jung',
                        givenName: 'Carl',
                        middleName: '',
                        jobTitle: '',
                        phoneNumbers: [{
                            label: 'mobile',
                            number: '(555) 555-5555',
                        }],
                        hasThumbnail: true,
                        thumbnailPath: 'content://com.android.contacts/display_photo/3',
                        postalAddresses: [{
                            label: 'home',
                            formattedAddress: '',
                            street: '123 Fake Street',
                            pobox: '',
                            neighborhood: '',
                            city: 'Sample City',
                            region: 'CA',
                            state: 'CA',
                            postCode: '90210',
                            country: 'USA',
                        }],
                        prefix: 'MR',
                        suffix: '',
                        department: '',
                        birthday: {'year': 1988, 'month': 1, 'day': 1 },
                        imAddresses: [
                            { username: '0123456789', service: 'ICQ'},
                            { username: 'johndoe123', service: 'Facebook'}
                        ]`
                    }
                </Text>
            </View>
        </ScrollView>
    );
};

export default Help;

