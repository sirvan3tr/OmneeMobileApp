import React from 'react';
import { TabView } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { AlmasFFSProve, SendCoins, WalletExtract, WalletSettings, QRCodeScanner } from '../index';

export class WalletDetails extends React.Component {
    
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params.wallet.name
    });

    tabs = [
        { id: 'extract', label: 'Extract', icon: 'list', content: <WalletExtract {...this.props} /> },
        { id: 'almasffsauth', label: 'almasFFS Auth', icon: 'qrcode', type: 'fa', content: <AlmasFFSProve {...this.props} /> },
        { id: 'qrscanner', label: 'QR Scanner', icon: 'qrcode', type: 'mdc', content: <QRCodeScanner {...this.props} /> },
        //{ id: 'qrscanner', label: 'QR Scanner', icon: 'cube-send', type: 'mdc', content: <QRCodeScanner {...this.props} /> },
        { id: 'settings', label: 'Settings', icon: 'settings', content: <WalletSettings {...this.props} /> }
    ];

    render() {
        return <TabView tabs={this.tabs} />;
    }
}