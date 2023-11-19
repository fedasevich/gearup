import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './components/AppRouter';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { ThemeProvider } from './components/theme-provider';
import { isErrorWithMessage } from './libs/helpers/isErrorWithMessage';
import { isFetchBaseQueryError } from './libs/helpers/isFetchBaseQueryError';
import { useAppDispatch } from './libs/hooks/redux';
import { FetchError } from './store/api';
import { userApi } from './store/reducers/user/UserApi';
import { logOut, setCredentials } from './store/reducers/user/UserSlice';

export default function App() {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const token = localStorage.getItem('token') as string;

  const [loading, setLoading] = useState(true);
  const [check] = userApi.useLazyCheckQuery();

  useEffect(() => {
    if (!token) {
      return setLoading(false);
    }
    check()
      .unwrap()
      .then(({ token }) => {
        dispatch(
          setCredentials({
            token
          })
        );
      })
      .catch((error) => {
        if (isErrorWithMessage(error)) {
          toast({
            variant: 'destructive',
            title: 'Щось пішло не так',
            description: error.message
          });
        } else if (isFetchBaseQueryError(error)) {
          const errMsg = 'error' in error ? error.error : (error as FetchError).data.message;
          toast({
            variant: 'destructive',
            title: 'Щось пішло не так',
            description: errMsg
          });
        }
        dispatch(logOut());
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return null;
  }

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
