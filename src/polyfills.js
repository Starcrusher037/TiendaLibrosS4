const { TextEncoder, TextDecoder } = require('util');
const { ReadableStream, TransformStream, WritableStream } = require('stream/web');
const { BroadcastChannel } = require('worker_threads');

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder;
}
if (typeof global.ReadableStream === 'undefined') {
  global.ReadableStream = ReadableStream;
}
if (typeof global.TransformStream === 'undefined') {
  global.TransformStream = TransformStream;
}
if (typeof global.WritableStream === 'undefined') {
  global.WritableStream = WritableStream;
}
if (typeof global.BroadcastChannel === 'undefined') {
  global.BroadcastChannel = BroadcastChannel;
}

// Asegurar que Response, Request, Headers y fetch estén disponibles en el entorno jsdom de Jest
if (typeof global.Response === 'undefined' && typeof Response !== 'undefined') {
  global.Response = Response;
}
if (typeof global.Request === 'undefined' && typeof Request !== 'undefined') {
  global.Request = Request;
}
if (typeof global.Headers === 'undefined' && typeof Headers !== 'undefined') {
  global.Headers = Headers;
}
if (typeof global.fetch === 'undefined' && typeof fetch !== 'undefined') {
  global.fetch = fetch;
}
