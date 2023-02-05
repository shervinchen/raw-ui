import React, { FC, PropsWithChildren } from "react";
import classNames from "classnames";

import { useDotLoadingCSS, useSpinLoadingCSS } from "./Loading.styles";
import { LoadingProps } from "./Loading.types";

const DotLoading: FC<PropsWithChildren<Omit<LoadingProps, "type">>> = (
  props
) => {
  const { className, color, size = 4, children, ...restProps } = props;
  const { className: resolveClassName, styles } = useDotLoadingCSS({
    color,
    size,
  });
  const classes = classNames("raw-dot-loading", className, resolveClassName);

  return (
    <div className={classes} {...restProps}>
      <span className="raw-dot-loading-inner">
        <i />
        <i />
        <i />
      </span>
      {children && <div className="raw-dot-loading-text">{children}</div>}
      {styles}
    </div>
  );
};

const SpinLoading: FC<PropsWithChildren<Omit<LoadingProps, "type">>> = (
  props
) => {
  const { className, color, size = 20, children, ...restProps } = props;
  const { className: resolveClassName, styles } = useSpinLoadingCSS({
    color,
    size,
  });
  const classes = classNames("raw-spin-loading", className, resolveClassName);

  return (
    <div className={classes} {...restProps}>
      <div className="raw-spin-loading-wrapper">
        <div className="raw-spin-loading-inner">
          {[...new Array(12)].map((_, index) => (
            <span key={`raw-spin-${index}`} />
          ))}
        </div>
      </div>
      {children && (
        <div className="raw-spin-loading-text">
          {children}
        </div>
      )}
      {styles}
    </div>
  );
};

const Loading: FC<PropsWithChildren<LoadingProps>> = ({
  type = "dot",
  color = "#666",
  className = "",
  children,
  ...restProps
}) => {
  return type === "dot" ? (
    <DotLoading color={color} className={className} {...restProps}>
      {children}
    </DotLoading>
  ) : (
    <SpinLoading color={color} className={className} {...restProps}>
      {children}
    </SpinLoading>
  );
};

export default Loading;
