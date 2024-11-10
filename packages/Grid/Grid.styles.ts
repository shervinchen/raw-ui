import { isPlainObject, isString } from 'lodash';
import {
  AlignResponsiveStyle,
  Aligns,
  Align,
  BreakPoints,
  ColResponsiveStyle,
  ColSpanStyle,
  ColStyle,
  GutterResponsiveStyle,
  Justifies,
  JustifyResponsiveStyle,
  Justify,
  ResponsiveValue,
  BreakPoint,
} from './Grid.types';

const GRID_SIZE = 24;

export const alignStyleMap: {
  [key in Align]: string;
} = {
  normal: 'normal',
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
};

export const justifyStyleMap: {
  [key in Justify]: string;
} = {
  normal: 'normal',
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  'space-between': 'space-between',
  'space-around': 'space-around',
  'space-evenly': 'space-evenly',
};

const isLegalGutterNumber = (value?: ResponsiveValue<number>) => {
  return Number.isInteger(value) && (value as number) >= 0;
};

const isLegalColPropertyValue = (value?: ResponsiveValue<number>) => {
  return (
    Number.isInteger(value) &&
    (value as number) >= 1 &&
    (value as number) <= GRID_SIZE
  );
};

const isLegalGridPropertyValue = (
  type: 'gutter' | 'align' | 'justify',
  value?:
    | ResponsiveValue<number>
    | ResponsiveValue<Align>
    | ResponsiveValue<Justify>
) => {
  const keys = {
    align: Aligns,
    justify: Justifies,
  };
  return type === 'gutter'
    ? isLegalGutterNumber(value as ResponsiveValue<number>)
    : isString(value) && Object.keys(keys[type]).includes(value);
};

const calculateColStyle = (
  type: 'span' | 'offset' | 'order',
  value: number
) => {
  return {
    span: {
      display: 'block',
      flex: `0 0 ${(value / GRID_SIZE) * 100}%`,
      maxWidth: `${(value / GRID_SIZE) * 100}%`,
    },
    offset: {
      marginInlineStart: `${(value / GRID_SIZE) * 100}%`,
    },
    order: {
      order: value,
    },
  }[type];
};

export const getColResponsiveStyle = (
  type: 'span' | 'offset' | 'order',
  value: ResponsiveValue<number>
) => {
  const defaultStyle: ColStyle = {
    span: {
      display: 'block',
      flex: '0 1 auto',
      maxWidth: 'none',
    },
    offset: {
      marginInlineStart: 0,
    },
    order: {
      order: 0,
    },
  };
  const hideSpanStyle: ColSpanStyle = {
    display: 'none',
    flex: '0 1 auto',
    maxWidth: 'none',
  };

  const responsiveStyle: ColResponsiveStyle = {
    xs: defaultStyle[type],
    sm: defaultStyle[type],
    md: defaultStyle[type],
    lg: defaultStyle[type],
    xl: defaultStyle[type],
    xxl: defaultStyle[type],
  };

  if (type === 'span' && value === 0) {
    Object.keys(responsiveStyle).map((key: BreakPoint) => {
      responsiveStyle[key] = hideSpanStyle;
    });
    return responsiveStyle;
  }

  if (isLegalColPropertyValue(value)) {
    Object.keys(responsiveStyle).map((key: BreakPoint) => {
      responsiveStyle[key] = calculateColStyle(type, value as number);
    });
    return responsiveStyle;
  }

  if (isPlainObject(value)) {
    const breakPoints = Object.keys(BreakPoints);
    const responsiveValue = value as { [key in BreakPoint]?: number };
    Object.keys(responsiveValue).map((breakPoint: BreakPoint) => {
      if (type === 'span' && responsiveValue[breakPoint] === 0) {
        responsiveStyle[breakPoint] = hideSpanStyle;
      } else if (
        breakPoints.includes(breakPoint) &&
        isLegalColPropertyValue(responsiveValue[breakPoint])
      ) {
        responsiveStyle[breakPoint] = calculateColStyle(
          type,
          responsiveValue[breakPoint] as number
        );
      }
    });
    return responsiveStyle;
  }

  return responsiveStyle;
};

export const getGridResponsiveStyle = (
  type: 'gutter' | 'align' | 'justify',
  value:
    | ResponsiveValue<number>
    | ResponsiveValue<Align>
    | ResponsiveValue<Justify>
) => {
  const gridResponsiveStyle:
    | GutterResponsiveStyle
    | AlignResponsiveStyle
    | JustifyResponsiveStyle =
    type === 'gutter'
      ? {
          xs: 0,
          sm: 0,
          md: 0,
          lg: 0,
          xl: 0,
          xxl: 0,
        }
      : {
          xs: 'normal',
          sm: 'normal',
          md: 'normal',
          lg: 'normal',
          xl: 'normal',
          xxl: 'normal',
        };

  if (isLegalGridPropertyValue(type, value)) {
    Object.keys(gridResponsiveStyle).map((key: BreakPoint) => {
      gridResponsiveStyle[key] = value as number | Align | Justify;
    });
    return gridResponsiveStyle;
  }

  if (isPlainObject(value)) {
    const breakPoints = Object.keys(BreakPoints);
    const responsiveValue = value as {
      [key in BreakPoint]?: number | Align | Justify;
    };
    Object.keys(responsiveValue).map((breakPoint: BreakPoint) => {
      if (
        breakPoints.includes(breakPoint) &&
        isLegalGridPropertyValue(type, responsiveValue[breakPoint])
      ) {
        gridResponsiveStyle[breakPoint] = responsiveValue[breakPoint] as
          | number
          | Align
          | Justify;
      }
    });
    return gridResponsiveStyle;
  }

  return gridResponsiveStyle;
};
