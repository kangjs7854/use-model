import { useReducer } from "react";

/**
 * 根据传入的store和handler对象，自动类型推导。
 * @param store
 * @param actionHandler
 * @returns
 */
export function useReducerEnhance<Store, Action>(
  store: Store,
  actionHandler: {
    [type in keyof Action]: (store: Store, payload?: any) => Store;
  }
) {
  const reducer = (
    store: Store,
    action: {
      type: keyof Action;
      payload?: any;
    }
  ) => {
    const { type, payload } = action;
    const handler = actionHandler?.[type];
    const next = handler?.(store, payload as any);
    return next as Store;
  };
  const [state, dispatch] = useReducer(reducer, store);

  const dispatchAction = Object.keys(actionHandler).reduce(
    (pre, cur) => {
      pre[cur] = (payload?: any) => {
        dispatch({
          type: cur as keyof Action,
          payload,
        });
      };
      return pre;
    },
    {} as {
      [type in keyof Action]: (payload?: any) => void;
    }
  );

  return {
    state,
    dispatch,
    dispatchAction,
  };
}
