import { createContext, ReactNode, useState } from "react";

const defaultValue = {
  member: {
    name: "",
    lastMet: "",
    area: "",
    location: null,
  },
  setMember: (value: any) => {},
};

const AddMemberContext = createContext(defaultValue);

export function AddMemberProvider({ children }: { children: ReactNode }) {
  const [member, setMember] = useState({
    name: "",
    lastMet: "",
    area: "",
    location: null,
  });

  return (
    <AddMemberContext.Provider value={{ member, setMember }}>
      {children}
    </AddMemberContext.Provider>
  );
}

export default AddMemberContext;
