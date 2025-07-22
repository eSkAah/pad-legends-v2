import { toast } from 'sonner';

interface ToastOptions {
  duration?: number;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

export const useToast = () => {
  const showSuccess = (message: string, options?: ToastOptions) => {
    toast.success(message, {
      duration: options?.duration || 4000,
      position: options?.position || 'top-right',
      style: {
        background: 'var(--color-navy-800)',
        border: '1px solid var(--color-green-500)',
        color: 'white',
        borderRadius: '16px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
    });
  };

  const showError = (message: string, options?: ToastOptions) => {
    toast.error(message, {
      duration: options?.duration || 6000,
      position: options?.position || 'top-right',
      style: {
        background: 'var(--color-navy-800)',
        border: '1px solid #ef4444',
        color: 'white',
        borderRadius: '16px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
    });
  };

  const showWarning = (message: string, options?: ToastOptions) => {
    toast.warning(message, {
      duration: options?.duration || 5000,
      position: options?.position || 'top-right',
      style: {
        background: 'var(--color-navy-800)',
        border: '1px solid var(--color-amber-400)',
        color: 'white',
        borderRadius: '16px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
    });
  };

  const showInfo = (message: string, options?: ToastOptions) => {
    toast.info(message, {
      duration: options?.duration || 4000,
      position: options?.position || 'top-right',
      style: {
        background: 'var(--color-navy-800)',
        border: '1px solid #3b82f6',
        color: 'white',
        borderRadius: '16px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
    });
  };

  const showLoading = (message: string, options?: ToastOptions) => {
    return toast.loading(message, {
      duration: options?.duration || Infinity,
      position: options?.position || 'top-right',
      style: {
        background: 'var(--color-navy-800)',
        border: '1px solid var(--color-amber-400)',
        color: 'white',
        borderRadius: '16px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
    });
  };

  const dismiss = (toastId?: string | number) => {
    toast.dismiss(toastId);
  };

  const dismissAll = () => {
    toast.dismiss();
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showLoading,
    dismiss,
    dismissAll,
  };
};

// Helper function to handle API errors consistently
export const handleApiError = (error: unknown, showError: (message: string) => void) => {
  let message = 'Une erreur inattendue est survenue';
  
  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === 'string') {
    message = error;
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = (error as { message: string }).message;
  }
  
  showError(message);
};