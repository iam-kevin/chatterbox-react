import { cn } from '../style-utils';

export const Chat = function () {};

Chat.TextDialogView = function (props: { className?: string }) {
  return <div className={cn('', props.className)}></div>;
};

Chat.TextInput = function (props: { className?: string }) {
  return <div className={cn('', props.className)}></div>;
};
