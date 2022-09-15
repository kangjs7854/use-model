import { createContext, useContext, Context } from "react";

const initContext = <S,>(store: S) => {
  let ctx: Context<S>;

  const getCtx = () => {
    if (ctx) return ctx;
    ctx = createContext<S>(store);
    return ctx;
  };
  return getCtx;
};

export const NO_PROVIDER = {};

export function genModelCtx<Model>(
  displayName: string,
  existCtx?: React.Context<Model>
) {
  const getCtx = initContext<Model>(NO_PROVIDER as any);
  const Context = existCtx || getCtx();
  Context.displayName = displayName;

  const useCtx = () => {
    const ctx = useContext(Context);
    if (ctx === NO_PROVIDER)
      throw new Error(
        `${Context.displayName}未在组件外层包裹Provider，无法通过上下文访问`
      );
    return ctx;
  };
  return {
    useCtx,
    Context,
  };
}
