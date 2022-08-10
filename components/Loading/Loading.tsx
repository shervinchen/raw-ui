import React, { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';

import { getDotLoadingStyles, getSpinLoadingStyles } from './Loading.styles';
import { LoadingProps } from './Loading.types';

const DotLoading: FC<PropsWithChildren<Omit<LoadingProps, 'type'>>> = (
  props
) => {
  const { className, color, size = 4, children, ...restProps } = props;
  const { className: resolveClassName, styles } = getDotLoadingStyles({
    color,
    size,
  });
  const classes = classNames('raw-dot-loading', className, resolveClassName);

  return (
    <div className={classes} {...restProps}>
      <span className={classNames('raw-dot-loading-inner', resolveClassName)}>
        <i className={resolveClassName} />
        <i className={resolveClassName} />
        <i className={resolveClassName} />
      </span>
      {children && (
        <div className={classNames('raw-dot-loading-text', resolveClassName)}>
          {children}
        </div>
      )}
      {styles}
    </div>
  );
};

const SpinLoading: FC<PropsWithChildren<Omit<LoadingProps, 'type'>>> = (
  props
) => {
  const { className, color, size = 20, children, ...restProps } = props;
  const { className: resolveClassName, styles } = getSpinLoadingStyles({
    color,
    size,
  });
  const classes = classNames('raw-spin-loading', className, resolveClassName);

  return (
    <div className={classes} {...restProps}>
      <div className={classNames('raw-spin-loading-wrapper', resolveClassName)}>
        <div className={classNames('raw-spin-loading-inner', resolveClassName)}>
          {[...new Array(12)].map((_, index) => (
            <span className={resolveClassName} key={`raw-spin-${index}`} />
          ))}
        </div>
      </div>
      {children && (
        <div className={classNames('raw-spin-loading-text', resolveClassName)}>
          {children}
        </div>
      )}
      {styles}
    </div>
  );
};

const Loading: FC<PropsWithChildren<LoadingProps>> = ({
  type = 'dot',
  color = '#666',
  className = '',
  children,
  ...restProps
}) => {
  return type === 'dot' ? (
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
