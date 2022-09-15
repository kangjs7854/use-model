import { renderHook, act } from "@testing-library/react-hooks";
import { createContext, useContext, useState } from "react";
import createModel, { createModelByCustomHook } from "../src";

describe("test create model by state and reducer aciton", () => {
  const [CounterStepProvider, useCounterCtx] = createModel(
    {
      count: 0,
    },
    {
      add(state, payload) {
        return {
          ...state,
          count: state.count + payload,
        };
      },
      reset(state) {
        return {
          ...state,
          count: 0,
        };
      },
    }
  );

  test("test incrementing", () => {
    const { result } = renderHook(() => useCounterCtx(), {
      wrapper: CounterStepProvider,
    });

    act(() => {
      result.current.dispatchAction.add(1);
    });

    expect(result.current.state.count).toBe(1);
  });

  test("test reset", () => {
    const { result } = renderHook(() => useCounterCtx(), {
      wrapper: CounterStepProvider,
    });

    act(() => {
      result.current.dispatchAction.reset();
    });

    expect(result.current.state.count).toBe(0);
  });
});

describe("test create model by custom hook", () => {
  function useCouter() {
    const [count, setCount] = useState(0);

    return {
      state: {
        count,
      },
      dispatchAction: {
        add(payload) {
          setCount((pre) => pre + payload);
        },
        reset() {
          setCount(0);
        },
      },
    };
  }

  const [CounterStepProvider, useCounterCtx] =
    createModelByCustomHook(useCouter);

  test("test incrementing", () => {
    const { result } = renderHook(() => useCounterCtx(), {
      wrapper: CounterStepProvider,
    });

    act(() => {
      result.current.dispatchAction.add(1);
    });

    expect(result.current.state.count).toBe(1);
  });

  test("test reset", () => {
    const { result } = renderHook(() => useCounterCtx(), {
      wrapper: CounterStepProvider,
    });

    act(() => {
      result.current.dispatchAction.reset();
    });

    expect(result.current.state.count).toBe(0);
  });
});

describe("test create model by custom hook and exist context", () => {
  function useCouter() {
    const [count, setCount] = useState(0);

    return {
      state: {
        count,
      },
      dispatchAction: {
        add(payload) {
          setCount((pre) => pre + payload);
        },
        reset() {
          setCount(0);
        },
      },
    };
  }

  const ExistContext = createContext(null);

  function useExistContextValue() {
    return useContext(ExistContext);
  }

  const [CounterStepProvider, useCounterCtx] = createModelByCustomHook(
    useCouter,
    ExistContext
  );

  test("test incrementing", () => {
    const { result } = renderHook(() => useCounterCtx(), {
      wrapper: CounterStepProvider,
    });

    act(() => {
      result.current.dispatchAction.add(1);
    });

    expect(result.current.state.count).toBe(1);
  });

  test("test reset", () => {
    const { result } = renderHook(() => useCounterCtx(), {
      wrapper: CounterStepProvider,
    });

    act(() => {
      result.current.dispatchAction.reset();
    });

    expect(result.current.state.count).toBe(0);
  });

  test("Compatibility with old ways of using context", () => {
    const { result } = renderHook(
      () => {
        const ctx = useCounterCtx();
        const existCtx = useExistContextValue();
        return {
          ctx,
          existCtx,
        };
      },
      {
        wrapper: CounterStepProvider,
      }
    );

    act(() => {
      result.current.ctx.dispatchAction.add(1);
    });

    expect(result.current.ctx.state.count).toBe(
      result.current.existCtx.state.count
    );
  });
});
