import { cn } from '@/ui/style-utils';
import React from 'react';

export const ChatLayout = function (props: { children: React.ReactNode; className?: string }) {
  return <div className={cn(props.className)}>{props.children}</div>;
};

ChatLayout.Main = function (props: { children: React.ReactNode; className?: string }) {
  return <div className={cn(props.className)}>{props.children}</div>;
};

ChatLayout.Aside = function (props: { children: React.ReactNode; className?: string }) {
  return <div className={cn('hidden', props.className)}>{props.children}</div>;
};
