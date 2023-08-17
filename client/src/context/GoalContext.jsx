import React, { createContext, useContext, useState } from "react";

const GoalContext = createContext();

export function GoalProvider({ children }) {
    const [showGoals, setShowGoals] = useState(false);
  return (
    <GoalContext.Provider value={{ showGoals,setShowGoals }}>
      {children}
    </GoalContext.Provider>
  );
}

export function useGoal() {
  return useContext(GoalContext);
}