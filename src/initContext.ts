import { createContext } from "react";

export const initContext = <S>(store: S) => {
  let ctx: React.Context<S>;

  const getCtx = () => {
    if (ctx) return ctx;
    ctx = createContext<S>(store);
    return ctx;
  };
  return getCtx;
};
