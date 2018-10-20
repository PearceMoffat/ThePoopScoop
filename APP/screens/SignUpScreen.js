import React from 'react';

import {
    Alert,
    AsyncStorage,
    DatePickerIOS,
    View,
    Linking,
    Text,
    TextInput,
    TouchableOpacity,
    Switch,
    Platform,
    DatePickerAndroid
} from 'react-native';

export default class SignUpScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            displayName: '',
            agree: false
        };
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
                        placeholderTextColor="#b2b2b2"
                    />
                </View>
                {/***/}

                {/* Display Name */}
                <Text>Display Name</Text>
                <View>
                    <TextInput
                        onChangeText={(username) => this.setState({ username })}
                        value={this.state.username}
                        placeholder="barry_bee"
                        placeholderTextColor="#b2b2b2"
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

               
                {/* Terms agreement */}
                <View>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text>I've read and agree to the </Text><Text style={{ color: 'blue', fontSize: 16, textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://bee.kn/terms')}>Terms of Service</Text>
                    </View>
                    <TouchableOpacity style={{ width: 30, height: 30, borderWidth: 3 }}
                        onPress={() => this.setState({ agree: !this.state.agree })}>
                        {this.state.agree &&
                            <View style={{ position: 'absolute', top: -15, left: 8, width: 23, height: 36, borderBottomWidth: 5, borderRightWidth: 5, transform: [{ rotate: '45deg' }] }}></View>
                        }
                    </TouchableOpacity>
                </View>

                {/* Signup Button */}
                <TouchableOpacity onPress={this.checkValidity}>
                    <Text>Sign up</Text>
                </TouchableOpacity>
            </View>
        );
    }

    checkValidity = () => {

        var userObj = { username: this.state.username, email: this.state.email.toLowerCase() };

        return User
            .checkUniqueness(userObj)
            .then(results => {

                var cleared = true;
                var errorMsg = [];

                if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email))) {
                    cleared = false;
                    Alert.alert(
                        'Invalid Email',
                        'Please enter a valid email address',
                        [
                            { text: 'Close' }
                        ]
                    )
                }

                if (results.data === "email") {
                    cleared = false;
                    Alert.alert(
                        'Email Taken',
                        'Please enter a unique email',
                        [
                            { text: 'Close' }
                        ]
                    )
                }

                if (results.data === "username") {
                    cleared = false;
                    Alert.alert(
                        'Username Taken',
                        'Please enter a unique username',
                        [
                            { text: 'Close' }
                        ]
                    )
                }

                if (this.state.username.length < 2 || this.state.username.length > 16) {
                    cleared = false;
                    Alert.alert(
                        'Invalid Username',
                        'Username must be between 2 and 16 characters',
                        [
                            { text: 'Close' }
                        ]
                    )
                }

                if (! /^[a-zA-Z0-9_.]+$/.test(this.state.username)) {
                    cleared = false;
                    Alert.alert(
                        'Invalid Username',
                        'Usernames may only contains letters, numbers, periods, and/or underscores',
                        [
                            { text: 'Close' }
                        ]
                    )
                }

                if (this.state.username.toLowerCase() === 'admin') {
                    cleared = false;
                    Alert.alert(
                        'What do you think you\'re doing?',
                        'Nice try',
                        [
                            { text: 'Close' }
                        ]
                    )
                }

                if (this.state.displayName.length < 2 || this.state.displayName.length > 16) {
                    cleared = false;
                    Alert.alert(
                        'Invalid Name',
                        'Name must be between 2 and 16 characters',
                        [
                            { text: 'Close' }
                        ]
                    )
                }

                if (this.state.password.length < 6) {
                    cleared = false;
                    Alert.alert(
                        'Invalid Password',
                        'Password must be at least 6 characters',
                        [
                            { text: 'Close' }
                        ]
                    )
                }

                if (moment().subtract(18, 'years').isBefore(moment(this.state.birthday))) {
                    cleared = false;
                    Alert.alert(
                        'Invalid Birthday',
                        'You must be at least 18 years old',
                        [
                            { text: 'Close' }
                        ]
                    )
                }

                if (!this.state.agree) {
                    cleared = false;
                    Alert.alert(
                        'Error',
                        'You must agree to the Terms of Service',
                        [
                            { text: 'Close' }
                        ]
                    )
                }

                if (cleared) {
                    this.signUp(cleared);
                }
                return cleared;
            })
            .catch(err => { throw err });
    }

    signUp = (isValid) => {
        if (isValid) {
            AuthHandler
                .signUp({
                    email: this.state.email.toLowerCase(),
                    password: this.state.password,
                    username: this.state.username,
                    displayName: this.state.displayName,
                    birthday: this.state.birthday,
                    gender: this.state.gender,
                    pushToken: global.pushToken
                })
                .then(user => {
                    this._signInAsync(user.data.token);
                })
                .catch(err => { throw err });
        }
    }

    _signInAsync = async (token) => {
        AuthHandler
            .verifyToken(token)
            .then(res => {
                if (res.data.success) {
                    this.props.navigation.navigate('Main');
                    AsyncStorage.setItem('userToken', token);
                    AsyncStorage.setItem('userProfile', JSON.stringify(res.data.user));
                    global.userID = res.data.user._id;
                    global.following = [];
                    global.newNotify = 1;
                } else {
                    this.props.navigation.navigate('Auth');
                }
            })
            .catch(err => { throw err });
    }
}