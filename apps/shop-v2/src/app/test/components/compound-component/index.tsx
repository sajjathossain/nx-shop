import { createContext, useContext } from "react";
import { Header } from "./header";
import { ActionCard } from "./action-card";
import { Logo } from "./logo";

const CompountComponentContext = createContext({})

export function CompoundComponent({ children }: { children: React.ReactNode }) {
  return <CompountComponentContext.Provider value={{}}>
    {children}
  </CompountComponentContext.Provider>
}

CompoundComponent.Logo = Logo
CompoundComponent.Header = Header
CompoundComponent.ActionCard = ActionCard

export const useCompoundComponent = () => {
  const context = useContext(CompountComponentContext);
  if (!context) {
    throw new Error('Toggle compound components must be rendered within the <Toggle> component');
  }
  return context
}
