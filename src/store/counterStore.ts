import { create } from 'zustand'

interface CounterState {
  value: number;
  increment: () => void;
  decrement: () => void;
  incrementByAmount: (amount: number) => void;
}

const useCounterStore = create<CounterState>((set) => ({
  value: 0,
  increment: () => set((state) => ({ value: state.value + 1 })),
  decrement: () => set((state) => ({ value: state.value - 1 })),
  incrementByAmount: (amount) => set((state) => ({ value: state.value + amount })),
}));

export default useCounterStore;
