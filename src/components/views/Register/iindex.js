import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Button, Text, Icon } from 'native-base';

export class Register extends Component {
  render() {
    return (
      <Container>
        <Content style={styles.content}>
          <Form>
            <Item>
                <Icon active name='person' />
                <Input placeholder="First name" />
            </Item>
            <Item>
                <Icon active name='lock' />
                <Input placeholder="Last name" />
            </Item>
            <Item>
                <Icon active name='mail' />
                <Input placeholder="Email address" />
            </Item>
            <Item>
                <Icon active name='phone' />
                <Input placeholder="Telephone number" />
            </Item>
            <Item last>
                <Icon active name='heart' />
              <Input placeholder="NHS number" />
            </Item>
            <Button primary><Text> Sign me up! </Text></Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

var styles = StyleSheet.create({
    content:{
        backgroundColor:'#fff',
        paddingLeft:40,
        paddingRight:40,
    }
});