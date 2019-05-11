const isPresent = value => Boolean(value);

const isEmail = value => Boolean(value && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,63}$/i.test(value));

export { isPresent, isEmail };
