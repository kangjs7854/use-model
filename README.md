# use-model

# Installation

```
yarn add use-model

```

# API

## createModel

create model by coustom hook. the function returns a tuple, the first value of the tuple is a react cotext provider,the second value of tuple is the function to get result of that coustom hook

```js
import createModel, { useReducerEnhance } from "use-model";

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
  }
);

function Father() {
  return (
    <CountProvider>
      <Son />
    </CountProvider>
  );
}

function Son() {
  const countModel = useCountCtx();
  return (
    <div
      onClick={() => {
        countModel.dispatchAction.add(1);
      }}
    >
      {countModel.count}
    </div>
  );
}
```

## ContextCompose

compose context provider

```js
<ContextCompose contexts={[Provider1, Provider2, Provider3]}>
  {children}
</ContextCompose>
```

## useReducerEnhance
