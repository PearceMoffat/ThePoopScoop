import React from 'react';

import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this._detectToken();
    }

    _detectToken = async () => {
        const userToken = await AsyncStorage.getItem('userToken');

        if (userToken) {
            AuthHandler
                .verifyToken(userToken)
                .then(res => {
                    if (res.data.success) {
                        global.userID = res.data.user._id;
                        User
                        .getProfile(global.userID)
                        .then(profile => {
                            global.following = profile.data.following;
                            let newNotify = 0;
                            for (let i = profile.data.notifications.length - 1; i >= 0; i--) {
                                if (profile.data.notifications[i].read)
                                    break;
                                newNotify++;
                            }
                            global.newNotify = newNotify;

                            AsyncStorage.setItem('userProfile', JSON.stringify(res.data.user));

                            if (global.userID) {
                                this.props.navigation.navigate('Main');
                            }
                        })
                        .catch(err => { throw err });
                    } else {
                        this._signOutAsync()
                    }
                })
                .catch(err => { this._signOutAsync() });
        } else {
            this._signOutAsync();
        }
    };

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };

    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}