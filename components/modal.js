import React, {useState} from 'react';
import {
    Modal,
    Text, 
    View,
    ActivityIndicator,
    StyleSheet
} from 'react-native';
import Styles from '../css/styles';

const ModalSubmit = ({modalVisible, modalText}) => {

    return (
        <View style={Styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                statusBarTranslucent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={Styles.centeredView}>
                    <View style={Styles.modalView}>
                        <ActivityIndicator size="large" color="#0891b2" />
                        <Text style={Styles.texColor}>{modalText}</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default ModalSubmit;
