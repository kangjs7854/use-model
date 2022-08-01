import { useContext } from "react";
import { initContext } from "./initContext";
import { useReducerEnhance } from "./useReducerEnhance";

const NO_PROVIDER = {};
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
  const getCtx = initContext(NO_PROVIDER as any);
  const Ctx = getCtx();

  const Provider = ({ children }: any) => {
    const model = useReducerEnhance(store, action);
    return <Ctx.Provider value={model}>{children}</Ctx.Provider>;
  };

  const useCtx = () => {
    const ctx = useContext(Ctx);
    if (ctx === NO_PROVIDER)
      throw new Error(
        `${JSON.stringify(
          store
        )}这个model，未在组件外层包裹对应的Provider，无法通过上下文访问`
      );
    return ctx;
  };
  return [Provider, useCtx];
}
