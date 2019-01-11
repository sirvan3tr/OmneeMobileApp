import React from 'react';
import { TabView } from '@components/widgets';
import { colors, measures } from '@common/styles';
import { WalletHome, AlmasFFSProve, SendCoins, WalletExtract, WalletSettings, QRCodeScanner } from '../index';

export class WalletDetails extends React.Component {
    
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params.wallet.name
    });

    tabs = [
        { id: 'wallethome', label: 'Home', icon: 'list', content: <WalletHome {...this.props} /> },
        { id: 'almasffsauth', label: 'Identify', icon: 'qrcode', type: 'fa', content: <AlmasFFSProve {...this.props} /> },
        { id: 'extract', label: 'History', icon: 'list', content: <WalletExtract {...this.props} /> },
        { id: 'qrscanner', label: 'Payment', icon: 'qrcode', type: 'mdc', content: <QRCodeScanner {...this.props} /> },
        { id: 'qrscanner', label: 'Contacts', icon: 'cube-send', type: 'mdc', content: <QRCodeScanner {...this.props} /> },
        { id: 'settings', label: 'More', icon: 'settings', content: <WalletSettings {...this.props} /> }
    ];

    render() {
        return <TabView tabs={this.tabs} />;
    }
}