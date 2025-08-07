import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface BasicInfo {
  nome: string;
  email: string;
  ativo: boolean;
}

export interface RegistrationData {
  basicInfo: BasicInfo;
  departamento: string;
}

interface RegistrationContextValue {
  data: RegistrationData;
  setBasicInfo: (values: BasicInfo) => void;
  setDepartamento: (dept: string) => void;
}

const defaultData: RegistrationData = {
  basicInfo: { nome: '', email: '', ativo: true },
  departamento: '',
};

const RegistrationContext = createContext<RegistrationContextValue>({
  data: defaultData,
  setBasicInfo: () => {},
  setDepartamento: () => {},
});

export const RegistrationProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<RegistrationData>(defaultData);

  const setBasicInfo = (basicInfo: BasicInfo) =>
    setData((d) => ({ ...d, basicInfo }));

  const setDepartamento = (departamento: string) =>
    setData((d) => ({ ...d, departamento }));

  return (
    <RegistrationContext.Provider value={{ data, setBasicInfo, setDepartamento }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => useContext(RegistrationContext);
