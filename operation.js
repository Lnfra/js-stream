const { create_stream, get_head, get_tail, empty_stream } = require('./stream')

const fetch = (stream, num) => {
  if (num === 0) {
    return get_head(stream)
  }
  return fetch(get_tail(stream), num - 1);
};

const take = (stream, num) => {
  if (num === 0) {
    return create_stream(get_head(stream), () => empty_stream);
  }
  return create_stream(get_head(stream), () => take(get_tail(stream), num - 1));
}

const each = (stream, handler) => {
  if (stream !== empty_stream) {
    handler(get_head(stream));
    each(get_tail(stream), handler);
  }
}

const map = (stream, mapper) => {
  if (stream === empty_stream) {
    return empty_stream;
  }
  return create_stream(
    mapper(get_head(stream)),
    () => map(get_tail(stream), mapper));
}

const filter = (stream, pred) => {
  if (stream === empty_stream) {
    return empty_stream;
  }
  if (pred(get_head(stream))) {
    return create_stream(get_head(stream), () => filter(get_tail(stream), pred));
  }
  return filter(get_tail(stream), pred);
}

module.exports = {
  fetch, map, filter, each, take
}