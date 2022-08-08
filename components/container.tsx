import clx from "classnames";
import React from 'react'

interface ContainerProps {
    children: React.ReactNode,
    size?: string,
    className?: string
}

export function Container({ children, size = "xl", className = "" }: ContainerProps) {
  return (
    <div
      className={clx(
        "m-auto",
        {
          "w-9/12": size === "xl",
          "w-11/12": size === "2xl",
          "w-full": size === "full",
        },
        className
      )}
    >
      {children}
    </div>
  );
}