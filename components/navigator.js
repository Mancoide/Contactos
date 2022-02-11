import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import home from '../views/home';
import config from '../views/config';
import help from '../views/help';

const TopLink = createMaterialTopTabNavigator();

const NavigateUrl = () => {

    return (
        <NavigationContainer>
            <TopLink.Navigator initialRouteName="Inicio" 
                screenOptions= {{
                    tabBarStyle: {
                        backgroundColor: '#0891b2',
                    },
                    tabBarLabelStyle: {
                        fontWeight: 'bold',
                    },
                    tabBarActiveTintColor: '#fff',
                    tabBarInactiveTintColor: '#e5e5e5'
            
                }}>
                    <TopLink.Screen 
                        name='Inicio'
                        component={home}
                        options={{ title: 'Inicio' }}
                    />
                    <TopLink.Screen 
                        name='Ayuda'
                        component={help}
                        options={{ title: 'Ayuda' }}
                    />
            </TopLink.Navigator>
            
        </NavigationContainer>
    );
}

export default NavigateUrl;