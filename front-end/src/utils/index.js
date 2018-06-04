
export default function autoBind(classComponent) {
  const classMethods = Object.getOwnPropertyNames(classComponent.prototype);
  classMethods.forEach((method) => {
    if (method.startsWith('handle')) {
      this[method] = this[method].bind(this);
    }
  });
}

export const validateCountry = (payload) => {
  if (!payload._id) {
    throw new Error('VALIDATION ERROR: country must have an id');
  }

  if (!payload.title) {
    throw new Error('VALIDATION ERROR: country must have a title');
  }
};
