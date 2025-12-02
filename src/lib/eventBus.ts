type Listener = (payload: any) => void;

const listeners = new Set<Listener>();

export const toastEventBus = {
  emit(payload: any) {
    listeners.forEach((listener) => listener(payload));
  },
  subscribe(listener: Listener) {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  },
};
