window.move || (window.move = function() {
  typeof window.global == "undefined" && (window.global = window);
  var Require = function(b) {
    function h(a, b, c) {
      typeof b == "function" && (c = b, b = null);
      var d = {
        block: c
      };
      f(d, "id", String(a)), b && f(d, "uri", String(b)), g.modules[d.id] = d;
      return d;
    }
    function g(a, b, c) {
      var e = a;
      if (a.charAt(0) === ".") {
        c && c.indexOf(b + "/index") !== -1 && (b += "/index");
        var h = a;
        a = d(a, b);
      }
      if (!g.modules.hasOwnProperty(a)) throw new Error("Module not found " + JSON.stringify(e));
      var i = g.modules[a];
      if (i.exports === undefined) {
        var j = function(b) {
          return g(b, a, i.uri);
        };
        f(j, "main", g.main);
        var k = i.block;
        delete i.block, i.exports = {}, g.initFilter && (k = g.initFilter(k)), k(j, i, i.exports);
      }
      return i.exports;
    }
    function e(a, b) {
      if (!/^\w+:/.test(a)) {
        var d = b.protocol + "//" + b.hostname;
        b.port && b.port !== 80 && (d += ":" + b.port);
        var e = b.pathname;
        a.charAt(0) === "/" ? a = d + c(a.split("/")).join("/") : (e += (e.charAt(e.length - 1) === "/" ? "" : "/../") + a, a = d + c(e.split("/")).join("/"));
      }
      return a;
    }
    function d(a, b) {
      a = a.replace(/\/+$/g, "");
      var d = (b ? b + "/../" + a : a).split("/");
      return c(d).join("/");
    }
    function c(a) {
      var b = 0;
      for (var c = a.length; c >= 0; c--) {
        var d = a[c];
        d == "." ? a.splice(c, 1) : d === ".." ? (a.splice(c, 1), b++) : b && (a.splice(c, 1), b--);
      }
      return a;
    }
    var f;
    Object.defineProperty ? f = function(a, b, c) {
      Object.defineProperty(a, b, {
        value: c,
        writable: !1,
        enumerable: !0,
        configurable: !1
      });
    } : f = function(a, b, c) {
      a[b] = c;
    }, g.modules = {};
    var i = h("");
    delete i.block, i.exports = b || {}, f(g, "main", i), g.define = h;
    return g;
  }, module, modules = {}, _require = Require();
  _require.define("runtime/es5_array", "runtime/es5_array.js", function(a, b, c, d, e) {
    Array.isArray || (Array.isArray = function(b) {
      return b instanceof Array || Object.prototype.toString.call(b) === "[object Array]";
    }), Array.prototype.indexOf || (Array.prototype.indexOf = function(b, c) {
      var d, e = this.length;
      for (d = +c || 0; d < e; ++d) if (this[d] === b) return d;
      return -1;
    }), Array.prototype.lastIndexOf || (Array.prototype.lastIndexOf = function(b, c) {
      var d = Math.min(this.length, +c || 0);
      for (; d !== -1; --d) if (this[d] === b) return d;
      return -1;
    }), Array.prototype.filter || (Array.prototype.filter = function(b, c) {
      var d = [];
      for (var e = 0; e < this.length; e++) b.call(c, this[e]) && d.push(this[e]);
      return d;
    }), Array.prototype.forEach || (Array.prototype.forEach = function(b, c) {
      var d = this.length >>> 0;
      for (var e = 0; e < d; ++e) e in this && b.call(c, this[e], e, this);
    }), Array.prototype.every || (Array.prototype.every = function(b, c) {
      var d = this.length >>> 0;
      for (var e = 0; e < d; ++e) if (e in this && !b.call(c, this[e], e, this)) return !1;
      return !0;
    }), Array.prototype.some || (Array.prototype.some = function(b, c) {
      var d = this.length >>> 0;
      for (var e = 0; e < d; ++e) if (e in this && b.call(c, this[e], e, this)) return !0;
      return !1;
    }), Array.prototype.map || (Array.prototype.map = function(b, c) {
      var d = this.length >>> 0, e = Array(d);
      for (var f = 0; f < d; ++f) e[f] = b.call(c, this[f], f, this);
      return e;
    }), Array.prototype.reduce || (Array.prototype.reduce = function(b) {
      var c = this.length >>> 0, d = 0, e;
      if (c === 0 && arguments.length === 1) throw new TypeError;
      if (arguments.length >= 2) e = arguments[1]; else do {
        if (d in this) {
          e = this[d++];
          break;
        }
        if (++d >= c) throw new TypeError;
      } while (!0);
      for (; d < c; d++) d in this && (e = b.call(null, e, this[d], d, this));
      return e;
    }), Array.prototype.unshift || (Array.prototype.unshift = function() {
      this.reverse();
      var a = arguments.length;
      while (a--) this.push(arguments[a]);
      this.reverse();
      return this.length;
    });
  }), _require.define("runtime/es5_date", "runtime/es5_date.js", function(a, b, c, d, e) {
    Date.now || (Date.now = function() {
      return (new Date).getTime();
    }), Date.prototype.getTimezoneOffset || (Date.prototype.getTimezoneOffset = function() {
      if (this._timezoneOffsetStd === undefined) {
        var b = new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0, 0), c = b.toGMTString(), d = new Date(c.substring(0, c.lastIndexOf(" ") - 1));
        this._timezoneOffsetStd = (d - b) / 6e4;
      }
      return this._timezoneOffsetStd;
    });
  }), _require.define("runtime/es5_json", "runtime/es5_json.js", function(require, module, exports, __filename, __dirname) {
    var JSON = global.JSON;
    if (typeof JSON != "object" || typeof JSON.stringify != "function" || typeof JSON.parse != "function") JSON = global.JSON = {}, function() {
      function str(a, b) {
        var c, d, e, f, g = gap, h, i = b[a];
        i && typeof i == "object" && typeof i.toJSON == "function" && (i = i.toJSON(a)), typeof rep == "function" && (i = rep.call(b, a, i));
        switch (typeof i) {
         case "string":
          return quote(i);
         case "number":
          return isFinite(i) ? String(i) : "null";
         case "boolean":
         case "null":
          return String(i);
         case "object":
          if (!i) return "null";
          gap += indent, h = [];
          if (Object.prototype.toString.apply(i) === "[object Array]") {
            f = i.length;
            for (c = 0; c < f; c += 1) h[c] = str(c, i) || "null";
            e = h.length === 0 ? "[]" : gap ? "[\n" + gap + h.join(",\n" + gap) + "\n" + g + "]" : "[" + h.join(",") + "]", gap = g;
            return e;
          }
          if (rep && typeof rep == "object") {
            f = rep.length;
            for (c = 0; c < f; c += 1) d = rep[c], typeof d == "string" && (e = str(d, i), e && h.push(quote(d) + (gap ? ": " : ":") + e));
          } else for (d in i) Object.hasOwnProperty.call(i, d) && (e = str(d, i), e && h.push(quote(d) + (gap ? ": " : ":") + e));
          e = h.length === 0 ? "{}" : gap ? "{\n" + gap + h.join(",\n" + gap) + "\n" + g + "}" : "{" + h.join(",") + "}", gap = g;
          return e;
        }
      }
      function quote(a) {
        escapable.lastIndex = 0;
        return escapable.test(a) ? '"' + a.replace(escapable, function(a) {
          var b = meta[a];
          return typeof b == "string" ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + a + '"';
      }
      function f(a) {
        return a < 10 ? "0" + a : a;
      }
      "use strict", typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function(a) {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null;
      }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(a) {
        return this.valueOf();
      });
      var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
      }, rep;
      typeof JSON.stringify != "function" && (JSON.stringify = function(a, b, c) {
        var d;
        gap = "", indent = "";
        if (typeof c == "number") for (d = 0; d < c; d += 1) indent += " "; else typeof c == "string" && (indent = c);
        rep = b;
        if (b && typeof b != "function" && (typeof b != "object" || typeof b.length != "number")) throw new Error("JSON.stringify");
        return str("", {
          "": a
        });
      }), typeof JSON.parse != "function" && (JSON.parse = function(text, reviver) {
        function walk(a, b) {
          var c, d, e = a[b];
          if (e && typeof e == "object") for (c in e) Object.hasOwnProperty.call(e, c) && (d = walk(e, c), d !== undefined ? e[c] = d : delete e[c]);
          return reviver.call(a, b, e);
        }
        var j;
        text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(a) {
          return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        }));
        if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
          j = eval("(" + text + ")");
          return typeof reviver == "function" ? walk({
            "": j
          }, "") : j;
        }
        throw new SyntaxError("JSON.parse");
      });
    }();
  }), _require.define("runtime/es5_object", "runtime/es5_object.js", function(a, b, c, d, e) {
    var f = Array.prototype.slice.call;
    Object.create || (Object.create = function(b, c) {
      var d = function() {
        c && Object.defineProperties && Object.defineProperties(this, c);
      };
      d.prototype = b;
      return new d;
    }), Object.keys || (Object.keys = function a(b) {
      var a = [];
      for (var c in b) a.push(c);
      return a;
    }), Object.getOwnPropertyNames || (Object.getOwnPropertyNames = function() {
      return Object.keys.apply(this, f(arguments));
    }), Object.getOwnPropertyDescriptor || (Object.getOwnPropertyDescriptor = function(b, c) {
      if (b.hasOwnProperty(c)) return {
        configurable: !0,
        enumerable: !0,
        value: b[c],
        writable: !0
      };
    }), Object.prototype.hasOwnProperty || (Object.prototype.hasOwnProperty = function(a) {
      return a in this;
    }), Object.defineProperty || Object.prototype.__defineGetter__ && Object.prototype.__defineSetter__ && (Object.defineProperty = function(a, b, c) {
      if (typeof c == "object") if (c.hasOwnProperty("value")) {
        !a.__lookupGetter__(b) && !a.__lookupSetter__(b) && (a[b] = c.value);
        if (c.hasOwnProperty("get") || c.hasOwnProperty("set")) throw new TypeError("Object doesn't support this action");
      } else typeof c.get == "function" && a.__defineGetter__(b, c.get), typeof c.set == "function" && a.__defineSetter__(b, c.set);
      return a;
    }), !Object.defineProperties && Object.defineProperty && (Object.defineProperties = function(a, b) {
      for (var c in b) Object.defineProperty(a, c, b[c]);
    });
  }), _require.define("runtime/es5_string", "runtime/es5_string.js", function(a, b, c, d, e) {
    String.prototype.trim || (String.prototype.trim = function() {
      return this.replace(/^(?:\s|\u00A0)+/, "").replace(/(?:\s|\u00A0)+$/, "");
    }), String.prototype.trimLeft || (String.prototype.trimLeft = function() {
      return this.replace(/^(?:\s|\u00A0)+/, "");
    }), String.prototype.trimRight || (String.prototype.trimRight = function() {
      return this.replace(/(?:\s|\u00A0)+$/, "");
    });
  }), _require.define("runtime", "runtime/index.js", function(a, b, c, d, e) {
    a("./runtime_string"), global.__move || (global.__move = {}), global.__move.runtime = {
      _MoveKWArgsT: a("./symbols")._MoveKWArgsT
    }, global.__move.runtime = a("./runtime_move");
  }), _require.define("runtime/runtime_array", "runtime/runtime_array.js", function(a, b, c, d, e) {
    typeof Array.prototype.unique != "function" && (Array.prototype.unique = function() {
      var b = [], c, d, e = this.length;
      for (c = 0; c < e; ++c) {
        for (d = c + 1; d < e; ++d) this[c] === this[d] && (d = ++c);
        b.push(this[c]);
      }
      return b;
    });
    if (typeof Array.prototype._move_setSlice != "function") {
      var f = Array.prototype.splice;
      Array.prototype._move_setSlice = function(b, c, d) {
        var e;
        if (c !== undefined) {
          if (typeof c != "number") throw new TypeError("Second argument must be a number");
          e = c - b;
        } else e = this.length;
        return f.apply(this, [ b, e ].concat(d));
      };
    }
  }), _require.define("runtime/runtime_date", "runtime/runtime_date.mv", function(a, b, c, d, e) {
    (function() {
      "use strict";
      var a, b, c, d, e, f, g, h, i;
      a = __move.runtime, b = a._MoveKWArgsT, c = a.Text, d = a.extend, e = a.create, f = a.print, g = a.repeat, h = a.after, i = a.JSON, Date.distantFuture === undefined && (Date.distantFuture = new Date(359753450957352)), Date.distantPast === undefined && (Date.distantPast = new Date(-621356868e5)), Date.nowUTC || (Date.nowUTC = function() {
        return (new Date).getUTCTime();
      }), Date.prototype.getUTCTime || (Date.prototype.getUTCTime = function() {
        return this.getTime() - this.getTimezoneOffset();
      });
      if (!Date.prototype.getUTCComponents) return Date.prototype.getUTCComponents = function() {
        return [ this.getUTCFullYear(), this.getUTCMonth() + 1, this.getUTCDate(), this.getUTCHours(), this.getUTCMinutes(), this.getUTCSeconds(), this.getUTCMilliseconds() ];
      };
    })();
  }), _require.define("runtime/runtime_inspect", "runtime/runtime_inspect.js", function(a, b, c, d, e) {
    function h(a) {
      if (a instanceof Date) return !0;
      if (typeof a != "object") return !1;
      var b = Date.prototype && Object.getOwnPropertyNames(Date.prototype), c = a.__proto__ && Object.getOwnPropertyNames(a.__proto__);
      return JSON.stringify(c) === JSON.stringify(b);
    }
    function g(a) {
      var b = "" + a;
      return a instanceof RegExp || typeof a == "function" && a.constructor.name === "RegExp" && a.compile && a.test && a.exec && b.match(/^\/.*\/[gim]{0,3}$/);
    }
    function f(a) {
      return a instanceof Array || Array.isArray(a) || a && a !== Object.prototype && f(a.prototype);
    }
    c.inspect = function(a, b, d, e) {
      function k(a, d) {
        if (a && typeof a.inspect == "function" && a !== c && a.inspect !== c.inspect && (!a.constructor || a.constructor.prototype !== a)) return a.inspect(d);
        switch (typeof a) {
         case "undefined":
          return j("undefined", "undefined");
         case "string":
          var e = JSON.stringify(a).replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
          return j(e, "string");
         case "number":
          return j("" + a, "number");
         case "boolean":
          return j("" + a, "boolean");
        }
        if (a === null) return j("null", "null");
        var l = Object.keys(a), m = b ? Object.getOwnPropertyNames(a) : l;
        if (typeof a == "function" && m.length === 0) {
          if (g(a)) return j("" + a, "regexp");
          var n = a.name ? ": " + a.name : "";
          return j("[Function" + n + "]", "special");
        }
        if (h(a) && m.length === 0) return j(a.toUTCString(), "date");
        var o, p, q;
        f(a) ? (p = "Array", q = [ "[", "]" ]) : (p = "Object", q = [ "{", "}" ]);
        if (typeof a == "function") {
          var r = a.name ? ": " + a.name : "";
          o = g(a) ? " " + a : " [Function" + r + "]";
        } else o = "";
        h(a) && (o = " " + a.toUTCString());
        if (m.length === 0) return q[0] + o + q[1];
        if (d < 0) return g(a) ? j("" + a, "regexp") : j("[Object]", "special");
        i.push(a);
        var s = m.map(function(b) {
          var c, e;
          a.__lookupGetter__ && (a.__lookupGetter__(b) ? a.__lookupSetter__(b) ? e = j("[Getter/Setter]", "special") : e = j("[Getter]", "special") : a.__lookupSetter__(b) && (e = j("[Setter]", "special"))), l.indexOf(b) < 0 && (c = "[" + b + "]"), e || (i.indexOf(a[b]) < 0 ? (d === null ? e = k(a[b]) : e = k(a[b], d - 1), e.indexOf("\n") > -1 && (f(a) ? e = e.split("\n").map(function(a) {
            return "  " + a;
          }).join("\n").substr(2) : e = "\n" + e.split("\n").map(function(a) {
            return "   " + a;
          }).join("\n"))) : e = j("[Circular]", "special"));
          if (typeof c == "undefined") {
            if (p === "Array" && b.match(/^\d+$/)) return e;
            c = JSON.stringify("" + b), c.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (c = c.substr(1, c.length - 2), c = j(c, "name")) : (c = c.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), c = j(c, "string"));
          }
          return c + ": " + e;
        });
        i.pop();
        var t = 0, u = s.reduce(function(a, b) {
          t++, b.indexOf("\n") >= 0 && t++;
          return a + b.length + 1;
        }, 0);
        u > 50 ? s = q[0] + (o === "" ? "" : o + "\n ") + " " + s.join(",\n  ") + " " + q[1] : s = q[0] + o + " " + s.join(", ") + " " + q[1];
        return s;
      }
      var i = [], j = function(a, b) {
        return a;
      };
      return k(a, typeof d == "undefined" ? 2 : d);
    };
  }), _require.define("runtime/runtime_move", "runtime/runtime_move.mv", function(a, b, c, d, e) {
    (function() {
      "use strict";
      var b, d, e, f, g, h, i, j, k, l, m, f, g, i, j, n, o, p;
      b = __move.runtime, d = b._MoveKWArgsT, e = b.Text, f = b.extend, g = b.create, h = b.print, i = b.repeat, j = b.after, k = b.JSON, d = global.__move.runtime._MoveKWArgsT, global.__move.runtime = c, l = typeof process != "undefined" && !!(typeof process.versions == "object" && process.versions.node || process.pid), l || (a("./es5_object"), a("./es5_array"), a("./es5_date"), a("./es5_json")), a("./runtime_object"), a("./runtime_string"), a("./runtime_date"), a("./runtime_array"), Object.defineProperty ? m = function(b, c, e) {
        b !== null && typeof b == "object" && b.__kw === d && (arguments.keywords = b, e = b.value, c = b.name, b = b.obj);
        return Object.defineProperty(b, c, {
          value: e,
          writable: !1,
          enumerable: !0,
          configurable: !1
        });
      } : m = function(b, c, e) {
        b !== null && typeof b == "object" && b.__kw === d && (arguments.keywords = b, e = b.value, c = b.name, b = b.obj);
        return b[c] = e;
      }, m(c, "_MoveKWArgsT", d), m(c, "Text", String), String.prototype.toText = String.prototype.toString, c.extend = f = function(b, c) {
        b !== null && typeof b == "object" && b.__kw === d && (arguments.keywords = b, c = b.body, b = b.object);
        var e;
        e = c === null ? "undefined" : typeof c;
        if (e === "object") Object.keys(c).forEach(function(a) {
          a !== null && typeof a == "object" && a.__kw === d && (arguments.keywords = a, a = a.key);
          return b[a] = c[a];
        }); else if (e === "function") c.call(b); else if (e !== "undefined") throw new TypeError('"body" argument must be either an object or a function, not a ' + e);
        return b;
      }, c.create = g = function(b, c) {
        b !== null && typeof b == "object" && b.__kw === d && (arguments.keywords = b, c = b.body, b = b.prototype);
        return f(Object.create(b), c);
      };
      if (typeof Object.inspect != "function") try {
        Object.inspect = a("util").inspect;
        if (typeof Object.inspect != "function") throw 1;
      } catch (q) {
        Object.inspect = a("./runtime_inspect").inspect;
      }
      typeof console != "undefined" && console.log ? typeof window != "undefined" ? (c.print = function a() {
        return a.consoleFun.apply(console, Array.prototype.slice.call(arguments));
      }, c.print.consoleFun = console.log) : c.print = console.log : c.print = function() {}, c.repeat = i = function(b, c, e) {
        b !== null && typeof b == "object" && b.__kw === d && (arguments.keywords = b, e = b.block, c = b.every, b = b.times);
        var f, g;
        if (typeof b == "function") {
          for (;;) if (!b()) break;
        } else {
          if (typeof e != "function") return function(a) {
            a !== null && typeof a == "object" && a.__kw === d && (arguments.keywords = a, a = a.block);
            if (b !== undefined) {
              for (f = 0; f < b; ++f) if (a(f) === !0) break;
            } else {
              if (c !== undefined) {
                g = Object.create({}, {
                  cancel: {
                    value: function() {
                      return clearInterval(this.id);
                    }
                  }
                }), g.id = setInterval(function() {
                  return a(g);
                }, c);
                return g;
              }
              for (;;) if (!a()) break;
            }
          };
          if (b !== undefined) {
            for (f = 0; f < b; ++f) if (e(f) === !0) break;
          } else {
            if (c !== undefined) {
              g = Object.create({}, {
                cancel: {
                  value: function() {
                    return clearInterval(this.id);
                  }
                }
              }), g.id = setInterval(function() {
                return e(g);
              }, c);
              return g;
            }
            for (;;) if (!e()) break;
          }
        }
      }, c.after = j = function(b, c) {
        b !== null && typeof b == "object" && b.__kw === d && (arguments.keywords = b, c = b.date, b = b.delay);
        if (b) {
          if (typeof b != "number") throw new TypeError('"delay" argument must be a number');
        } else if (c) {
          if (typeof c == "string" || typeof c == "number") {
            c = new Date(c);
            if (isNaN(c.getTime())) throw new Error('Invalid date/time passed for "date" argument');
          } else if (typeof c != "object" || !(c instanceof Date)) throw new TypeError('"date" argument must be a Date object or a string');
          b = Math.max(0, c.getTime() - (new Date).getTime());
        }
        return function(a) {
          a !== null && typeof a == "object" && a.__kw === d && (arguments.keywords = a, a = a.block);
          return setTimeout(a, b);
        };
      }, k = global.JSON, n = function(b, c) {
        b !== null && typeof b == "object" && b.__kw === d && (arguments.keywords = b, c = b.parse, b = b.build);
        if (b !== undefined) return k.stringify(b);
        if (c !== undefined) return k.parse(c);
        throw new TypeError('Expected either "parse" or "build" argument');
      }, n.parse = k.parse, n.stringify = k.stringify, c.JSON = n, o = function(b, c) {
        b !== null && typeof b == "object" && b.__kw === d && (arguments.keywords = b, c = b.propertyName, b = b.target);
        var e, f;
        e = b[c], f = function(b, c) {
          b !== null && typeof b == "object" && b.__kw === d && (arguments.keywords = b, c = b.call, b = b.event);
          var f;
          if (c) return e.call(this, b, c);
          f = this;
          return function(a) {
            a !== null && typeof a == "object" && a.__kw === d && (arguments.keywords = a, a = a.block);
            return e.call(f, b, a);
          };
        };
        return b[c] = f;
      };
      try {
        p = a("events");
      } catch (q) {}
      p && p.EventEmitter && (o(p.EventEmitter.prototype, "addListener"), p.EventEmitter.prototype.on = p.EventEmitter.prototype.addListener);
      if (typeof process != "undefined" && typeof process.on == "function") return o(process, "on");
    })();
  }), _require.define("runtime/runtime_object", "runtime/runtime_object.js", function(a, b, c, d, e) {
    if (!Object.prototype.forEach) {
      var f = function(b, c) {
        c !== null && typeof c != "object" && (c = this);
        var d = this;
        Object.keys(this).forEach(function(a) {
          b.call(c, a, d[a], d);
        });
        return this;
      };
      Object.defineProperty && Object.defineProperty(Object.prototype, "forEach", {
        value: f
      });
    }
  }), _require.define("runtime/runtime_string", "runtime/runtime_string.js", function(a, b, c, d, e) {
    String.prototype.repeat || (String.prototype.repeat = function(b) {
      s = "";
      while (b--) s += this;
      return s;
    }), String.prototype.padLeft || (String.prototype.padLeft = function(b, c) {
      if (this.length >= b) return this;
      return String(c || " ").repeat(b - this.length) + this;
    }), String.prototype.padRight || (String.prototype.padRight = function(b, c) {
      if (this.length >= b) return this;
      return this + String(c || " ").repeat(b - this.length);
    }), String.prototype.editDistance || (String.prototype.editDistance = function(b) {
      var c, d = (c = this.split("")).length, e = (b = b.split("")).length, f, g, h, i;
      if (!d && !e) return Math.max(d, e);
      for (var j = [], f = d + 1; f; j[--f] = [ f ]) ;
      for (f = e + 1; j[0][--f] = f; ) ;
      for (f = -1, h = c.length; ++f < h; ) for (g = -1, i = b.length; ++g < i; ) j[(f *= 1) + 1][(g *= 1) + 1] = Math.min(j[f][g + 1] + 1, j[f + 1][g] + 1, j[f][g] + (c[f] != b[g]));
      return j[d][e];
    }), String.prototype.matchAll || (String.prototype.matchAll = function(b) {
      "use strict", b instanceof RegExp ? b.global || (b = new RegExp(b.source, "g")) : b = new RegExp(b, "g");
      var c, d = [];
      while (c = b.exec(this)) d.push(c);
      return d;
    }), String.prototype.forEachMatch || (String.prototype.forEachMatch = function(b, c, d) {
      "use strict", d || (d = this), this.matchAll(b).forEach(c, d);
      return d;
    }), typeof String.prototype.toLocaleLowerCase == "function" && (String.prototype.toLowerCase = String.prototype.toLocaleLowerCase), typeof String.prototype.toLocaleUpperCase == "function" && (String.prototype.toUpperCase = String.prototype.toLocaleUpperCase);
  }), _require.define("runtime/symbols", "runtime/symbols.js", function(a, b, c, d, e) {
    c._MoveKWArgsT = function a(b) {
      b.__kw = a;
      return b;
    };
  }), _require("runtime");
  var move = global.__move;
  move.version = function() {
    return "0.3.2";
  }, move.require = Require();
  return move;
}());
__move.require.define("foo","foo.mv",function(require,module,exports){
  var Move, _MoveKWArgsT, Text, extend, create, print, repeat, after, JSON, EHTML, bar;
  Move = __move.runtime, _MoveKWArgsT = Move._MoveKWArgsT, Text = Move.Text, extend = Move.extend, create = Move.create, print = Move.print, repeat = Move.repeat, after = Move.after, JSON = Move.JSON;
  EHTML = __move.EHTML;
  exports.bar = bar = function bar(name) {
    name !== null && typeof name === "object" && name.__kw === _MoveKWArgsT && (arguments.keywords = name, name = name.name);
    if (name === undefined) name = "John";
    return "This is bar, with my friend " + name;
  };
});
__move.require.define("","index.mv",function(require,module,exports){
  var Move, _MoveKWArgsT, Text, extend, create, print, repeat, after, JSON, EHTML, foo;
  Move = __move.runtime, _MoveKWArgsT = Move._MoveKWArgsT, Text = Move.Text, extend = Move.extend, create = Move.create, print = Move.print, repeat = Move.repeat, after = Move.after, JSON = Move.JSON;
  EHTML = __move.EHTML;
  foo = require("foo");
  print("foo ->", foo);
  print("foo.bar() ->", foo.bar());
  return print('foo.bar "Rob" ->', foo.bar("Rob"));
});__move.require("");