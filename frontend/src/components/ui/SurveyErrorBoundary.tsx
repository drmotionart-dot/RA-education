import { Component, type ReactNode } from 'react';
import { Button } from './Button';

interface Props { children: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export class SurveyErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto max-w-lg space-y-4 py-12 text-center">
          <h2 className="font-heading text-xl font-bold">Something went wrong</h2>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <div className="flex justify-center gap-2">
            <Button onClick={() => window.location.reload()}>Try Again</Button>
            <Button variant="ghost" onClick={() => window.location.href = '/survey'}>
              Back to Survey
            </Button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
