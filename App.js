/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  Image,
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

var MOCKED_MOVIES_DATA = [
  {title: 'Title', year: '2015', posters: {thumbnail: 'https://i.imgur.com/a5MK3cug.jpg'}},
];

var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';
export default class App extends Component<{}> {
  constructor(props) {
  	super(props);
  	this.state = {
  		dataSource: new ListView.DataSource({
  			rowHasChanged: (row1, row2) => row1 !== row2,
  		}),
  		loaded: false,
  	};
  }
  componentDidMount() {
  	this.fetchData();
  }
  fetchData() {
  	fetch(REQUEST_URL)
  		.then((response)  => response.json())
  		.then((responseData) => {
  			this.setState({
  				dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
  				loaded: true,
  			});
  		})
  		.done();
  }	
  render() {
  	if(!this.state.loaded) {
  		return this.renderLoadingView();
  	}

  	return (
  		<ListView
  		  dataSource={this.state.dataSource}
  		  renderRow={this.renderMovie}
  		  style={styles.listView}
  		/>
  	);
  }

  renderLoadingView() {
  	return (
  		<View style={styles.container}>
  			<Text>
  				Loading movies...
  			</Text>
  		</View>
  	);
  }

  renderMovie(movie) {
    return (
      <View style={styles.container}>
        <Image 
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
       	<View style={styles.rightContainer}>
      		<Text style={styles.title}>{movie.title}</Text>
      		<Text style={styles.year}>{movie.year}</Text>
      	</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
  	flex: 1,
  },
  thumbnail: {
  	width: 53,
  	height: 81,
  },
  title: {
  	fontSize: 20,
  	marginBottom: 8,
  	textAlign: 'center',
  },
  year: {
  	textAlign: 'center'
  },
  listView: {
  	paddingTop: 20,
  	backgroundColor: '#F5FCFF',
  },
});