import React from 'react';

export class ErrorBoundary extends React.Component<{ showDetails: boolean }> {
    state: { error: Error | null, errorInfo: { componentStack: any } | null };

    constructor(props: { showDetails: boolean }) {
      super(props);
      this.state = { error: null, errorInfo: null };
    }
    
    componentDidCatch(error: Error, errorInfo: { componentStack: any }) {
      // Catch errors in any components below and re-render with error message
      this.setState({
        error: error,
        errorInfo: errorInfo
      })
      // You can also log error messages to an error reporting service here
    }
    
    render() {
      if (this.state.errorInfo) {
        if (this.props.showDetails) {
          return (
            <div>
              <h2>Something went wrong.</h2>
              <details style={{ whiteSpace: 'pre-wrap' }}>
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo.componentStack}
              </details>
              <a href="./">Please refresh the page</a>
            </div>
          );
        }
        else {
          return (<div>
              <h2>Something went wrong.</h2>
              <a href="./">Please refresh the page</a>
            </div>);
        }
      }
      // Normally, just render children
      return this.props.children;
    }  
  }