import "@testing-library/jest-dom";

if (typeof window !== "undefined") {
  window.HTMLElement.prototype.hasPointerCapture = function () {
    return false;
  };
  window.HTMLElement.prototype.releasePointerCapture = function () {
    // No-op
  };
}

// Polyfill para scrollIntoView, que es llamado por Radix al abrir el Select
// y no existe en JSDOM.
if (typeof window !== "undefined") {
  Element.prototype.scrollIntoView = jest.fn();
}
