import css from 'styled-jsx/css';
import { RawUITheme } from '../Theme/preset/preset.type';
import { useTheme } from '../Theme/theme-context';
import { ToggleProps, ToggleStatus, ToggleStyles } from './Toggle.types';

export const useToggleStyles = ({
  status,
  disabled,
}: {
  status?: ToggleStatus;
  disabled?: boolean;
}): ToggleStyles => {
  const theme: RawUITheme = useTheme();

  const styles: {
    [key in ToggleStatus]: ToggleStyles;
  } = {
    unChecked: {
      backgroundColor: theme.palette.neutral['200'],
      borderColor: theme.palette.neutral['200'],
    },
    checked: {
      backgroundColor: theme.palette.foreground,
      borderColor: theme.palette.foreground,
    },
  };

  const defaultStyles = styles?.[status || 'unChecked'] ?? styles['unChecked'];
  const disabledStyles = {
    unChecked: {
      backgroundColor: theme.palette.neutral['50'],
      borderColor: theme.palette.neutral['200'],
    },
    checked: {
      backgroundColor: theme.palette.neutral['500'],
      borderColor: theme.palette.neutral['500'],
    },
  };

  return {
    ...defaultStyles,
    ...(disabled
      ? disabledStyles?.[status || 'unChecked'] ?? disabledStyles['unChecked']
      : {}),
  };
};

export const useToggleCSS = ({ checked, disabled }: ToggleProps) => {
  const theme: RawUITheme = useTheme();
  const { backgroundColor, borderColor } = useToggleStyles({
    status: checked ? 'checked' : 'unChecked',
    disabled,
  });

  return css.resolve`
    .raw-toggle {
      position: relative;
      display: inline-flex;
      cursor: ${disabled ? 'not-allowed' : 'pointer'};
    }
    .raw-toggle :global(.raw-toggle-inner) {
      box-sizing: border-box;
      width: 28px;
      height: 14px;
      border-radius: 14px;
      position: relative;
      transition: background 150ms cubic-bezier(0, 0, 0.2, 1);
      transition-property: background, border-color;
      background-color: ${backgroundColor};
      border: 1px solid ${borderColor};
    }
    .raw-toggle :global(.raw-toggle-inner .raw-toggle-thumb) {
      position: absolute;
      width: 12px;
      height: 12px;
      top: 50%;
      left: 0;
      box-shadow: 0 1px 2px 0 rgb(0 0 0 / 20%), 0 1px 3px 0 rgb(0 0 0 / 10%);
      transition: transform 150ms cubic-bezier(0, 0, 0.2, 1);
      border-radius: 50%;
      background-color: ${disabled
        ? theme.palette.neutral['200']
        : theme.palette.background};
      transform: ${checked ? 'translate(14px, -50%)' : 'translate(0, -50%)'};
    }
  `;
};
