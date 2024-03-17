import { create } from 'zustand';

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthdate: {
    day: string;
    month: string;
    year: string;
  };
  nationality: string;
};

type FormStore = {
  formState: FormState;
  highlighted: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (value: string, key: keyof FormState['birthdate']) => void;
};

const useFormStore = create<FormStore>(set => ({
  formState: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthdate: {
      day: '',
      month: '',
      year: '',
    },
    nationality: '',
  },
  highlighted: '',
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) =>
    set((state) => ({
      formState: {
        ...state.formState,
        [e.target.name]: e.target.value,
      },
    })),
  handleDateChange: (value: string, key: keyof FormState['birthdate']) =>
    set((state) => ({
      formState: {
        ...state.formState,
        birthdate: {
          ...state.formState.birthdate,
          [key]: value,
        },
      },
    })),
}));

export default useFormStore;
