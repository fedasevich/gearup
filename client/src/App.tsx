import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './components/AppRouter';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/toaster';

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Header />
        <AppRouter />
        <Footer />
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  );
}
