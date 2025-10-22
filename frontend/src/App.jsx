import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Feed from './components/Feed';
import CreatePost from './components/CreatePost';
import Navbar from './components/Navbar';
import WalletConnect from './components/WalletConnect';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App error:', error, errorInfo); // Keep for debugging
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please refresh.</h1>;
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <WalletConnect />
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/create" element={<CreatePost />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
