import React from 'react';
import './styles/App.css';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <Layout>
      <div className="App">
        <h1>Welcome to React Demo</h1>
        <p>This is the content area. Select a menu item from the left to get started.</p>
      </div>
    </Layout>
  );
}

export default App;
