# use-react-model

- create state model with reducer and react context.
- type inference state and reducer handler.

# Example 

https://kangjs7854.github.io/use-model/create-model

# Installation

```
yarn add use-react-model

```

# API

## createModel

the function returns a tuple, the first value of the tuple is a react cotext provider,the second value of tuple is the function to get state and dispatch handler.

```js
import createModel  from "use-react-model";

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
      {countModel.state.count}
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

## createModelByCustomHook

create state model by existed custom hook.

```js
import { createModelByCustomHook } from "use-react-model";

function useCount() {
  const [count, setCount] = useState(0);
  return {
    count,
    setCount,
  };
}

const [CountProvider, useCountCtx] = createModelByCustomHook(useCount);

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
        countModel.setCount(1);
      }}
    >
      {countModel.count}
    </div>
  );
}
```
