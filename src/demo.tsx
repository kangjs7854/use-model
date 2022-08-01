import { useReducerEnhance } from "./useReducerEnhance";
import createModel from "./index";

const [Provider, useCountModel] = createModel(
  {
    count: 0,
  },
  {
    add(store, payload) {
      return {
        ...store,
        count: store.count + payload,
      };
    },
  }
);
const count = useCountModel();
