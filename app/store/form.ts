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
  setHighlighted: (value: string) => void;
  setFormField: (field: keyof FormState, value: string) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (value: string, key: keyof FormState['birthdate']) => void;
  setFormFieldTypewriting: (
    field: keyof FormState,
    value: string,
    speed?: number
  ) => { formState: FormState };
};

const useFormStore = create<FormStore>((set, get) => ({
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
  setHighlighted: (value: string) => set({ highlighted: value }),
  setFormField: (field, value) => {
    if (field.includes('.')) {
      const [field1, field2] = field.split('.');
      set((state) => ({
        highlighted: field1,
        formState: {
          ...state.formState,
          [field1 as keyof FormState]: {
            ...(state.formState[field1 as keyof FormState] as object),
            [field2]: value,
          },
        },
      }));
    } else {
      set((state) => ({
        formState: {
          ...state.formState,
          [field]: value,
        },
      }));
    }
  },
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
  setFormFieldTypewriting: (field, value, speed = 100) => {
    if (field.includes('.')) {
      const [field1, field2] = field.split('.');
      set((state) => ({
        highlighted: field1,
        formState: {
          ...state.formState,
          [field1 as keyof FormState]: {
            ...(state.formState[field1 as keyof FormState] as object),
            [field2]: value,
          },
        },
      }));
      return {
        formState: {
          ...get().formState
        },
      }
    } else {
      let i = 0;
      const typingEffect = () => {
        if (i < value.length) {
          set((state) => ({
            highlighted: field,
            formState: {
              ...state.formState,
              [field]: state.formState[field] + value.charAt(i),
            },
          }));
          i++;
          setTimeout(typingEffect, speed);
        }
      };
      typingEffect();
      return {
        formState: {
          ...get().formState,
          [field]: value,
        },
      }
    }
  },
}));

export default useFormStore;
