import { Children, isValidElement } from "react";

export default function getValidChildren(children: React.ReactNode) {
  return Children.toArray(children).filter((child) =>
    isValidElement(child)
  ) as React.ReactElement[];
}
