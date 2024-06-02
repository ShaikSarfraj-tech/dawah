import { createContext, ReactNode, useState } from "react";

const defaultValue = {
  members: [
    {
      name: "",
      lastMet: "",
    },
  ],
  setMembers: (value: any) => {},
};

const MembersContext = createContext(defaultValue);

export function MembersProvider({ children }: { children: ReactNode }) {
  const [members, setMembers] = useState([]);

  return (
    <MembersContext.Provider value={{ members, setMembers }}>
      {children}
    </MembersContext.Provider>
  );
}

export default MembersContext;
