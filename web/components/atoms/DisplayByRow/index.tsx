import React from "react";

export function DisplayByRow(props: {
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | React.ReactNode[]
    | null
    | undefined;
}) {
  const children = React.Children.toArray(props.children);

  const childWidth = `${100 / children.length}%`;

  const handleAdd = () => {
    console.log("click add button");
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {children.map((child, index) => (
          <div key={index} style={{ width: childWidth }}>
            {child}
          </div>
        ))}
      </div>
      <button onClick={handleAdd}>Add</button>
    </>
  );
}
