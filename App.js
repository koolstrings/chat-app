import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { send, subscribe } from 'react-native-training-chat-server';
import Header from './header'

const NAME = 'Pawan';
const CHANNEL = 'channel_1';

export default class App extends React.Component {
  state= {
    typing: "",
    messages: []
  }
  renderItem({item}){
    return(
      <View style={styles.row}>
        <Text style={styles.sender}>{item.sender}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    )
  }
  componentDidMount(){
      subscribe(CHANNEL, messages => {
        this.setState({messages})
      })
  }
  render(){
    return (
      <View style={styles.container}>
        <Header title='Chatterbox'/>
        <FlatList
          data = {this.state.messages}
          renderItem = {this.renderItem}
          inverted
        />
        <View style={styles.footer}>
          <TextInput
            value={this.state.typing}
            onChangeText={text => this.setState({typing: text})}
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Type something nice"
          />
          <TouchableOpacity onPress={this.sendMessage.bind(this)}>
            <Text style={styles.send}>send</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  sendMessage(){
    this.setState({
      typing: ''
    })
    send({
      channel: CHANNEL,
      sender: NAME,
      message: this.state.typing
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  message: {
    fontSize: 18,
  },
  sender: {
    fontWeight: 'bold',
    paddingRight: 10,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: '#eee',
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 18,
    flex: 1,
  },
  send: {
    alignSelf: 'center',
    color: 'lightseagreen',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 20,
  },
});
