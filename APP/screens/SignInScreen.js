import React from 'react';

import {
    Alert,
    AsyncStorage,
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';

export default class SignInScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = { email: '', password: '' };
    }

    render() {
        return (
            <View>
                {/* Email */}
                <Text>Email</Text>
                <View>
                    <TextInput
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email}
                        keyboardType="email-address"
                        placeholder="barry@beemail.com"
                        placeholderTextColor="#a2a2a2"
                    />
                </View>
                {/***/}

                {/* Password */}
                <Text>Password</Text>
                <View>
                    <TextInput
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                        placeholder="******"
                        placeholderTextColor="#b2b2b2"
                        secureTextEntry={true}
                    />
                </View>
                {/***/}

                {/* Signin Button */}
                <TouchableOpacity>
                    <Text>Sign in</Text>
                </TouchableOpacity>
            </View>
        );
    }
}