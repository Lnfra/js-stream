const { create_stream } = require('./stream');
const { each } = require('./operation');

const display = (stream) => each(stream, elem => console.log(elem));

const range = (low, high) => low > high ? null : create_stream(low, () => range(low + 1, high));

const integer_starting_from = (n) => create_stream(n, () => integer_starting_from(n + 1));
const naturals = integer_starting_from(0);

const generate_fibonacci = (a, b) => create_stream(a, () => generate_fibonacci(b, a + b));
const fibs = generate_fibonacci(0, 1);

module.exports = {
  display, range, naturals, fibs
}