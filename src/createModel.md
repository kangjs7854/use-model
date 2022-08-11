## createModel

Demo:

```tsx
import React, { useEffect } from "react";
import createModel from "use-react-model";

const [CountProvider, useCountCtx] = createModel(
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

function Father() {
  return (
    <CountProvider>
      <Son />
      <ResetButton/>
    </CountProvider>
  );
}

function Son() {
  const countModel = useCountCtx();
  return (
    <>
      <p>state:{countModel.state.count}</p>
      <button
        onClick={() => {
          countModel.dispatchAction.add(1);
        }}
      >
        点击增加
      </button>
    </>
  );
}

function ResetButton() {
  const countModel = useCountCtx();

  return (
    <button
      onClick={() => {
        countModel.dispatchAction.reset();
      }}
    >
      重置
    </button>
  );
}
export default () => {
  return <Father />;
};
```
