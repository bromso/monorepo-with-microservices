"use strict";

require("@babel/polyfill");

var _graphql = require("graphql");

var _apolloServer = require("apollo-server");

var _subscriptionsTransportWs = require("subscriptions-transport-ws");

var _mocks = _interopRequireDefault(require("./mocks"));

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var typeDefs = (0, _apolloServer.gql)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  scalar Date\n\n  # Relay specification\n  interface Node {\n    id: ID!\n  }\n\n  interface Edge {\n    cursor: String!\n    node: Node\n  }\n\n  interface Connection {\n    totalCount: Int\n    edges: [Edge]\n    pageInfo: PageInfo!\n  }\n\n  type PageInfo {\n    hasNextPage: Boolean!\n    hasPreviousPage: Boolean!\n    startCursor: String\n    endCursor: String\n  }\n\n  # Our implementation\n  type GameConnection implements Connection {\n    totalCount: Int\n    edges: [GameEdge]\n    pageInfo: PageInfo!\n  }\n\n  type GameEdge implements Edge {\n    cursor: String!\n    node: Game\n  }\n\n  type Game implements Node {\n    id: ID!\n    name: String\n  }\n\n  type Casino implements Node {\n    id: ID!\n    name: String\n    address: String\n    zipcode: String\n    city: String\n    country: String\n    games(\n      allEdges: Boolean\n      before: String\n      after: String\n      first: Int\n      last: Int\n    ): GameConnection\n  }\n\n  type Query {\n    node(id: ID!): Node\n  }\n"])));

var delay = function delay(duration) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, duration);
  });
};

var server = new _apolloServer.ApolloServer({
  context: function () {
    var _context2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_context) {
      return regeneratorRuntime.wrap(function _callee$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return delay(3000);

            case 2:
              return _context3.abrupt("return", _context);

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee);
    }));

    function context(_x) {
      return _context2.apply(this, arguments);
    }

    return context;
  }(),
  subscriptions: '/subscriptions',
  typeDefs: typeDefs,
  // resolvers,
  mocks: process.env.NODE_ENV === 'development' && _mocks["default"]
});

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  var httpServer;
  return regeneratorRuntime.wrap(function _callee2$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return server.listen();

        case 2:
          httpServer = _context4.sent;
          console.log("\uD83D\uDE80 Server ready at ".concat(httpServer.url));

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee2);
}))();