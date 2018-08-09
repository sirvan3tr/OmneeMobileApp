import React from 'react';
import { } from 'react-native';
import { inject, observer } from 'mobx-react';


@inject('prices')
@observer
export default class WalletCard extends React.Component {