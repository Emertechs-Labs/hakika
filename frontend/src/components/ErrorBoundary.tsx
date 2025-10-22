import React from 'react';

interface State {
  hasError: boolean;
  error?: Error | null;
  info?: React.ErrorInfo | null;
}

export default class ErrorBoundary extends React.Component<React.PropsWithChildren<unknown>, State> {
  constructor(props: React.PropsWithChildren<unknown>) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error } as State;
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Unhandled error caught by ErrorBoundary:', error, info);
    this.setState({ error, info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 font-sans">
          <h1 className="text-red-600 text-2xl font-semibold">Application Error</h1>
          <p className="mt-3 text-base">An unexpected error occurred while rendering the application.</p>
          <pre className="mt-3 bg-slate-900 text-slate-50 p-3 rounded overflow-x-auto">
            {this.state.error?.stack || String(this.state.error)}
          </pre>
          <details className="mt-3">
            <summary className="cursor-pointer">More info</summary>
            <pre className="whitespace-pre-wrap">{JSON.stringify(this.state.info, null, 2)}</pre>
          </details>
        </div>
      );
    }

    return this.props.children as React.ReactElement | null;
  }
}
