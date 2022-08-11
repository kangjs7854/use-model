import { renderHook, act } from "@testing-library/react-hooks";
import createModel  from "../src";

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
    reset(state){
      return {
        ...state,
        count: 0
      };
    }
  }
);

test("should use custom step when incrementing", () => {
  const { result } = renderHook(() => useCounterCtx(), { wrapper :CounterStepProvider});


  act(() => {
    result.current.dispatchAction.add(1)
  });

  expect(result.current.state.count).toBe(1);
});


test("should use custom step when reset", () => {
  const { result } = renderHook(() => useCounterCtx(), { wrapper :CounterStepProvider});


  act(() => {
    result.current.dispatchAction.reset()
  });

  expect(result.current.state.count).toBe(0);
});

