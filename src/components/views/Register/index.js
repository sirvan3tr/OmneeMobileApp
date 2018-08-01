import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  AsyncStorage
} from 'react-native';
// Type 3: Persistent datastore with automatic loading

export class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
        myKey: null
    }




  }

  async getmong() {
      try {
        var Datastore = require('react-native-local-mongodb');
        var db = new Datastore({ filename: 'asyncStorageKey', autoload: true });
        // You can issue commands right away
    
        //var doc = { hello: 'world', n : "wow wow" };
        //console.log(doc);
        var person = {
            firstname : "Sirvan",
            surname : "Almasi",
            dob : "26/01/1992",
            placeOfBirth : "Saqqez",
            tel :
                [{
                    title : "Mobile main",
                    mobile : "07799006216"
                },
                {
                    title : "old mobile number",
                    mobile : "07799006216"
                }], 
            address :
                [{
                    homeNumber : "33C",
                    street : "Friars Place Lane",
                    town : "London",
                    postcode : "W3 7AQ",
                    country : "UK",
                    beginDate : "",
                    endDate : ""
                },{

                }],
            email :
                [{
                    title : "Personal one",
                    email : "Sirvan3tr@gmail.com"
                },
                {
                    title : "Warwick",
                    email : "mim14sa@mail.wbs.ac.uk"
                }]

        };

        console.log(person);
        
    
        db.find({ hello: 'world' }, function (err, docs) {
            // docs is an array containing documents Mars, Earth, Jupiter
            // If no document is found, docs is equal to []
            console.log(docs);
        });
      } catch (error) {

      }
  }
  async getKey() {
    try {
      const value = await AsyncStorage.getItem('@MySuperStore:key');
      this.setState({myKey: value});
    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  }

  async saveKey(value) {
    try {
      await AsyncStorage.setItem('ss', value);
      console.log(value);
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }

  async resetKey() {
    try {
      await AsyncStorage.removeItem('@MySuperStore:key');
      const value = await AsyncStorage.getItem('@MySuperStore:key');
      this.setState({myKey: value});
    } catch (error) {
      console.log("Error resetting data" + error);
    }
  }

  render() {



    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Demo AsyncStorage!
        </Text>

        <TextInput
          style={styles.formInput}
          placeholder="Enter key you want to save!"
          value={this.state.myKey}
          
          />
        <Button
          style={styles.formButton}
          onPress={this.getmong.bind(this)}
          title="Save Key"
          color="#2196f3"
          accessibilityLabel="Save Key"
        />
        <Button
          style={styles.formButton}
          onPress={this.getKey.bind(this)}
          title="Get Key"
          color="#2196f3"
          accessibilityLabel="Get Key"
        />

        <Button
          style={styles.formButton}
          onPress={this.resetKey.bind(this)}
          title="Reset"
          color="#f44336"
          accessibilityLabel="Reset"
        />

        <Text style={styles.instructions}>
          Stored key is = {this.state.myKey}
        </Text>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  formInput: {
    paddingLeft: 5,
    height: 50,
    borderWidth: 1,
    borderColor: "#555555",
  },
  formButton: {
    borderWidth: 1,
    borderColor: "#555555",
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    marginTop: 5,
  },
});

AppRegistry.registerComponent('Register', () => Register);