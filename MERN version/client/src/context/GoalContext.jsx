import React, { createContext, useContext, useState } from "react";

const GoalContext = createContext();

export function GoalProvider({ children }) {
    const [showGoals, setShowGoals] = useState(false);
    const [createGoal, setCreateGoal] = useState(false);
    const [goals,setGoals] = useState([]);
    const [syncGoal, setSyncGoal] = useState(false);
    const [showGoal,setShowGoal] = useState(null);
  return (
    <GoalContext.Provider value={{ showGoals,setShowGoals,createGoal,setCreateGoal,goals,setGoals,syncGoal,setSyncGoal,showGoal,setShowGoal }}>
      {children}
    </GoalContext.Provider>
  );
}

export function useGoal() {
  return useContext(GoalContext);
}