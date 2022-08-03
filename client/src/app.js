import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import SingleMemory from './pages/Memory'
import User from './pages/User';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container, Box, CssBaseline} from '@material-ui/core';

import useStyles from './styles';
const httpLink = createHttpLink({
  uri: '/graphql',
});


const authLink = setContext((_, { headers }) => {
  
  const token = localStorage.getItem('id_token');
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const classes = useStyles();
  return (
    <ApolloProvider client={client}>
     
      <Container maxWidth="lg" justifyContent="center">
      <Router>
        <div >
          <Header />
          <div >
            <Routes>
              <Route 
                path="/"
                element={<Home />}
              />
              <Route 
                path="/login" 
                element={<Login />}
              />
              <Route 
                path="/signup" 
                element={<Signup />}
              />
              <Route 
                path="/me" 
                element={<User />}
              />
              <Route 
                path="/user/:username" 
                element={<User />}
              />
              <Route 
                path="/memories/:memoryId" 
                element={<SingleMemory />}
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </Container>
  
    </ApolloProvider>
  );
}

export default App;
