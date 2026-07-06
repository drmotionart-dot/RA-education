import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export function AppLayout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-5xl lg:max-w-6xl xl:max-w-7xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
