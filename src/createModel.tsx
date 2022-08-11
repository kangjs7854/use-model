import React from "react";
import { genModelCtx } from "./genModelCtx";
import { useReducerEnhance } from "./useReducerEnhance";

type Hooks<Value> = [() => Value];

export function createModel<S, A>(
  store: S,
  action: { [type in keyof A]: (store: S, payload?: any) => S }
): [
  React.FC<any>,
  ...Hooks<{
    state: S;
    dispatch: React.Dispatch<{
      type: keyof A;
      payload?: any;
    }>;
    dispatchAction: { [type in keyof A]: (payload?: any) => void };
  }>
] {
  const { Context, useCtx } = genModelCtx<{
    state: S;
    dispatch: React.Dispatch<{
      type: keyof A;
      payload?: any;
    }>;
    dispatchAction: { [type in keyof A]: (payload?: any) => void };
  }>("");

  const Provider = ({ children }: any) => {
    const model = useReducerEnhance(store, action);
    return <Context.Provider value={model}>{children}</Context.Provider>;
  };

  return [Provider, useCtx];
}
