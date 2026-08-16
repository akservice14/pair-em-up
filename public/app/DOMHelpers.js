// domHelpers.js
export const DOMHelpers = {
  getElement() {
    return this.element;
  },

  addElementToParent(tag, {className, text, id, parent} = {}) {
    if (!tag) return;
    const newElement = document.createElement(tag);
    if (className) {
      newElement.classList.add(
        ...className
          .trim()
          .split(' ')
          .filter((c) => c),
      );
    }
    if (text != null)
      newElement.textContent = text;
    if (id)
      newElement.id = id;
    if (parent) parent.appendChild(newElement);
    return newElement;
  },
};
