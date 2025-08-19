require('@testing-library/jest-dom');

const originalWarn = console.warn;
console.warn = (msg, ...args) => {
  if (typeof msg === 'string' && msg.includes('JSX transform')) return;
  originalWarn(msg, ...args);
};