import React, { useState } from 'react';
import { 
    TouchableHighlight,
    SafeAreaView, 
    StyleSheet, 
    StatusBar,
    Button, 
    Text, 
    View, 
    FlatList,
    TextInput
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-ionicons'
import { v4 as uuidv4 } from 'uuid';


const DATA = [
    // {
    //     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28baffff',
    //     title: 'First Item',
    //     opened: 0,
    // },
    // {
    //     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    //     title: 'Second Item',
    //     opened: 0,
    // },
    // {
    //     id: '58694a0f-3da1-471f-bd96-145571e29d72',
    //     title: 'Third Item',
    //     opened: 0,
    // },
    // {
    //     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    //     title: 'First Item',
    //     opened: 0,
    // },
    // {
    //     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63a-das',
    //     title: 'Second Item',
    //     opened: 0,
    // },
    // {
    //     id: '58694a0f-3da1-471f-bd96-145571e29d72sdsa',
    //     title: 'Third Item',
    //     opened: 0,
    // },
    // {
    //     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bagfd',
    //     title: 'First Item',
    //     opened: 0,
    // },
    // {
    //     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63hgf',
    //     title: 'Second Item',
    //     opened: 0,
    // },
    // {
    //     id: '58694a0f-3da1-471f-bd96-145571e29d72hgf',
    //     title: 'Third Item',
    //     opened: 0,
    // }
];

const Item = ({ item, handlePress }) => {
    const title = item.title;
    return <TouchableHighlight underlayColor="#f1f1f1" onPress={() => handlePress(item.id)}>
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
            <View style={{ height: item.opened == 1 ? 100:0, backgroundColor: "#fff", marginBottom: 10 }}>
                <Text>Some Text</Text>
            </View>
        </View>
    </TouchableHighlight>
};


function HomeScreen() {
  
    const [data, setData] = useState(DATA);
    const [text, onChangeText] = React.useState("");
    const handlePress = (key) => {
        const newData = data.slice();
        const index = newData.findIndex(item => item.id == key);
        if(newData[index]) {
            newData[index] = {...newData[index], opened: newData[index].opened == 1 ? 0:1};
            setData(newData);   
        }
    };
    const apiCall = (callback, data = {}, method = "POST", headers = {'Accept': 'application/json', 'Content-Type': 'application/json' }) => {
      return fetch('http://10.0.0.186/react-native/server.php', { 
                method, 
                headers, 
                body: JSON.stringify(data) 
            })
            .then((response) => response.json())
            .then((json) => callback(json))
            .catch((error) => {console.error(error);});
    }
    const handleAdd = (e) => {
        // alert(uuidv4())
        const newData = [...data, {id: "", title: "", opened: 0}] 
 
        apiCall((response) => { 
            console.log(response);
        }, { text });
        onChangeText("")

    }
    const renderItem = ({ item }) => <Item handlePress={handlePress} item={item} />;
    return (
        <SafeAreaView style={styles.container}>
            <View style={{flexDirection: "row", alignItems: "center", marginLeft: 10, marginRight: 10}}>  
                <View style={{flex: 0.8 }} >
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeText}
                        value={text}
                    />
                </View>
                <View style={{flex: 0.2, marginLeft: 5 }}>
                    <Button
                        onPress={ () => handleAdd() }
                        title="add"
                        color="#841584"
                    />
                </View>
            </View>
            <FlatList
                style={{ padding: 10 }}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
}

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}



const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        // padding: 10,
        // marginVertical: 8,
        // marginHorizontal: 6,
    },
    title: {
        backgroundColor: '#f9c2ff',
        fontSize: 32,
    },
    input: {
        height: 34,
        // margin: 12,
        borderWidth: 1,
        padding: 8,
    },
});

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        switch(route.name) {
                            case "Home":
                            iconName = "home"
                            break;
                            case "Settings":
                            iconName = "settings"
                            break;
                            default:
                            iconName = "home"
                            break;  
                        }
                        // You can return any co mponent that you like here!
                        return <Icon name={iconName} color={color} size={size}/>
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}