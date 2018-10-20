import React from 'react';

import {
    Alert,
    AsyncStorage,
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';

export default class SplashScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{backgroundColor: '#aaaaaa', padding: 25, flexGrow: 1}}>
                
                {/* Signin Button */}
                <TouchableOpacity onPress={() => this.props.navigation.navigate('SignIn')}>
                    <Text>Sign in</Text>
                </TouchableOpacity>

                {/* Signup Button */}
                <TouchableOpacity onPress={() => this.props.navigation.navigate('SignIn')}>
                    <Text>Sign up</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
