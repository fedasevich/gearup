import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/libs/helpers/cn';
import { isErrorWithMessage } from '@/libs/helpers/isErrorWithMessage';
import { isFetchBaseQueryError } from '@/libs/helpers/isFetchBaseQueryError';
import { useAppDispatch, useAppSelector } from '@/libs/hooks/redux';
import { FetchError } from '@/store/api';
import { userApi } from '@/store/reducers/user/UserApi';
import { logOut, setCredentials } from '@/store/reducers/user/UserSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { Loader2, User, UserCog } from 'lucide-react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().required('Password is required')
});

interface FormData {
  email: string;
  password: string;
}

export function AuthPopover() {
  const [isLogin, setLogin] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  });
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userReducer.user);

  const [signIn, { isLoading: signInIsLoading }] = userApi.useSignInMutation();
  const [signUp, { isLoading: signUpIsLoading }] = userApi.useSignUpMutation();

  const toggleForm = () => {
    setLogin((prev) => !prev);
  };

  const handleLogin = async (formData: FormData) => {
    await signIn(formData)
      .unwrap()
      .then((data) => {
        dispatch(setCredentials(data));
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
      });
  };

  const handleRegistration = async (formData: FormData) => {
    await signUp(formData)
      .unwrap()
      .then((data) => {
        dispatch(setCredentials(data));
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
      });
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (isLogin) {
      return handleLogin(data);
    }
    return handleRegistration(data);
  };

  const handleLogoutClick = () => {
    dispatch(logOut());
  };

  const isLoading = signInIsLoading || signUpIsLoading;

  return (
    <>
      {user ? (
        <Popover>
          <PopoverTrigger asChild className="bg-transparent">
            <Button variant="ghost" size="icon" className=" bg-transparent">
              <UserCog size={24} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-4">
            <Button variant="outline" className="w-full">
              Переглянути білети
            </Button>
            <Separator className="my-1" />
            <Button variant="outline" className="w-full" onClick={handleLogoutClick}>
              Вийти з акаунта
            </Button>
          </PopoverContent>
        </Popover>
      ) : (
        <Popover>
          <PopoverTrigger asChild className="bg-transparent">
            <Button variant="ghost" size="icon" className=" bg-transparent">
              <User size={24} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <h4 className="text-xl font-medium">{isLogin ? 'Sign In' : 'Sign Up'}</h4>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-1">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="text" className="col-span-2 h-8" {...register('email')} />
                      {errors.email && <p className="col-span-3 text-sm text-red-500">{errors.email.message}</p>}
                    </div>
                    <div className="grid grid-cols-3 items-center gap-1">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" className="col-span-2 h-8" {...register('password')} />
                      {errors.password && <p className="col-span-3 text-sm text-red-500">{errors.password.message}</p>}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Button onClick={toggleForm} variant="link" className="p-0 text-xs">
                      {isLogin ? 'Switch to Sign Up' : 'Switch to Sign In'}
                    </Button>
                    <Button disabled={isLoading} type="submit" variant="secondary">
                      <Loader2 className={cn('mr-2 hidden h-4 w-4 animate-spin', isLoading && 'block')} />
                      {isLogin ? 'Sign In' : 'Sign Up'}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}
