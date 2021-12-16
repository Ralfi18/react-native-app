// In App.js in a new project

import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
        </View>
    );
}

function DetailsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>

            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
}

function HeaderComponent({navigation, route}) {
    console.log(route.name)
    return (
        <>
           <Button
              onPress={() => navigation.navigate('Home')}
              title="Home"
              color="#ccc"
            />
            <Button
              onPress={() => navigation.navigate('Details')}
              title="Info"
              color="#ccc"
            />
        </>
    );
} 

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={({navigation, route})=>({ 
                    title: 'Home',
                    headerStyle: {
                        backgroundColor: '#f4511e',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerRight: props => <HeaderComponent navigation={navigation} route={route} />
                })} />
                <Stack.Screen name="Details" component={DetailsScreen} initialParams={{ itemId: 42 }} options={({navigation, route})=>({ 
                    title: 'About',
                    headerStyle: {
                        backgroundColor: '#f4511e',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerRight: props => <HeaderComponent navigation={navigation} route={route} />
                })} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;