import React from 'react';

import { BaseLayout } from '@/ui/layout/layout';
import { useNavigate } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/ui/components/dialog';
import { useAsyncFn } from 'react-use';

import { cn } from '@/ui/style-utils';
import PinField from 'react-pin-field';

import { USER_ID } from '@/lib/app/session';
import { toast } from 'sonner';
import Cookies from 'universal-cookie';

export const NewUserFormSchema = z.object({
  nickname: z.string().min(3, 'Make sure to include atleast 3 characters'),
  name: z.string().min(3, 'You need to type something my friend'),
  pin: z.string().length(4, 'Must be exactly 4 characters'),
});

type NewUserFormSchema = z.infer<typeof NewUserFormSchema>;

export default function WelcomePage() {
  const navigate = useNavigate();

  const form = useForm<NewUserFormSchema>({
    defaultValues: {
      nickname: '',
    },
    resolver: zodResolver(NewUserFormSchema),
  });

  // TODO: change back to false
  const [showMore, setShowMore] = React.useState(false);
  const [v, onShowMore] = useAsyncFn(async () => {
    if (!(await form.trigger('nickname'))) {
      // has a problem
      return;
    }
    const searchParams = new URLSearchParams({ username: form.getValues('nickname') });
    const url = new URL('/user?' + searchParams.toString(), import.meta.env.VITE_APP_URL);
    // ...
    const res = await fetch(url.toString(), {
      method: 'GET',
    });

    switch (res.status) {
      case 404: {
        // this is a new user
        setShowMore(true);
        break;
      }
      case 200: {
        const vals = await res.json();
        // this user exists
        const cookies = new Cookies();
        cookies.set(
          USER_ID,
          JSON.stringify({
            name: vals.name,
            nickname: vals.nickname,
          }),
          {
            secure: false,
            domain: window.location.hostname,
            maxAge: 60 * 60 * 10,
            path: '/',
            httpOnly: false,
            sameSite: 'strict',
          }
        );
        navigate('/');
        break;
      }
      default: {
        // some other problem
        const out = await res.json();
        form.setError('nickname', {
          message: out.message ?? 'Unable to process your request... please try again later',
        });
      }
    }
  });

  const [sv, onSignUp] = useAsyncFn(
    form.handleSubmit(async (vals) => {
      const res = await fetch(`${import.meta.env.VITE_APP_URL}/set-user`, {
        body: {
          name: vals.name,
          nickname: vals.nickname,
          pin: vals.pin,
        },
        method: 'POST',
      });

      if (res.status === 201) {
        // created, save to cookie + send to lobby
        const cookies = new Cookies();
        cookies.set(
          USER_ID,
          {
            name: vals.name,
            uid: vals.nickname,
          },
          {
            // TODO: change this.
            httpOnly: true,
            sameSite: true,
          }
        );
        navigate('/');
      } else {
        // failed to create you.
        toast.error('Failed to create your identity. try again later');
      }
    })
  );

  return (
    <BaseLayout className="flex flex-col items-center justify-center rounded-md border border-gray-100 bg-white drop-shadow-sm">
      <div className="max-w-md space-y-4 text-center">
        <h2 className="text-3xl font-bold">Welcome to the ChatterBox</h2>
        <p className="text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec ultrices nisi, vel
          tempus felis. Nullam bibendum pulvinar mauris sed commod
        </p>
        <div className="flex flex-row items-center justify-center gap-4">
          <Controller
            name="nickname"
            control={form.control}
            render={({ field, fieldState }) => {
              return (
                <div className="flex w-full flex-col items-start gap-0.5">
                  <input
                    type="text"
                    id="nickname"
                    {...field}
                    className="block w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Enter your prefered nickname"
                  />
                  {fieldState.error && (
                    <p className="text-xs text-red-700">{fieldState.error.message}</p>
                  )}
                </div>
              );
            }}
          />
          <Dialog open={showMore} onOpenChange={setShowMore} modal>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>First Time?</DialogTitle>
                <DialogDescription className="text-gray-500">
                  This seems like first time we are seeing a '{form.getValues('nickname')}'. If not
                  you, refresh this page?
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 grid gap-4">
                <div className="space-y-2">
                  <p className="text-muted-foreground text-sm">Sign up with these details kidogo</p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label htmlFor="width">Name</label>
                    <Controller
                      control={form.control}
                      name="name"
                      render={function ({ field, fieldState }) {
                        return (
                          <div className="col-span-2">
                            <input
                              id="width"
                              defaultValue=""
                              {...field}
                              className="col-span-2 h-8 rounded-md border border-gray-400"
                            />
                            {fieldState.error && (
                              <p className="text-xs text-red-600">{fieldState.error?.message}</p>
                            )}
                          </div>
                        );
                      }}
                    />
                  </div>
                  {/* <div className="grid grid-cols-3 items-center gap-4">
                    <label htmlFor="width">Fake NIDA</label>
                    <input
                      id="width"
                      defaultValue=""
                      className="col-span-2 h-8 rounded-md border border-gray-400"
                    />
                  </div> */}
                  <Controller
                    control={form.control}
                    name="pin"
                    render={({ field, fieldState }) => {
                      return (
                        <div className="grid grid-cols-3 items-center gap-4">
                          <label htmlFor={'passcode'}>Passcode</label>
                          <div className="col-span-1">
                            <div className="grid grid-cols-4">
                              <PinField
                                id="passcode"
                                length={4}
                                onChange={field.onChange}
                                className={cn(
                                  'border-r-0 border-gray-400 first:rounded-l-md last:rounded-r-md last-of-type:border-r'
                                )}
                              />
                            </div>
                            {fieldState.error && (
                              <p className="text-xs text-red-600">{fieldState.error?.message}</p>
                            )}
                          </div>
                        </div>
                      );
                    }}
                  />
                </div>
                <div className="flex flex-row-reverse">
                  <button
                    type="button"
                    disabled={sv.loading}
                    onClick={onSignUp}
                    // onClick={() => navigate('/')}
                    className="rounded-full bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Finish Up!
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <button
            type="button"
            disabled={v.loading}
            onClick={onShowMore}
            // onClick={() => navigate('/')}
            className="rounded-full bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Continue
          </button>
        </div>
      </div>
    </BaseLayout>
  );
}
