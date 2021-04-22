"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _apolloServer = require("apollo-server");

var _casual = _interopRequireDefault(require("casual"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_casual["default"].register_provider({
  game: function game() {
    return _casual["default"].random_element(['Slot', 'Table']);
  }
});

var _default = {
  Date: function (_Date) {
    function Date() {
      return _Date.apply(this, arguments);
    }

    Date.toString = function () {
      return _Date.toString();
    };

    return Date;
  }(function () {
    return new Date(529542000000 * Math.random() - Date.now());
  }),
  Casino: function Casino() {
    return {
      name: _casual["default"].company_name,
      address: _casual["default"].street,
      zipcode: _casual["default"].zip(5),
      city: _casual["default"].city,
      country: _casual["default"].country
    };
  },
  PageInfo: function PageInfo() {
    return {
      startCursor: _casual["default"].uuid,
      endCursor: _casual["default"].uuid
    };
  },
  Edge: function Edge() {
    return {
      cursor: _casual["default"].uuid
    };
  },
  Query: function Query() {
    return {};
  }
};
exports["default"] = _default;