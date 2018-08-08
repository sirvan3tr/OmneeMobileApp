import React from 'react';
import autobind from 'autobind-decorator';
import {
    AsyncStorage,
    ActivityIndicator,
    FlatList,
    Text,
    RefreshControl,
    StyleSheet,
    View,
    Button,
    TextInput
} from 'react-native';
import { inject, observer } from 'mobx-react';
import { HeaderIcon } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { Wallets as WalletActions, Prices as PricesActions } from '@common/actions';
import NoWallets from './NoWallets';
import TotalBalance from './TotalBalance';
import WalletCard from './WalletCard';

@inject('prices', 'wallets')
@observer
export class WalletsOverview extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Overview',
        headerRight: (
            <HeaderIcon
                name='add'
                size='large'
                color={colors.white}
                onPress={() => navigation.navigate('NewWalletName')} />
        )
    });

    get loading() {
        return this.props.prices.loading || this.props.wallets.loading;
    }

    componentDidMount() {
        this.populate();
    }

    async populate() {
        try {
            await Promise.all([
                WalletActions.loadWallets(),
                PricesActions.getPrice()
            ]);
        } catch (e) {
            console.warn(e);
        }
    }

    @autobind
    onPressWallet(wallet) {
        if (this.loading) return;
        WalletActions.selectWallet(wallet);
        this.props.navigation.navigate('WalletDetails', { wallet });
    }

    renderItem = ({ item }) => <WalletCard wallet={item} onPress={() => this.onPressWallet(item)} />

    renderBody = (list) => (!list.length && !this.loading) ? <NoWallets /> : (
        <FlatList
            style={styles.content}
            data={list}
            refreshControl={<RefreshControl refreshing={this.loading} onRefresh={() => this.populate()} />}
            keyExtractor={(item, index) => String(index)}
            renderItem={this.renderItem} />
    );

    render() {
        var ws = new WebSocket("ws://10.0.2.2:5678/");
        ws.onopen = function() {
            console.log('Opened websocket');
        };
        AsyncStorage.getItem('userA', (err, result) => {
            console.log(result);
        });
        const { wallets } = this.props;
        return (
            <View style={styles.container}>
                <TotalBalance wallets={wallets.list} />
                {this.renderBody(wallets.list)}
                <Text style={{fontWeight: 'bold'}}>
                    I am bold wow
                    <Text style={{color: 'red'}}>
                    0x6fd8449df7a83c45a679003fc29f1ba2310a0bdc0171fd29b4b83487b4f97761
                    </Text>
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: measures.defaultPadding,
        alignItems: 'stretch',
        justifyContent: 'flex-start'
    },
    content: {
        marginTop: measures.defaultMargin
    }
});