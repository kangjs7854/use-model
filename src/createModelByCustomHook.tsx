import  React, { FC } from "react";
import { genModelCtx } from "./genModelCtx";

export function createModelByCustomHook<Model, Params>(
  useModel: (parmas: Params) => Model
): [FC<Params>, ...[() => Model]] {
  const { Context, useCtx } = genModelCtx<Model>(useModel.name);

  const Provider = ({ children, ...parmas }: any) => {
    const model = useModel(parmas);
    return <Context.Provider value={model}>{children}</Context.Provider>;
  };

  return [Provider, useCtx];
}
