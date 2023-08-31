import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home from '../views/home';

const TopLink = createMaterialTopTabNavigator();

const NavigateUrl = () => {

    return (
        <NavigationContainer>
            <TopLink.Navigator initialRoute="Inicio" 
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
                        component={Home}
                        options={{ tabBarLabel: 'Inicio' }}
                    />
            </TopLink.Navigator>
            
        </NavigationContainer>
    );
}

export default NavigateUrl;