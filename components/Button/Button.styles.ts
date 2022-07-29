import css from 'styled-jsx/css';

export const styles = css`
  .raw-button {
    box-sizing: border-box;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    border: 1px solid;
    border-radius: 6px;
    font-weight: 400;
    transition-property: border-color, background, color, transform, box-shadow;
    transition-duration: 0.2s;
    transition-timing-function: ease;
    text-transform: capitalize;
    cursor: pointer;
    white-space: nowrap;
    appearance: none;
    outline: none;
    user-select: none;
  }

  .raw-button-sm {
    font-size: 12px;
    line-height: 16px;
    height: 34px;
    padding: 8px 12px;
  }

  .raw-button-md {
    font-size: 14px;
    line-height: 20px;
    height: 40px;
    padding: 8px 16px;
  }

  .raw-button-lg {
    font-size: 16px;
    ling-height: 24px;
    height: 46px;
    padding: 10px 20px;
  }

  .raw-button-default {
    color: #666;
    background-color: #fff;
    border-color: #eaeaea;
  }

  .raw-button-default:hover,
  .raw-button-default:focus {
    color: #000;
    border-color: #000;
  }

  .raw-button-default:active {
    background-color: #eaeaea;
  }

  .raw-button-primary {
    color: #fff;
    background-color: #000;
    border-color: #000;
  }

  .raw-button-primary:hover,
  .raw-button-primary:focus {
    color: #000;
    background-color: #fff;
  }

  .raw-button-primary:active {
    background-color: #eaeaea;
  }

  .raw-button-success {
    color: #fff;
    background-color: #0070f3;
    border-color: #0070f3;
  }

  .raw-button-success:hover,
  .raw-button-success:focus {
    color: #0070f3;
    background-color: #fff;
  }

  .raw-button-success:active {
    background-color: #eaeaea;
  }

  .raw-button-warning {
    color: #fff;
    background-color: #f5a623;
    border-color: #f5a623;
  }

  .raw-button-warning:hover,
  .raw-button-warning:focus {
    color: #f5a623;
    background-color: #fff;
  }

  .raw-button-warning:active {
    background-color: #eaeaea;
  }

  .raw-button-error {
    color: #fff;
    background-color: #e00;
    border-color: #e00;
  }

  .raw-button-error:hover,
  .raw-button-error:focus {
    color: #e00;
    background-color: #fff;
  }

  .raw-button-error:active {
    background-color: #eaeaea;
  }

  .raw-button-primary.raw-button-outline {
    color: #000;
    background-color: transparent;
    border-color: #000;
  }

  .raw-button-primary.raw-button-outline:hover,
  .raw-button-primary.raw-button-outline:focus {
    color: #fff;
    background-color: #000;
  }

  .raw-button-success.raw-button-outline {
    color: #0070f3;
    background-color: transparent;
    border-color: #0070f3;
  }

  .raw-button-success.raw-button-outline:hover,
  .raw-button-success.raw-button-outline:focus {
    color: #fff;
    background-color: #0070f3;
  }

  .raw-button-warning.raw-button-outline {
    color: #f5a623;
    background-color: transparent;
    border-color: #f5a623;
  }

  .raw-button-warning.raw-button-outline:hover,
  .raw-button-warning.raw-button-outline:focus {
    color: #fff;
    background-color: #f5a623;
  }

  .raw-button-error.raw-button-outline {
    color: #e00;
    background-color: transparent;
    border-color: #e00;
  }

  .raw-button-error.raw-button-outline:hover,
  .raw-button-error.raw-button-outline:focus {
    color: #fff;
    background-color: #e00;
  }

  .raw-button-default.raw-button-ghost {
    background-color: transparent;
    border-color: transparent;
  }

  .raw-button-default.raw-button-ghost:hover,
  .raw-button-default.raw-button-ghost:focus {
    color: #666;
    background-color: #e7e7e7;
  }

  .raw-button-default.raw-button-ghost:active {
    background-color: #dcdcdc;
  }

  .raw-button-primary.raw-button-ghost {
    color: #000;
    background-color: transparent;
    border-color: transparent;
  }

  .raw-button-primary.raw-button-ghost:hover,
  .raw-button-primary.raw-button-ghost:focus {
    background-color: #e7e7e7;
  }

  .raw-button-primary.raw-button-ghost:active {
    background-color: #dcdcdc;
  }

  .raw-button-success.raw-button-ghost {
    color: #0070f3;
    background-color: transparent;
    border-color: transparent;
  }

  .raw-button-success.raw-button-ghost:hover,
  .raw-button-success.raw-button-ghost:focus {
    background-color: #cce2fd;
  }

  .raw-button-success.raw-button-ghost:active {
    background-color: #b3d4fb;
  }

  .raw-button-warning.raw-button-ghost {
    color: #f5a623;
    background-color: transparent;
    border-color: transparent;
  }

  .raw-button-warning.raw-button-ghost:hover,
  .raw-button-warning.raw-button-ghost:focus {
    background-color: #fdedd3;
  }

  .raw-button-warning.raw-button-ghost:active {
    background-color: #fce4bd;
  }

  .raw-button-error.raw-button-ghost {
    color: #e00;
    background-color: transparent;
    border-color: transparent;
  }

  .raw-button-error.raw-button-ghost:hover,
  .raw-button-error.raw-button-ghost:focus {
    background-color: #fccccc;
  }

  .raw-button-error.raw-button-ghost:active {
    background-color: #fab3b3;
  }

  .raw-button-default.raw-button-shadow {
    border-color: #fff;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
  }

  .raw-button-default.raw-button-shadow:hover,
  .raw-button-default.raw-button-shadow:focus {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }

  .raw-button-default.raw-button-shadow:active {
    background-color: #fff;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
    transform: none;
  }

  .raw-button-primary.raw-button-shadow {
    border-color: #000;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
  }

  .raw-button-primary.raw-button-shadow:hover,
  .raw-button-primary.raw-button-shadow:focus {
    color: #fff;
    background-color: #000;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }

  .raw-button-primary.raw-button-shadow:active {
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
    transform: none;
  }

  .raw-button-success.raw-button-shadow {
    border-color: #0070f3;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
  }

  .raw-button-success.raw-button-shadow:hover,
  .raw-button-success.raw-button-shadow:focus {
    color: #fff;
    background-color: #0070f3;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }

  .raw-button-success.raw-button-shadow:active {
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
    transform: none;
  }

  .raw-button-warning.raw-button-shadow {
    border-color: #f5a623;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
  }

  .raw-button-warning.raw-button-shadow:hover,
  .raw-button-warning.raw-button-shadow:focus {
    color: #fff;
    background-color: #f5a623;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }

  .raw-button-warning.raw-button-shadow:active {
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
    transform: none;
  }

  .raw-button-error.raw-button-shadow {
    border-color: #e00;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
  }

  .raw-button-error.raw-button-shadow:hover,
  .raw-button-error.raw-button-shadow:focus {
    color: #fff;
    background-color: #e00;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }

  .raw-button-error.raw-button-shadow:active {
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
    transform: none;
  }

  .raw-button-disabled {
    background-color: #fafafa;
    color: #999;
    border-color: #eaeaea;
    cursor: not-allowed;
  }

  .raw-button-disabled:hover,
  .raw-button-disabled:focus {
    color: #999;
    border-color: #eaeaea;
  }

  .raw-button-disabled:active {
    background-color: #fafafa;
  }
`;
