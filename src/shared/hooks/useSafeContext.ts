import React, { useContext } from "react";

const useSafeContext = <T>(newContext: React.Context<T | undefined>, contextName: string): T => {
  const context = useContext(newContext);
  if (!context) {
    throw new Error(`${contextName} hooks must be used within a ${contextName} Provider`);
  }
  return context;
};

export default useSafeContext;
