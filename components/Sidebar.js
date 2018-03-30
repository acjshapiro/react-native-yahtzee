import React from 'react';
import { withRouter } from 'react-router-native';
import { Text, Platform, Dimensions, StyleSheet } from 'react-native';
import { List, ListItem } from 'native-base';
import { connect } from 'react-redux';
import {logout} from '../actions/auth';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const navs = [
 
]

const loggedInNavs = [
  { name: 'Yahtzee', path: '/' },
  { name: 'Scores', path: '/scores' }
]

const loggedOutNavs = [
  { name: 'Login', path: '/login' },
  { name: 'Register', path: '/register' }
]
const navigate = (close, history, path) => {
  close();
  history.push(path);
}

const Sidebar = ({close, history, isAuthenticated, dispatch, user}) => {
  let visibleNavs = isAuthenticated ? [...navs, ...loggedInNavs] : [...loggedOutNavs, ...navs] 
  return(
    <List style={styles.drawer}>
    { visibleNavs.map( (nav, i) => {
      return(
        <ListItem key={i}>
          <Text
            onPress={() => navigate(close, history, nav.path)}
            style={styles.text}
          >
            {nav.name} 
          </Text>
        </ListItem>  
      )
    })
    }
    { !isAuthenticated ? null : 
      <ListItem>
        <Text
          style={styles.text}
          onPress={ () => {
            dispatch(logout(user))
            history.push('/login')
            }}
        >
        logout
        </Text>
      </ListItem>
    }      
    </List>
  )  
}

const styles = StyleSheet.create({
  drawer: {
    height: deviceHeight / 3.5,
    width: deviceWidth / 1.4,
    marginBottom: 10,
  },
  text: {
    fontWeight: (Platform.os === 'ios') ? '700' : '600',
    fontSize: 16,
  },
})

const mapStateToProps = (state) => {
  let isAuthenticated = Object.keys(state.user).length ? true : false
  return { isAuthenticated, user: state.user }
}

export default withRouter(connect(mapStateToProps)(Sidebar));