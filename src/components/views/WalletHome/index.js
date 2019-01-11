import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  TextInput,
  Button,
  View,
  Dimensions,
  AsyncStorage,
  TouchableHighlight
} from 'react-native';
import { Wallet as WalletUtils } from '@common/utils';
import { Wallets as WalletsActions } from '@common/actions';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 4.778 / 10.417);
const imageWidth = dimensions.width;

const styles = StyleSheet.create({
    container: {
    },
    cover: {
        width: imageWidth,
        height: imageHeight
    }
});

export class WalletHome extends Component {

    render() {

        return (
            <View>
            <Image
                style={styles.cover}
                source={require('./userid.png')}
            />
            </View>
        )
    }



}