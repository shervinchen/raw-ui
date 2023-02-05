import css from 'styled-jsx/css';

export const useDotLoadingCSS = ({ size, color }) => {
  return css.resolve`
    .raw-dot-loading {
      display: inline-flex;
      align-items: center;
      flex-direction: column;
    }

    .raw-dot-loading :global(.raw-dot-loading-inner) {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      user-select: none;
    }

    .raw-dot-loading :global(.raw-dot-loading-text) {
      font-size: 14px;
      color: ${color};
      margin-top: 0.5em;
    }

    .raw-dot-loading :global(.raw-dot-loading-inner > i) {
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background-color: ${color};
      margin: 0 ${size / 2}px;
      display: inline-block;
      animation: loading-blink 1.4s infinite both;
    }

    .raw-dot-loading :global(.raw-dot-loading-inner > i:nth-child(2)) {
      animation-delay: 0.2s;
    }

    .raw-dot-loading :global(.raw-dot-loading-inner > i:nth-child(3)) {
      animation-delay: 0.4s;
    }

    @keyframes loading-blink {
      0% {
        opacity: 0.2;
      }

      20% {
        opacity: 1;
      }

      100% {
        opacity: 0.2;
      }
    }
  `;
};

export const useSpinLoadingCSS = ({ size, color }) => {
  return css.resolve`
    .raw-spin-loading {
      display: block;
      box-sizing: border-box;
    }

    .raw-spin-loading :global(.raw-spin-loading-wrapper) {
      position: relative;
      left: 50%;
      top: 50%;
      width: ${size}px;
      height: ${size}px;
      transform: translateX(-50%);
    }

    .raw-spin-loading :global(.raw-spin-loading-inner) {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 100%;
      height: 100%;
    }

    .raw-spin-loading :global(.raw-spin-loading-text) {
      font-size: 14px;
      color: ${color};
      margin-top: 0.5em;
    }

    .raw-spin-loading :global(.raw-spin-loading-inner > span) {
      position: absolute;
      top: -3.9%;
      width: 24%;
      height: 8%;
      left: -10%;
      border-radius: 6px;
      background-color: ${color};
      animation: spinner 1.2s linear 0s infinite normal none running;
    }

    .raw-spin-loading :global(.raw-spin-loading-inner > span:nth-child(1)) {
      animation-delay: -1.2s;
      transform: rotate(0deg) translate(146%);
    }

    .raw-spin-loading :global(.raw-spin-loading-inner > span:nth-child(2)) {
      animation-delay: -1.1s;
      transform: rotate(30deg) translate(146%);
    }

    .raw-spin-loading :global(.raw-spin-loading-inner > span:nth-child(3)) {
      animation-delay: -1s;
      transform: rotate(60deg) translate(146%);
    }

    .raw-spin-loading :global(.raw-spin-loading-inner > span:nth-child(4)) {
      animation-delay: -0.9s;
      transform: rotate(90deg) translate(146%);
    }

    .raw-spin-loading :global(.raw-spin-loading-inner > span:nth-child(5)) {
      animation-delay: -0.8s;
      transform: rotate(120deg) translate(146%);
    }

    .raw-spin-loading :global(.raw-spin-loading-inner > span:nth-child(6)) {
      animation-delay: -0.7s;
      transform: rotate(150deg) translate(146%);
    }

    .raw-spin-loading :global(.raw-spin-loading-inner > span:nth-child(7)) {
      animation-delay: -0.6s;
      transform: rotate(180deg) translate(146%);
    }

    .raw-spin-loading :global(.raw-spin-loading-inner > span:nth-child(8)) {
      animation-delay: -0.5s;
      transform: rotate(210deg) translate(146%);
    }

    .raw-spin-loading :global(.raw-spin-loading-inner > span:nth-child(9)) {
      animation-delay: -0.4s;
      transform: rotate(240deg) translate(146%);
    }

    .raw-spin-loading :global(.raw-spin-loading-inner > span:nth-child(10)) {
      animation-delay: -0.3s;
      transform: rotate(270deg) translate(146%);
    }

    .raw-spin-loading :global(.raw-spin-loading-inner > span:nth-child(11)) {
      animation-delay: -0.2s;
      transform: rotate(300deg) translate(146%);
    }

    .raw-spin-loading :global(.raw-spin-loading-inner > span:nth-child(12)) {
      animation-delay: -0.1s;
      transform: rotate(330deg) translate(146%);
    }

    @keyframes spinner {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0.15;
      }
    }
  `;
};
