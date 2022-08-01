import * as React from "react";

export function ContextCompose(props: {
  contexts: Array<React.JSXElementConstructor<React.PropsWithChildren<any>>>;
  children: React.ReactNode;
}) {
  const { contexts = [], children } = props;

  return (
    <>
      {contexts.reduceRight((acc, Comp: any) => {
        return <Comp>{acc}</Comp>;
      }, children)}
    </>
  );
}
