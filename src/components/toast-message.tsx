import React, { FC } from 'react';
import Toast, { BaseToast, BaseToastProps, ErrorToast } from 'react-native-toast-message';

type Props = { props: BaseToastProps };

const toastConfig = {
  success: ({ props }: Props) => (
    <BaseToast {...props} style={{ top: 20, borderLeftColor: 'green' }} />
  ),
  error: ({ props }: Props) => (
    <ErrorToast {...props} style={{ top: 20, borderLeftColor: 'red' }} />
  ),
};

const ToastMessage: FC = () => (
  <>
    <Toast config={toastConfig} />
  </>
);

export default ToastMessage;
