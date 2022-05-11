import {
  useFetcher
} from "/_static/build/_shared/chunk-DCY7QVKG.js";
import {
  React,
  __commonJS,
  __toESM,
  init_react,
  require_object_assign,
  require_react
} from "/_static/build/_shared/chunk-EFCEJN5Z.js";

// node_modules/prismjs/prism.js
var require_prism = __commonJS({
  "node_modules/prismjs/prism.js"(exports, module) {
    init_react();
    var _self = typeof window !== "undefined" ? window : typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope ? self : {};
    var Prism3 = function(_self2) {
      var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
      var uniqueId = 0;
      var plainTextGrammar = {};
      var _ = {
        manual: _self2.Prism && _self2.Prism.manual,
        disableWorkerMessageHandler: _self2.Prism && _self2.Prism.disableWorkerMessageHandler,
        util: {
          encode: function encode(tokens) {
            if (tokens instanceof Token) {
              return new Token(tokens.type, encode(tokens.content), tokens.alias);
            } else if (Array.isArray(tokens)) {
              return tokens.map(encode);
            } else {
              return tokens.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
            }
          },
          type: function(o) {
            return Object.prototype.toString.call(o).slice(8, -1);
          },
          objId: function(obj) {
            if (!obj["__id"]) {
              Object.defineProperty(obj, "__id", { value: ++uniqueId });
            }
            return obj["__id"];
          },
          clone: function deepClone(o, visited) {
            visited = visited || {};
            var clone;
            var id;
            switch (_.util.type(o)) {
              case "Object":
                id = _.util.objId(o);
                if (visited[id]) {
                  return visited[id];
                }
                clone = {};
                visited[id] = clone;
                for (var key in o) {
                  if (o.hasOwnProperty(key)) {
                    clone[key] = deepClone(o[key], visited);
                  }
                }
                return clone;
              case "Array":
                id = _.util.objId(o);
                if (visited[id]) {
                  return visited[id];
                }
                clone = [];
                visited[id] = clone;
                o.forEach(function(v, i) {
                  clone[i] = deepClone(v, visited);
                });
                return clone;
              default:
                return o;
            }
          },
          getLanguage: function(element) {
            while (element) {
              var m = lang.exec(element.className);
              if (m) {
                return m[1].toLowerCase();
              }
              element = element.parentElement;
            }
            return "none";
          },
          setLanguage: function(element, language) {
            element.className = element.className.replace(RegExp(lang, "gi"), "");
            element.classList.add("language-" + language);
          },
          currentScript: function() {
            if (typeof document === "undefined") {
              return null;
            }
            if ("currentScript" in document && 1 < 2) {
              return document.currentScript;
            }
            try {
              throw new Error();
            } catch (err) {
              var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];
              if (src) {
                var scripts = document.getElementsByTagName("script");
                for (var i in scripts) {
                  if (scripts[i].src == src) {
                    return scripts[i];
                  }
                }
              }
              return null;
            }
          },
          isActive: function(element, className, defaultActivation) {
            var no = "no-" + className;
            while (element) {
              var classList = element.classList;
              if (classList.contains(className)) {
                return true;
              }
              if (classList.contains(no)) {
                return false;
              }
              element = element.parentElement;
            }
            return !!defaultActivation;
          }
        },
        languages: {
          plain: plainTextGrammar,
          plaintext: plainTextGrammar,
          text: plainTextGrammar,
          txt: plainTextGrammar,
          extend: function(id, redef) {
            var lang2 = _.util.clone(_.languages[id]);
            for (var key in redef) {
              lang2[key] = redef[key];
            }
            return lang2;
          },
          insertBefore: function(inside, before, insert, root) {
            root = root || _.languages;
            var grammar = root[inside];
            var ret = {};
            for (var token in grammar) {
              if (grammar.hasOwnProperty(token)) {
                if (token == before) {
                  for (var newToken in insert) {
                    if (insert.hasOwnProperty(newToken)) {
                      ret[newToken] = insert[newToken];
                    }
                  }
                }
                if (!insert.hasOwnProperty(token)) {
                  ret[token] = grammar[token];
                }
              }
            }
            var old = root[inside];
            root[inside] = ret;
            _.languages.DFS(_.languages, function(key, value) {
              if (value === old && key != inside) {
                this[key] = ret;
              }
            });
            return ret;
          },
          DFS: function DFS(o, callback, type, visited) {
            visited = visited || {};
            var objId = _.util.objId;
            for (var i in o) {
              if (o.hasOwnProperty(i)) {
                callback.call(o, i, o[i], type || i);
                var property = o[i];
                var propertyType = _.util.type(property);
                if (propertyType === "Object" && !visited[objId(property)]) {
                  visited[objId(property)] = true;
                  DFS(property, callback, null, visited);
                } else if (propertyType === "Array" && !visited[objId(property)]) {
                  visited[objId(property)] = true;
                  DFS(property, callback, i, visited);
                }
              }
            }
          }
        },
        plugins: {},
        highlightAll: function(async, callback) {
          _.highlightAllUnder(document, async, callback);
        },
        highlightAllUnder: function(container, async, callback) {
          var env = {
            callback,
            container,
            selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
          };
          _.hooks.run("before-highlightall", env);
          env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));
          _.hooks.run("before-all-elements-highlight", env);
          for (var i = 0, element; element = env.elements[i++]; ) {
            _.highlightElement(element, async === true, env.callback);
          }
        },
        highlightElement: function(element, async, callback) {
          var language = _.util.getLanguage(element);
          var grammar = _.languages[language];
          _.util.setLanguage(element, language);
          var parent = element.parentElement;
          if (parent && parent.nodeName.toLowerCase() === "pre") {
            _.util.setLanguage(parent, language);
          }
          var code = element.textContent;
          var env = {
            element,
            language,
            grammar,
            code
          };
          function insertHighlightedCode(highlightedCode) {
            env.highlightedCode = highlightedCode;
            _.hooks.run("before-insert", env);
            env.element.innerHTML = env.highlightedCode;
            _.hooks.run("after-highlight", env);
            _.hooks.run("complete", env);
            callback && callback.call(env.element);
          }
          _.hooks.run("before-sanity-check", env);
          parent = env.element.parentElement;
          if (parent && parent.nodeName.toLowerCase() === "pre" && !parent.hasAttribute("tabindex")) {
            parent.setAttribute("tabindex", "0");
          }
          if (!env.code) {
            _.hooks.run("complete", env);
            callback && callback.call(env.element);
            return;
          }
          _.hooks.run("before-highlight", env);
          if (!env.grammar) {
            insertHighlightedCode(_.util.encode(env.code));
            return;
          }
          if (async && _self2.Worker) {
            var worker = new Worker(_.filename);
            worker.onmessage = function(evt) {
              insertHighlightedCode(evt.data);
            };
            worker.postMessage(JSON.stringify({
              language: env.language,
              code: env.code,
              immediateClose: true
            }));
          } else {
            insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
          }
        },
        highlight: function(text, grammar, language) {
          var env = {
            code: text,
            grammar,
            language
          };
          _.hooks.run("before-tokenize", env);
          if (!env.grammar) {
            throw new Error('The language "' + env.language + '" has no grammar.');
          }
          env.tokens = _.tokenize(env.code, env.grammar);
          _.hooks.run("after-tokenize", env);
          return Token.stringify(_.util.encode(env.tokens), env.language);
        },
        tokenize: function(text, grammar) {
          var rest = grammar.rest;
          if (rest) {
            for (var token in rest) {
              grammar[token] = rest[token];
            }
            delete grammar.rest;
          }
          var tokenList = new LinkedList();
          addAfter(tokenList, tokenList.head, text);
          matchGrammar(text, tokenList, grammar, tokenList.head, 0);
          return toArray(tokenList);
        },
        hooks: {
          all: {},
          add: function(name, callback) {
            var hooks = _.hooks.all;
            hooks[name] = hooks[name] || [];
            hooks[name].push(callback);
          },
          run: function(name, env) {
            var callbacks = _.hooks.all[name];
            if (!callbacks || !callbacks.length) {
              return;
            }
            for (var i = 0, callback; callback = callbacks[i++]; ) {
              callback(env);
            }
          }
        },
        Token
      };
      _self2.Prism = _;
      function Token(type, content, alias, matchedStr) {
        this.type = type;
        this.content = content;
        this.alias = alias;
        this.length = (matchedStr || "").length | 0;
      }
      Token.stringify = function stringify(o, language) {
        if (typeof o == "string") {
          return o;
        }
        if (Array.isArray(o)) {
          var s = "";
          o.forEach(function(e) {
            s += stringify(e, language);
          });
          return s;
        }
        var env = {
          type: o.type,
          content: stringify(o.content, language),
          tag: "span",
          classes: ["token", o.type],
          attributes: {},
          language
        };
        var aliases = o.alias;
        if (aliases) {
          if (Array.isArray(aliases)) {
            Array.prototype.push.apply(env.classes, aliases);
          } else {
            env.classes.push(aliases);
          }
        }
        _.hooks.run("wrap", env);
        var attributes = "";
        for (var name in env.attributes) {
          attributes += " " + name + '="' + (env.attributes[name] || "").replace(/"/g, "&quot;") + '"';
        }
        return "<" + env.tag + ' class="' + env.classes.join(" ") + '"' + attributes + ">" + env.content + "</" + env.tag + ">";
      };
      function matchPattern(pattern, pos, text, lookbehind) {
        pattern.lastIndex = pos;
        var match = pattern.exec(text);
        if (match && lookbehind && match[1]) {
          var lookbehindLength = match[1].length;
          match.index += lookbehindLength;
          match[0] = match[0].slice(lookbehindLength);
        }
        return match;
      }
      function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
        for (var token in grammar) {
          if (!grammar.hasOwnProperty(token) || !grammar[token]) {
            continue;
          }
          var patterns = grammar[token];
          patterns = Array.isArray(patterns) ? patterns : [patterns];
          for (var j = 0; j < patterns.length; ++j) {
            if (rematch && rematch.cause == token + "," + j) {
              return;
            }
            var patternObj = patterns[j];
            var inside = patternObj.inside;
            var lookbehind = !!patternObj.lookbehind;
            var greedy = !!patternObj.greedy;
            var alias = patternObj.alias;
            if (greedy && !patternObj.pattern.global) {
              var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
              patternObj.pattern = RegExp(patternObj.pattern.source, flags + "g");
            }
            var pattern = patternObj.pattern || patternObj;
            for (var currentNode = startNode.next, pos = startPos; currentNode !== tokenList.tail; pos += currentNode.value.length, currentNode = currentNode.next) {
              if (rematch && pos >= rematch.reach) {
                break;
              }
              var str = currentNode.value;
              if (tokenList.length > text.length) {
                return;
              }
              if (str instanceof Token) {
                continue;
              }
              var removeCount = 1;
              var match;
              if (greedy) {
                match = matchPattern(pattern, pos, text, lookbehind);
                if (!match || match.index >= text.length) {
                  break;
                }
                var from = match.index;
                var to = match.index + match[0].length;
                var p = pos;
                p += currentNode.value.length;
                while (from >= p) {
                  currentNode = currentNode.next;
                  p += currentNode.value.length;
                }
                p -= currentNode.value.length;
                pos = p;
                if (currentNode.value instanceof Token) {
                  continue;
                }
                for (var k = currentNode; k !== tokenList.tail && (p < to || typeof k.value === "string"); k = k.next) {
                  removeCount++;
                  p += k.value.length;
                }
                removeCount--;
                str = text.slice(pos, p);
                match.index -= pos;
              } else {
                match = matchPattern(pattern, 0, str, lookbehind);
                if (!match) {
                  continue;
                }
              }
              var from = match.index;
              var matchStr = match[0];
              var before = str.slice(0, from);
              var after = str.slice(from + matchStr.length);
              var reach = pos + str.length;
              if (rematch && reach > rematch.reach) {
                rematch.reach = reach;
              }
              var removeFrom = currentNode.prev;
              if (before) {
                removeFrom = addAfter(tokenList, removeFrom, before);
                pos += before.length;
              }
              removeRange(tokenList, removeFrom, removeCount);
              var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
              currentNode = addAfter(tokenList, removeFrom, wrapped);
              if (after) {
                addAfter(tokenList, currentNode, after);
              }
              if (removeCount > 1) {
                var nestedRematch = {
                  cause: token + "," + j,
                  reach
                };
                matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);
                if (rematch && nestedRematch.reach > rematch.reach) {
                  rematch.reach = nestedRematch.reach;
                }
              }
            }
          }
        }
      }
      function LinkedList() {
        var head = { value: null, prev: null, next: null };
        var tail = { value: null, prev: head, next: null };
        head.next = tail;
        this.head = head;
        this.tail = tail;
        this.length = 0;
      }
      function addAfter(list, node, value) {
        var next = node.next;
        var newNode = { value, prev: node, next };
        node.next = newNode;
        next.prev = newNode;
        list.length++;
        return newNode;
      }
      function removeRange(list, node, count) {
        var next = node.next;
        for (var i = 0; i < count && next !== list.tail; i++) {
          next = next.next;
        }
        node.next = next;
        next.prev = node;
        list.length -= i;
      }
      function toArray(list) {
        var array = [];
        var node = list.head.next;
        while (node !== list.tail) {
          array.push(node.value);
          node = node.next;
        }
        return array;
      }
      if (!_self2.document) {
        if (!_self2.addEventListener) {
          return _;
        }
        if (!_.disableWorkerMessageHandler) {
          _self2.addEventListener("message", function(evt) {
            var message = JSON.parse(evt.data);
            var lang2 = message.language;
            var code = message.code;
            var immediateClose = message.immediateClose;
            _self2.postMessage(_.highlight(code, _.languages[lang2], lang2));
            if (immediateClose) {
              _self2.close();
            }
          }, false);
        }
        return _;
      }
      var script = _.util.currentScript();
      if (script) {
        _.filename = script.src;
        if (script.hasAttribute("data-manual")) {
          _.manual = true;
        }
      }
      function highlightAutomaticallyCallback() {
        if (!_.manual) {
          _.highlightAll();
        }
      }
      if (!_.manual) {
        var readyState = document.readyState;
        if (readyState === "loading" || readyState === "interactive" && script && script.defer) {
          document.addEventListener("DOMContentLoaded", highlightAutomaticallyCallback);
        } else {
          if (window.requestAnimationFrame) {
            window.requestAnimationFrame(highlightAutomaticallyCallback);
          } else {
            window.setTimeout(highlightAutomaticallyCallback, 16);
          }
        }
      }
      return _;
    }(_self);
    if (typeof module !== "undefined" && module.exports) {
      module.exports = Prism3;
    }
    if (typeof globalThis !== "undefined") {
      globalThis.Prism = Prism3;
    }
    Prism3.languages.markup = {
      "comment": {
        pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
        greedy: true
      },
      "prolog": {
        pattern: /<\?[\s\S]+?\?>/,
        greedy: true
      },
      "doctype": {
        pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
        greedy: true,
        inside: {
          "internal-subset": {
            pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
            lookbehind: true,
            greedy: true,
            inside: null
          },
          "string": {
            pattern: /"[^"]*"|'[^']*'/,
            greedy: true
          },
          "punctuation": /^<!|>$|[[\]]/,
          "doctype-tag": /^DOCTYPE/i,
          "name": /[^\s<>'"]+/
        }
      },
      "cdata": {
        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
        greedy: true
      },
      "tag": {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
        greedy: true,
        inside: {
          "tag": {
            pattern: /^<\/?[^\s>\/]+/,
            inside: {
              "punctuation": /^<\/?/,
              "namespace": /^[^\s>\/:]+:/
            }
          },
          "special-attr": [],
          "attr-value": {
            pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
            inside: {
              "punctuation": [
                {
                  pattern: /^=/,
                  alias: "attr-equals"
                },
                /"|'/
              ]
            }
          },
          "punctuation": /\/?>/,
          "attr-name": {
            pattern: /[^\s>\/]+/,
            inside: {
              "namespace": /^[^\s>\/:]+:/
            }
          }
        }
      },
      "entity": [
        {
          pattern: /&[\da-z]{1,8};/i,
          alias: "named-entity"
        },
        /&#x?[\da-f]{1,8};/i
      ]
    };
    Prism3.languages.markup["tag"].inside["attr-value"].inside["entity"] = Prism3.languages.markup["entity"];
    Prism3.languages.markup["doctype"].inside["internal-subset"].inside = Prism3.languages.markup;
    Prism3.hooks.add("wrap", function(env) {
      if (env.type === "entity") {
        env.attributes["title"] = env.content.replace(/&amp;/, "&");
      }
    });
    Object.defineProperty(Prism3.languages.markup.tag, "addInlined", {
      value: function addInlined(tagName, lang) {
        var includedCdataInside = {};
        includedCdataInside["language-" + lang] = {
          pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
          lookbehind: true,
          inside: Prism3.languages[lang]
        };
        includedCdataInside["cdata"] = /^<!\[CDATA\[|\]\]>$/i;
        var inside = {
          "included-cdata": {
            pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
            inside: includedCdataInside
          }
        };
        inside["language-" + lang] = {
          pattern: /[\s\S]+/,
          inside: Prism3.languages[lang]
        };
        var def = {};
        def[tagName] = {
          pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
            return tagName;
          }), "i"),
          lookbehind: true,
          greedy: true,
          inside
        };
        Prism3.languages.insertBefore("markup", "cdata", def);
      }
    });
    Object.defineProperty(Prism3.languages.markup.tag, "addAttribute", {
      value: function(attrName, lang) {
        Prism3.languages.markup.tag.inside["special-attr"].push({
          pattern: RegExp(/(^|["'\s])/.source + "(?:" + attrName + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source, "i"),
          lookbehind: true,
          inside: {
            "attr-name": /^[^\s=]+/,
            "attr-value": {
              pattern: /=[\s\S]+/,
              inside: {
                "value": {
                  pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                  lookbehind: true,
                  alias: [lang, "language-" + lang],
                  inside: Prism3.languages[lang]
                },
                "punctuation": [
                  {
                    pattern: /^=/,
                    alias: "attr-equals"
                  },
                  /"|'/
                ]
              }
            }
          }
        });
      }
    });
    Prism3.languages.html = Prism3.languages.markup;
    Prism3.languages.mathml = Prism3.languages.markup;
    Prism3.languages.svg = Prism3.languages.markup;
    Prism3.languages.xml = Prism3.languages.extend("markup", {});
    Prism3.languages.ssml = Prism3.languages.xml;
    Prism3.languages.atom = Prism3.languages.xml;
    Prism3.languages.rss = Prism3.languages.xml;
    (function(Prism4) {
      var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
      Prism4.languages.css = {
        "comment": /\/\*[\s\S]*?\*\//,
        "atrule": {
          pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
          inside: {
            "rule": /^@[\w-]+/,
            "selector-function-argument": {
              pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
              lookbehind: true,
              alias: "selector"
            },
            "keyword": {
              pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
              lookbehind: true
            }
          }
        },
        "url": {
          pattern: RegExp("\\burl\\((?:" + string.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
          greedy: true,
          inside: {
            "function": /^url/i,
            "punctuation": /^\(|\)$/,
            "string": {
              pattern: RegExp("^" + string.source + "$"),
              alias: "url"
            }
          }
        },
        "selector": {
          pattern: RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + string.source + ")*(?=\\s*\\{)"),
          lookbehind: true
        },
        "string": {
          pattern: string,
          greedy: true
        },
        "property": {
          pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
          lookbehind: true
        },
        "important": /!important\b/i,
        "function": {
          pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
          lookbehind: true
        },
        "punctuation": /[(){};:,]/
      };
      Prism4.languages.css["atrule"].inside.rest = Prism4.languages.css;
      var markup = Prism4.languages.markup;
      if (markup) {
        markup.tag.addInlined("style", "css");
        markup.tag.addAttribute("style", "css");
      }
    })(Prism3);
    Prism3.languages.clike = {
      "comment": [
        {
          pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
          lookbehind: true,
          greedy: true
        },
        {
          pattern: /(^|[^\\:])\/\/.*/,
          lookbehind: true,
          greedy: true
        }
      ],
      "string": {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: true
      },
      "class-name": {
        pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
        lookbehind: true,
        inside: {
          "punctuation": /[.\\]/
        }
      },
      "keyword": /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
      "boolean": /\b(?:false|true)\b/,
      "function": /\b\w+(?=\()/,
      "number": /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
      "operator": /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
      "punctuation": /[{}[\];(),.:]/
    };
    Prism3.languages.javascript = Prism3.languages.extend("clike", {
      "class-name": [
        Prism3.languages.clike["class-name"],
        {
          pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
          lookbehind: true
        }
      ],
      "keyword": [
        {
          pattern: /((?:^|\})\s*)catch\b/,
          lookbehind: true
        },
        {
          pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
          lookbehind: true
        }
      ],
      "function": /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
      "number": {
        pattern: RegExp(/(^|[^\w$])/.source + "(?:" + (/NaN|Infinity/.source + "|" + /0[bB][01]+(?:_[01]+)*n?/.source + "|" + /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" + /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" + /\d+(?:_\d+)*n/.source + "|" + /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ")" + /(?![\w$])/.source),
        lookbehind: true
      },
      "operator": /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
    });
    Prism3.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;
    Prism3.languages.insertBefore("javascript", "keyword", {
      "regex": {
        pattern: RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source + /\//.source + "(?:" + /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source + "|" + /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source + ")" + /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),
        lookbehind: true,
        greedy: true,
        inside: {
          "regex-source": {
            pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
            lookbehind: true,
            alias: "language-regex",
            inside: Prism3.languages.regex
          },
          "regex-delimiter": /^\/|\/$/,
          "regex-flags": /^[a-z]+$/
        }
      },
      "function-variable": {
        pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
        alias: "function"
      },
      "parameter": [
        {
          pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
          lookbehind: true,
          inside: Prism3.languages.javascript
        },
        {
          pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
          lookbehind: true,
          inside: Prism3.languages.javascript
        },
        {
          pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
          lookbehind: true,
          inside: Prism3.languages.javascript
        },
        {
          pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
          lookbehind: true,
          inside: Prism3.languages.javascript
        }
      ],
      "constant": /\b[A-Z](?:[A-Z_]|\dx?)*\b/
    });
    Prism3.languages.insertBefore("javascript", "string", {
      "hashbang": {
        pattern: /^#!.*/,
        greedy: true,
        alias: "comment"
      },
      "template-string": {
        pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
        greedy: true,
        inside: {
          "template-punctuation": {
            pattern: /^`|`$/,
            alias: "string"
          },
          "interpolation": {
            pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
            lookbehind: true,
            inside: {
              "interpolation-punctuation": {
                pattern: /^\$\{|\}$/,
                alias: "punctuation"
              },
              rest: Prism3.languages.javascript
            }
          },
          "string": /[\s\S]+/
        }
      },
      "string-property": {
        pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
        lookbehind: true,
        greedy: true,
        alias: "property"
      }
    });
    Prism3.languages.insertBefore("javascript", "operator", {
      "literal-property": {
        pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
        lookbehind: true,
        alias: "property"
      }
    });
    if (Prism3.languages.markup) {
      Prism3.languages.markup.tag.addInlined("script", "javascript");
      Prism3.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source, "javascript");
    }
    Prism3.languages.js = Prism3.languages.javascript;
    (function() {
      if (typeof Prism3 === "undefined" || typeof document === "undefined") {
        return;
      }
      if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
      }
      var LOADING_MESSAGE = "Loading\u2026";
      var FAILURE_MESSAGE = function(status, message) {
        return "\u2716 Error " + status + " while fetching file: " + message;
      };
      var FAILURE_EMPTY_MESSAGE = "\u2716 Error: File does not exist or is empty";
      var EXTENSIONS = {
        "js": "javascript",
        "py": "python",
        "rb": "ruby",
        "ps1": "powershell",
        "psm1": "powershell",
        "sh": "bash",
        "bat": "batch",
        "h": "c",
        "tex": "latex"
      };
      var STATUS_ATTR = "data-src-status";
      var STATUS_LOADING = "loading";
      var STATUS_LOADED = "loaded";
      var STATUS_FAILED = "failed";
      var SELECTOR = "pre[data-src]:not([" + STATUS_ATTR + '="' + STATUS_LOADED + '"]):not([' + STATUS_ATTR + '="' + STATUS_LOADING + '"])';
      function loadFile(src, success, error) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", src, true);
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
            if (xhr.status < 400 && xhr.responseText) {
              success(xhr.responseText);
            } else {
              if (xhr.status >= 400) {
                error(FAILURE_MESSAGE(xhr.status, xhr.statusText));
              } else {
                error(FAILURE_EMPTY_MESSAGE);
              }
            }
          }
        };
        xhr.send(null);
      }
      function parseRange(range) {
        var m = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(range || "");
        if (m) {
          var start = Number(m[1]);
          var comma = m[2];
          var end = m[3];
          if (!comma) {
            return [start, start];
          }
          if (!end) {
            return [start, void 0];
          }
          return [start, Number(end)];
        }
        return void 0;
      }
      Prism3.hooks.add("before-highlightall", function(env) {
        env.selector += ", " + SELECTOR;
      });
      Prism3.hooks.add("before-sanity-check", function(env) {
        var pre = env.element;
        if (pre.matches(SELECTOR)) {
          env.code = "";
          pre.setAttribute(STATUS_ATTR, STATUS_LOADING);
          var code = pre.appendChild(document.createElement("CODE"));
          code.textContent = LOADING_MESSAGE;
          var src = pre.getAttribute("data-src");
          var language = env.language;
          if (language === "none") {
            var extension = (/\.(\w+)$/.exec(src) || [, "none"])[1];
            language = EXTENSIONS[extension] || extension;
          }
          Prism3.util.setLanguage(code, language);
          Prism3.util.setLanguage(pre, language);
          var autoloader = Prism3.plugins.autoloader;
          if (autoloader) {
            autoloader.loadLanguages(language);
          }
          loadFile(src, function(text) {
            pre.setAttribute(STATUS_ATTR, STATUS_LOADED);
            var range = parseRange(pre.getAttribute("data-range"));
            if (range) {
              var lines = text.split(/\r\n?|\n/g);
              var start = range[0];
              var end = range[1] == null ? lines.length : range[1];
              if (start < 0) {
                start += lines.length;
              }
              start = Math.max(0, Math.min(start - 1, lines.length));
              if (end < 0) {
                end += lines.length;
              }
              end = Math.max(0, Math.min(end, lines.length));
              text = lines.slice(start, end).join("\n");
              if (!pre.hasAttribute("data-start")) {
                pre.setAttribute("data-start", String(start + 1));
              }
            }
            code.textContent = text;
            Prism3.highlightElement(code);
          }, function(error) {
            pre.setAttribute(STATUS_ATTR, STATUS_FAILED);
            code.textContent = error;
          });
        }
      });
      Prism3.plugins.fileHighlight = {
        highlight: function highlight(container) {
          var elements = (container || document).querySelectorAll(SELECTOR);
          for (var i = 0, element; element = elements[i++]; ) {
            Prism3.highlightElement(element);
          }
        }
      };
      var logged = false;
      Prism3.fileHighlight = function() {
        if (!logged) {
          console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.");
          logged = true;
        }
        Prism3.plugins.fileHighlight.highlight.apply(this, arguments);
      };
    })();
  }
});

// node_modules/prismjs/components/prism-graphql.js
var require_prism_graphql = __commonJS({
  "node_modules/prismjs/components/prism-graphql.js"() {
    init_react();
    Prism.languages.graphql = {
      "comment": /#.*/,
      "description": {
        pattern: /(?:"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*")(?=\s*[a-z_])/i,
        greedy: true,
        alias: "string",
        inside: {
          "language-markdown": {
            pattern: /(^"(?:"")?)(?!\1)[\s\S]+(?=\1$)/,
            lookbehind: true,
            inside: Prism.languages.markdown
          }
        }
      },
      "string": {
        pattern: /"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*"/,
        greedy: true
      },
      "number": /(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
      "boolean": /\b(?:false|true)\b/,
      "variable": /\$[a-z_]\w*/i,
      "directive": {
        pattern: /@[a-z_]\w*/i,
        alias: "function"
      },
      "attr-name": {
        pattern: /\b[a-z_]\w*(?=\s*(?:\((?:[^()"]|"(?:\\.|[^\\"\r\n])*")*\))?:)/i,
        greedy: true
      },
      "atom-input": {
        pattern: /\b[A-Z]\w*Input\b/,
        alias: "class-name"
      },
      "scalar": /\b(?:Boolean|Float|ID|Int|String)\b/,
      "constant": /\b[A-Z][A-Z_\d]*\b/,
      "class-name": {
        pattern: /(\b(?:enum|implements|interface|on|scalar|type|union)\s+|&\s*|:\s*|\[)[A-Z_]\w*/,
        lookbehind: true
      },
      "fragment": {
        pattern: /(\bfragment\s+|\.{3}\s*(?!on\b))[a-zA-Z_]\w*/,
        lookbehind: true,
        alias: "function"
      },
      "definition-mutation": {
        pattern: /(\bmutation\s+)[a-zA-Z_]\w*/,
        lookbehind: true,
        alias: "function"
      },
      "definition-query": {
        pattern: /(\bquery\s+)[a-zA-Z_]\w*/,
        lookbehind: true,
        alias: "function"
      },
      "keyword": /\b(?:directive|enum|extend|fragment|implements|input|interface|mutation|on|query|repeatable|scalar|schema|subscription|type|union)\b/,
      "operator": /[!=|&]|\.{3}/,
      "property-query": /\w+(?=\s*\()/,
      "object": /\w+(?=\s*\{)/,
      "punctuation": /[!(){}\[\]:=,]/,
      "property": /\w+/
    };
    Prism.hooks.add("after-tokenize", function afterTokenizeGraphql(env) {
      if (env.language !== "graphql") {
        return;
      }
      var validTokens = env.tokens.filter(function(token) {
        return typeof token !== "string" && token.type !== "comment" && token.type !== "scalar";
      });
      var currentIndex = 0;
      function getToken(offset) {
        return validTokens[currentIndex + offset];
      }
      function isTokenType(types, offset) {
        offset = offset || 0;
        for (var i2 = 0; i2 < types.length; i2++) {
          var token = getToken(i2 + offset);
          if (!token || token.type !== types[i2]) {
            return false;
          }
        }
        return true;
      }
      function findClosingBracket(open, close) {
        var stackHeight = 1;
        for (var i2 = currentIndex; i2 < validTokens.length; i2++) {
          var token = validTokens[i2];
          var content = token.content;
          if (token.type === "punctuation" && typeof content === "string") {
            if (open.test(content)) {
              stackHeight++;
            } else if (close.test(content)) {
              stackHeight--;
              if (stackHeight === 0) {
                return i2;
              }
            }
          }
        }
        return -1;
      }
      function addAlias(token, alias) {
        var aliases = token.alias;
        if (!aliases) {
          token.alias = aliases = [];
        } else if (!Array.isArray(aliases)) {
          token.alias = aliases = [aliases];
        }
        aliases.push(alias);
      }
      for (; currentIndex < validTokens.length; ) {
        var startToken = validTokens[currentIndex++];
        if (startToken.type === "keyword" && startToken.content === "mutation") {
          var inputVariables = [];
          if (isTokenType(["definition-mutation", "punctuation"]) && getToken(1).content === "(") {
            currentIndex += 2;
            var definitionEnd = findClosingBracket(/^\($/, /^\)$/);
            if (definitionEnd === -1) {
              continue;
            }
            for (; currentIndex < definitionEnd; currentIndex++) {
              var t = getToken(0);
              if (t.type === "variable") {
                addAlias(t, "variable-input");
                inputVariables.push(t.content);
              }
            }
            currentIndex = definitionEnd + 1;
          }
          if (isTokenType(["punctuation", "property-query"]) && getToken(0).content === "{") {
            currentIndex++;
            addAlias(getToken(0), "property-mutation");
            if (inputVariables.length > 0) {
              var mutationEnd = findClosingBracket(/^\{$/, /^\}$/);
              if (mutationEnd === -1) {
                continue;
              }
              for (var i = currentIndex; i < mutationEnd; i++) {
                var varToken = validTokens[i];
                if (varToken.type === "variable" && inputVariables.indexOf(varToken.content) >= 0) {
                  addAlias(varToken, "variable-input");
                }
              }
            }
          }
        }
      }
    });
  }
});

// node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js
var require_react_is_development = __commonJS({
  "node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js"(exports) {
    "use strict";
    init_react();
    if (true) {
      (function() {
        "use strict";
        var hasSymbol = typeof Symbol === "function" && Symbol.for;
        var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103;
        var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106;
        var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107;
        var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108;
        var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114;
        var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109;
        var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110;
        var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for("react.async_mode") : 60111;
        var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 60111;
        var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112;
        var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113;
        var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120;
        var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115;
        var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116;
        var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121;
        var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for("react.fundamental") : 60117;
        var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 60118;
        var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 60119;
        function isValidElementType(type) {
          return typeof type === "string" || typeof type === "function" || type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
        }
        function typeOf(object) {
          if (typeof object === "object" && object !== null) {
            var $$typeof = object.$$typeof;
            switch ($$typeof) {
              case REACT_ELEMENT_TYPE:
                var type = object.type;
                switch (type) {
                  case REACT_ASYNC_MODE_TYPE:
                  case REACT_CONCURRENT_MODE_TYPE:
                  case REACT_FRAGMENT_TYPE:
                  case REACT_PROFILER_TYPE:
                  case REACT_STRICT_MODE_TYPE:
                  case REACT_SUSPENSE_TYPE:
                    return type;
                  default:
                    var $$typeofType = type && type.$$typeof;
                    switch ($$typeofType) {
                      case REACT_CONTEXT_TYPE:
                      case REACT_FORWARD_REF_TYPE:
                      case REACT_LAZY_TYPE:
                      case REACT_MEMO_TYPE:
                      case REACT_PROVIDER_TYPE:
                        return $$typeofType;
                      default:
                        return $$typeof;
                    }
                }
              case REACT_PORTAL_TYPE:
                return $$typeof;
            }
          }
          return void 0;
        }
        var AsyncMode = REACT_ASYNC_MODE_TYPE;
        var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
        var ContextConsumer = REACT_CONTEXT_TYPE;
        var ContextProvider = REACT_PROVIDER_TYPE;
        var Element2 = REACT_ELEMENT_TYPE;
        var ForwardRef = REACT_FORWARD_REF_TYPE;
        var Fragment = REACT_FRAGMENT_TYPE;
        var Lazy = REACT_LAZY_TYPE;
        var Memo = REACT_MEMO_TYPE;
        var Portal = REACT_PORTAL_TYPE;
        var Profiler = REACT_PROFILER_TYPE;
        var StrictMode = REACT_STRICT_MODE_TYPE;
        var Suspense = REACT_SUSPENSE_TYPE;
        var hasWarnedAboutDeprecatedIsAsyncMode = false;
        function isAsyncMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsAsyncMode) {
              hasWarnedAboutDeprecatedIsAsyncMode = true;
              console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.");
            }
          }
          return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
        }
        function isConcurrentMode(object) {
          return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
        }
        function isContextConsumer(object) {
          return typeOf(object) === REACT_CONTEXT_TYPE;
        }
        function isContextProvider(object) {
          return typeOf(object) === REACT_PROVIDER_TYPE;
        }
        function isElement(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function isForwardRef(object) {
          return typeOf(object) === REACT_FORWARD_REF_TYPE;
        }
        function isFragment(object) {
          return typeOf(object) === REACT_FRAGMENT_TYPE;
        }
        function isLazy(object) {
          return typeOf(object) === REACT_LAZY_TYPE;
        }
        function isMemo(object) {
          return typeOf(object) === REACT_MEMO_TYPE;
        }
        function isPortal(object) {
          return typeOf(object) === REACT_PORTAL_TYPE;
        }
        function isProfiler(object) {
          return typeOf(object) === REACT_PROFILER_TYPE;
        }
        function isStrictMode(object) {
          return typeOf(object) === REACT_STRICT_MODE_TYPE;
        }
        function isSuspense(object) {
          return typeOf(object) === REACT_SUSPENSE_TYPE;
        }
        exports.AsyncMode = AsyncMode;
        exports.ConcurrentMode = ConcurrentMode;
        exports.ContextConsumer = ContextConsumer;
        exports.ContextProvider = ContextProvider;
        exports.Element = Element2;
        exports.ForwardRef = ForwardRef;
        exports.Fragment = Fragment;
        exports.Lazy = Lazy;
        exports.Memo = Memo;
        exports.Portal = Portal;
        exports.Profiler = Profiler;
        exports.StrictMode = StrictMode;
        exports.Suspense = Suspense;
        exports.isAsyncMode = isAsyncMode;
        exports.isConcurrentMode = isConcurrentMode;
        exports.isContextConsumer = isContextConsumer;
        exports.isContextProvider = isContextProvider;
        exports.isElement = isElement;
        exports.isForwardRef = isForwardRef;
        exports.isFragment = isFragment;
        exports.isLazy = isLazy;
        exports.isMemo = isMemo;
        exports.isPortal = isPortal;
        exports.isProfiler = isProfiler;
        exports.isStrictMode = isStrictMode;
        exports.isSuspense = isSuspense;
        exports.isValidElementType = isValidElementType;
        exports.typeOf = typeOf;
      })();
    }
  }
});

// node_modules/prop-types/node_modules/react-is/index.js
var require_react_is = __commonJS({
  "node_modules/prop-types/node_modules/react-is/index.js"(exports, module) {
    "use strict";
    init_react();
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_is_development();
    }
  }
});

// node_modules/prop-types/lib/ReactPropTypesSecret.js
var require_ReactPropTypesSecret = __commonJS({
  "node_modules/prop-types/lib/ReactPropTypesSecret.js"(exports, module) {
    "use strict";
    init_react();
    var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    module.exports = ReactPropTypesSecret;
  }
});

// node_modules/prop-types/lib/has.js
var require_has = __commonJS({
  "node_modules/prop-types/lib/has.js"(exports, module) {
    init_react();
    module.exports = Function.call.bind(Object.prototype.hasOwnProperty);
  }
});

// node_modules/prop-types/checkPropTypes.js
var require_checkPropTypes = __commonJS({
  "node_modules/prop-types/checkPropTypes.js"(exports, module) {
    "use strict";
    init_react();
    var printWarning = function() {
    };
    if (true) {
      ReactPropTypesSecret = require_ReactPropTypesSecret();
      loggedTypeFailures = {};
      has = require_has();
      printWarning = function(text) {
        var message = "Warning: " + text;
        if (typeof console !== "undefined") {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x) {
        }
      };
    }
    var ReactPropTypesSecret;
    var loggedTypeFailures;
    var has;
    function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
      if (true) {
        for (var typeSpecName in typeSpecs) {
          if (has(typeSpecs, typeSpecName)) {
            var error;
            try {
              if (typeof typeSpecs[typeSpecName] !== "function") {
                var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                err.name = "Invariant Violation";
                throw err;
              }
              error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
            } catch (ex) {
              error = ex;
            }
            if (error && !(error instanceof Error)) {
              printWarning((componentName || "React class") + ": type specification of " + location + " `" + typeSpecName + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof error + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).");
            }
            if (error instanceof Error && !(error.message in loggedTypeFailures)) {
              loggedTypeFailures[error.message] = true;
              var stack = getStack ? getStack() : "";
              printWarning("Failed " + location + " type: " + error.message + (stack != null ? stack : ""));
            }
          }
        }
      }
    }
    checkPropTypes.resetWarningCache = function() {
      if (true) {
        loggedTypeFailures = {};
      }
    };
    module.exports = checkPropTypes;
  }
});

// node_modules/prop-types/factoryWithTypeCheckers.js
var require_factoryWithTypeCheckers = __commonJS({
  "node_modules/prop-types/factoryWithTypeCheckers.js"(exports, module) {
    "use strict";
    init_react();
    var ReactIs = require_react_is();
    var assign = require_object_assign();
    var ReactPropTypesSecret = require_ReactPropTypesSecret();
    var has = require_has();
    var checkPropTypes = require_checkPropTypes();
    var printWarning = function() {
    };
    if (true) {
      printWarning = function(text) {
        var message = "Warning: " + text;
        if (typeof console !== "undefined") {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x) {
        }
      };
    }
    function emptyFunctionThatReturnsNull() {
      return null;
    }
    module.exports = function(isValidElement, throwOnDirectAccess) {
      var ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
        if (typeof iteratorFn === "function") {
          return iteratorFn;
        }
      }
      var ANONYMOUS = "<<anonymous>>";
      var ReactPropTypes = {
        array: createPrimitiveTypeChecker("array"),
        bigint: createPrimitiveTypeChecker("bigint"),
        bool: createPrimitiveTypeChecker("boolean"),
        func: createPrimitiveTypeChecker("function"),
        number: createPrimitiveTypeChecker("number"),
        object: createPrimitiveTypeChecker("object"),
        string: createPrimitiveTypeChecker("string"),
        symbol: createPrimitiveTypeChecker("symbol"),
        any: createAnyTypeChecker(),
        arrayOf: createArrayOfTypeChecker,
        element: createElementTypeChecker(),
        elementType: createElementTypeTypeChecker(),
        instanceOf: createInstanceTypeChecker,
        node: createNodeChecker(),
        objectOf: createObjectOfTypeChecker,
        oneOf: createEnumTypeChecker,
        oneOfType: createUnionTypeChecker,
        shape: createShapeTypeChecker,
        exact: createStrictShapeTypeChecker
      };
      function is(x, y) {
        if (x === y) {
          return x !== 0 || 1 / x === 1 / y;
        } else {
          return x !== x && y !== y;
        }
      }
      function PropTypeError(message, data) {
        this.message = message;
        this.data = data && typeof data === "object" ? data : {};
        this.stack = "";
      }
      PropTypeError.prototype = Error.prototype;
      function createChainableTypeChecker(validate) {
        if (true) {
          var manualPropTypeCallCache = {};
          var manualPropTypeWarningCount = 0;
        }
        function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
          componentName = componentName || ANONYMOUS;
          propFullName = propFullName || propName;
          if (secret !== ReactPropTypesSecret) {
            if (throwOnDirectAccess) {
              var err = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");
              err.name = "Invariant Violation";
              throw err;
            } else if (typeof console !== "undefined") {
              var cacheKey = componentName + ":" + propName;
              if (!manualPropTypeCallCache[cacheKey] && manualPropTypeWarningCount < 3) {
                printWarning("You are manually calling a React.PropTypes validation function for the `" + propFullName + "` prop on `" + componentName + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.");
                manualPropTypeCallCache[cacheKey] = true;
                manualPropTypeWarningCount++;
              }
            }
          }
          if (props[propName] == null) {
            if (isRequired) {
              if (props[propName] === null) {
                return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required " + ("in `" + componentName + "`, but its value is `null`."));
              }
              return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required in " + ("`" + componentName + "`, but its value is `undefined`."));
            }
            return null;
          } else {
            return validate(props, propName, componentName, location, propFullName);
          }
        }
        var chainedCheckType = checkType.bind(null, false);
        chainedCheckType.isRequired = checkType.bind(null, true);
        return chainedCheckType;
      }
      function createPrimitiveTypeChecker(expectedType) {
        function validate(props, propName, componentName, location, propFullName, secret) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== expectedType) {
            var preciseType = getPreciseType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + preciseType + "` supplied to `" + componentName + "`, expected ") + ("`" + expectedType + "`."), { expectedType });
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createAnyTypeChecker() {
        return createChainableTypeChecker(emptyFunctionThatReturnsNull);
      }
      function createArrayOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
          if (typeof typeChecker !== "function") {
            return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside arrayOf.");
          }
          var propValue = props[propName];
          if (!Array.isArray(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an array."));
          }
          for (var i = 0; i < propValue.length; i++) {
            var error = typeChecker(propValue, i, componentName, location, propFullName + "[" + i + "]", ReactPropTypesSecret);
            if (error instanceof Error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createElementTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          if (!isValidElement(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createElementTypeTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          if (!ReactIs.isValidElementType(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement type."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createInstanceTypeChecker(expectedClass) {
        function validate(props, propName, componentName, location, propFullName) {
          if (!(props[propName] instanceof expectedClass)) {
            var expectedClassName = expectedClass.name || ANONYMOUS;
            var actualClassName = getClassName(props[propName]);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + actualClassName + "` supplied to `" + componentName + "`, expected ") + ("instance of `" + expectedClassName + "`."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createEnumTypeChecker(expectedValues) {
        if (!Array.isArray(expectedValues)) {
          if (true) {
            if (arguments.length > 1) {
              printWarning("Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).");
            } else {
              printWarning("Invalid argument supplied to oneOf, expected an array.");
            }
          }
          return emptyFunctionThatReturnsNull;
        }
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          for (var i = 0; i < expectedValues.length; i++) {
            if (is(propValue, expectedValues[i])) {
              return null;
            }
          }
          var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
            var type = getPreciseType(value);
            if (type === "symbol") {
              return String(value);
            }
            return value;
          });
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of value `" + String(propValue) + "` " + ("supplied to `" + componentName + "`, expected one of " + valuesString + "."));
        }
        return createChainableTypeChecker(validate);
      }
      function createObjectOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
          if (typeof typeChecker !== "function") {
            return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside objectOf.");
          }
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an object."));
          }
          for (var key in propValue) {
            if (has(propValue, key)) {
              var error = typeChecker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
              if (error instanceof Error) {
                return error;
              }
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createUnionTypeChecker(arrayOfTypeCheckers) {
        if (!Array.isArray(arrayOfTypeCheckers)) {
          true ? printWarning("Invalid argument supplied to oneOfType, expected an instance of array.") : void 0;
          return emptyFunctionThatReturnsNull;
        }
        for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
          var checker = arrayOfTypeCheckers[i];
          if (typeof checker !== "function") {
            printWarning("Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + getPostfixForTypeWarning(checker) + " at index " + i + ".");
            return emptyFunctionThatReturnsNull;
          }
        }
        function validate(props, propName, componentName, location, propFullName) {
          var expectedTypes = [];
          for (var i2 = 0; i2 < arrayOfTypeCheckers.length; i2++) {
            var checker2 = arrayOfTypeCheckers[i2];
            var checkerResult = checker2(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
            if (checkerResult == null) {
              return null;
            }
            if (checkerResult.data && has(checkerResult.data, "expectedType")) {
              expectedTypes.push(checkerResult.data.expectedType);
            }
          }
          var expectedTypesMessage = expectedTypes.length > 0 ? ", expected one of type [" + expectedTypes.join(", ") + "]" : "";
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`" + expectedTypesMessage + "."));
        }
        return createChainableTypeChecker(validate);
      }
      function createNodeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          if (!isNode(props[propName])) {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`, expected a ReactNode."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function invalidValidatorError(componentName, location, propFullName, key, type) {
        return new PropTypeError((componentName || "React class") + ": " + location + " type `" + propFullName + "." + key + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + type + "`.");
      }
      function createShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
          }
          for (var key in shapeTypes) {
            var checker = shapeTypes[key];
            if (typeof checker !== "function") {
              return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
            }
            var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
            if (error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createStrictShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
          }
          var allKeys = assign({}, props[propName], shapeTypes);
          for (var key in allKeys) {
            var checker = shapeTypes[key];
            if (has(shapeTypes, key) && typeof checker !== "function") {
              return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
            }
            if (!checker) {
              return new PropTypeError("Invalid " + location + " `" + propFullName + "` key `" + key + "` supplied to `" + componentName + "`.\nBad object: " + JSON.stringify(props[propName], null, "  ") + "\nValid keys: " + JSON.stringify(Object.keys(shapeTypes), null, "  "));
            }
            var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
            if (error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function isNode(propValue) {
        switch (typeof propValue) {
          case "number":
          case "string":
          case "undefined":
            return true;
          case "boolean":
            return !propValue;
          case "object":
            if (Array.isArray(propValue)) {
              return propValue.every(isNode);
            }
            if (propValue === null || isValidElement(propValue)) {
              return true;
            }
            var iteratorFn = getIteratorFn(propValue);
            if (iteratorFn) {
              var iterator = iteratorFn.call(propValue);
              var step;
              if (iteratorFn !== propValue.entries) {
                while (!(step = iterator.next()).done) {
                  if (!isNode(step.value)) {
                    return false;
                  }
                }
              } else {
                while (!(step = iterator.next()).done) {
                  var entry = step.value;
                  if (entry) {
                    if (!isNode(entry[1])) {
                      return false;
                    }
                  }
                }
              }
            } else {
              return false;
            }
            return true;
          default:
            return false;
        }
      }
      function isSymbol(propType, propValue) {
        if (propType === "symbol") {
          return true;
        }
        if (!propValue) {
          return false;
        }
        if (propValue["@@toStringTag"] === "Symbol") {
          return true;
        }
        if (typeof Symbol === "function" && propValue instanceof Symbol) {
          return true;
        }
        return false;
      }
      function getPropType(propValue) {
        var propType = typeof propValue;
        if (Array.isArray(propValue)) {
          return "array";
        }
        if (propValue instanceof RegExp) {
          return "object";
        }
        if (isSymbol(propType, propValue)) {
          return "symbol";
        }
        return propType;
      }
      function getPreciseType(propValue) {
        if (typeof propValue === "undefined" || propValue === null) {
          return "" + propValue;
        }
        var propType = getPropType(propValue);
        if (propType === "object") {
          if (propValue instanceof Date) {
            return "date";
          } else if (propValue instanceof RegExp) {
            return "regexp";
          }
        }
        return propType;
      }
      function getPostfixForTypeWarning(value) {
        var type = getPreciseType(value);
        switch (type) {
          case "array":
          case "object":
            return "an " + type;
          case "boolean":
          case "date":
          case "regexp":
            return "a " + type;
          default:
            return type;
        }
      }
      function getClassName(propValue) {
        if (!propValue.constructor || !propValue.constructor.name) {
          return ANONYMOUS;
        }
        return propValue.constructor.name;
      }
      ReactPropTypes.checkPropTypes = checkPropTypes;
      ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
      ReactPropTypes.PropTypes = ReactPropTypes;
      return ReactPropTypes;
    };
  }
});

// node_modules/prop-types/index.js
var require_prop_types = __commonJS({
  "node_modules/prop-types/index.js"(exports, module) {
    init_react();
    if (true) {
      ReactIs = require_react_is();
      throwOnDirectAccess = true;
      module.exports = require_factoryWithTypeCheckers()(ReactIs.isElement, throwOnDirectAccess);
    } else {
      module.exports = null();
    }
    var ReactIs;
    var throwOnDirectAccess;
  }
});

// node_modules/is-object/index.js
var require_is_object = __commonJS({
  "node_modules/is-object/index.js"(exports, module) {
    "use strict";
    init_react();
    module.exports = function isObject(x) {
      return typeof x === "object" && x !== null;
    };
  }
});

// node_modules/is-window/index.js
var require_is_window = __commonJS({
  "node_modules/is-window/index.js"(exports, module) {
    "use strict";
    init_react();
    module.exports = function(obj) {
      if (obj == null) {
        return false;
      }
      var o = Object(obj);
      return o === o.window;
    };
  }
});

// node_modules/is-dom/index.js
var require_is_dom = __commonJS({
  "node_modules/is-dom/index.js"(exports, module) {
    init_react();
    var isObject = require_is_object();
    var isWindow = require_is_window();
    function isNode(val) {
      if (!isObject(val) || !isWindow(window) || typeof window.Node !== "function") {
        return false;
      }
      return typeof val.nodeType === "number" && typeof val.nodeName === "string";
    }
    module.exports = isNode;
  }
});

// browser-route-module:/Users/sabinadams/Documents/projects/prisma-schema-analyzer-remix/app/routes/index.tsx?browser
init_react();

// app/routes/index.tsx
init_react();

// app/components/schema-form.tsx
init_react();
var import_react = __toESM(require_react());
var import_prismjs = __toESM(require_prism());
require_prism_graphql();
var SchemaForm = ({ fetcher }) => {
  const textarea = (0, import_react.useRef)(null);
  const pre = (0, import_react.useRef)(null);
  const [unformatted, setUnformatted] = (0, import_react.useState)(``);
  const handleKeyDown = (evt) => {
    let value = unformatted, selStartPos = evt.currentTarget.selectionStart;
    if (evt.key === "Tab") {
      value = value.substring(0, selStartPos) + "    " + value.substring(selStartPos, value.length);
      evt.currentTarget.selectionStart = selStartPos + 3;
      evt.currentTarget.selectionEnd = selStartPos + 4;
      evt.preventDefault();
      setUnformatted(value);
    }
  };
  const handleScroll = (e, ref) => {
    if (ref && ref.current) {
      ref.current.scrollTop = e.currentTarget.scrollTop;
      ref.current.scrollLeft = e.currentTarget.scrollLeft;
      if (!(Number(ref.current.clientHeight) > Number(e.currentTarget.clientHeight))) {
        ref.current.style.width = `${Number(e.currentTarget.clientHeight)}px`;
      }
      if (!(Number(ref.current.style.height.replace("px", "")) > Number(e.currentTarget.style.height.replace("px", "")))) {
        ref.current.style.height = `${e.currentTarget.style.height}px`;
      }
    }
  };
  (0, import_react.useEffect)(() => {
    import_prismjs.default.highlightAll();
  }, [unformatted]);
  return /* @__PURE__ */ import_react.default.createElement(fetcher.Form, {
    id: "schema-form",
    method: "post",
    action: "/dmmf",
    className: "h-full overflow-scroll code-edit-container"
  }, /* @__PURE__ */ import_react.default.createElement("input", {
    type: "hidden",
    name: "schema",
    defaultValue: unformatted
  }), /* @__PURE__ */ import_react.default.createElement("textarea", {
    ref: textarea,
    name: "schema-display",
    className: "code-input overflow-scroll p-2 focus:outline-none whitespace-nowrap placeholder-teal-300 caret-teal-300",
    placeholder: "Paste your schema here...",
    onChange: (evt) => setUnformatted(evt.target.value),
    onKeyDown: handleKeyDown,
    value: unformatted,
    onScroll: (e) => handleScroll(e, pre)
  }), /* @__PURE__ */ import_react.default.createElement("pre", {
    ref: pre,
    className: "code-output whitespace-nowrap overflow-scroll",
    onScroll: (e) => handleScroll(e, textarea)
  }, /* @__PURE__ */ import_react.default.createElement("code", {
    className: `language-graphql whitespace-nowrap overflow-scroll`
  }, unformatted + "\n")));
};

// app/components/schema-output.tsx
init_react();

// node_modules/react-inspector/dist/es/react-inspector.js
init_react();
var import_react2 = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
var import_is_dom = __toESM(require_is_dom());
function unwrapExports(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function createCommonjsModule(fn, module) {
  return module = { exports: {} }, fn(module, module.exports), module.exports;
}
var _extends_1 = createCommonjsModule(function(module) {
  function _extends2() {
    module.exports = _extends2 = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    module.exports["default"] = module.exports, module.exports.__esModule = true;
    return _extends2.apply(this, arguments);
  }
  module.exports = _extends2;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});
var _extends = unwrapExports(_extends_1);
var objectWithoutPropertiesLoose = createCommonjsModule(function(module) {
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null)
      return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0)
        continue;
      target[key] = source[key];
    }
    return target;
  }
  module.exports = _objectWithoutPropertiesLoose;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});
unwrapExports(objectWithoutPropertiesLoose);
var objectWithoutProperties = createCommonjsModule(function(module) {
  function _objectWithoutProperties2(source, excluded) {
    if (source == null)
      return {};
    var target = objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0)
          continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key))
          continue;
        target[key] = source[key];
      }
    }
    return target;
  }
  module.exports = _objectWithoutProperties2;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});
var _objectWithoutProperties = unwrapExports(objectWithoutProperties);
var theme$1 = {
  BASE_FONT_FAMILY: "Menlo, monospace",
  BASE_FONT_SIZE: "11px",
  BASE_LINE_HEIGHT: 1.2,
  BASE_BACKGROUND_COLOR: "rgb(36, 36, 36)",
  BASE_COLOR: "rgb(213, 213, 213)",
  OBJECT_PREVIEW_ARRAY_MAX_PROPERTIES: 10,
  OBJECT_PREVIEW_OBJECT_MAX_PROPERTIES: 5,
  OBJECT_NAME_COLOR: "rgb(227, 110, 236)",
  OBJECT_VALUE_NULL_COLOR: "rgb(127, 127, 127)",
  OBJECT_VALUE_UNDEFINED_COLOR: "rgb(127, 127, 127)",
  OBJECT_VALUE_REGEXP_COLOR: "rgb(233, 63, 59)",
  OBJECT_VALUE_STRING_COLOR: "rgb(233, 63, 59)",
  OBJECT_VALUE_SYMBOL_COLOR: "rgb(233, 63, 59)",
  OBJECT_VALUE_NUMBER_COLOR: "hsl(252, 100%, 75%)",
  OBJECT_VALUE_BOOLEAN_COLOR: "hsl(252, 100%, 75%)",
  OBJECT_VALUE_FUNCTION_PREFIX_COLOR: "rgb(85, 106, 242)",
  HTML_TAG_COLOR: "rgb(93, 176, 215)",
  HTML_TAGNAME_COLOR: "rgb(93, 176, 215)",
  HTML_TAGNAME_TEXT_TRANSFORM: "lowercase",
  HTML_ATTRIBUTE_NAME_COLOR: "rgb(155, 187, 220)",
  HTML_ATTRIBUTE_VALUE_COLOR: "rgb(242, 151, 102)",
  HTML_COMMENT_COLOR: "rgb(137, 137, 137)",
  HTML_DOCTYPE_COLOR: "rgb(192, 192, 192)",
  ARROW_COLOR: "rgb(145, 145, 145)",
  ARROW_MARGIN_RIGHT: 3,
  ARROW_FONT_SIZE: 12,
  ARROW_ANIMATION_DURATION: "0",
  TREENODE_FONT_FAMILY: "Menlo, monospace",
  TREENODE_FONT_SIZE: "11px",
  TREENODE_LINE_HEIGHT: 1.2,
  TREENODE_PADDING_LEFT: 12,
  TABLE_BORDER_COLOR: "rgb(85, 85, 85)",
  TABLE_TH_BACKGROUND_COLOR: "rgb(44, 44, 44)",
  TABLE_TH_HOVER_COLOR: "rgb(48, 48, 48)",
  TABLE_SORT_ICON_COLOR: "black",
  TABLE_DATA_BACKGROUND_IMAGE: "linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) 50%, rgba(51, 139, 255, 0.0980392) 50%, rgba(51, 139, 255, 0.0980392))",
  TABLE_DATA_BACKGROUND_SIZE: "128px 32px"
};
var theme = {
  BASE_FONT_FAMILY: "Menlo, monospace",
  BASE_FONT_SIZE: "11px",
  BASE_LINE_HEIGHT: 1.2,
  BASE_BACKGROUND_COLOR: "white",
  BASE_COLOR: "black",
  OBJECT_PREVIEW_ARRAY_MAX_PROPERTIES: 10,
  OBJECT_PREVIEW_OBJECT_MAX_PROPERTIES: 5,
  OBJECT_NAME_COLOR: "rgb(136, 19, 145)",
  OBJECT_VALUE_NULL_COLOR: "rgb(128, 128, 128)",
  OBJECT_VALUE_UNDEFINED_COLOR: "rgb(128, 128, 128)",
  OBJECT_VALUE_REGEXP_COLOR: "rgb(196, 26, 22)",
  OBJECT_VALUE_STRING_COLOR: "rgb(196, 26, 22)",
  OBJECT_VALUE_SYMBOL_COLOR: "rgb(196, 26, 22)",
  OBJECT_VALUE_NUMBER_COLOR: "rgb(28, 0, 207)",
  OBJECT_VALUE_BOOLEAN_COLOR: "rgb(28, 0, 207)",
  OBJECT_VALUE_FUNCTION_PREFIX_COLOR: "rgb(13, 34, 170)",
  HTML_TAG_COLOR: "rgb(168, 148, 166)",
  HTML_TAGNAME_COLOR: "rgb(136, 18, 128)",
  HTML_TAGNAME_TEXT_TRANSFORM: "lowercase",
  HTML_ATTRIBUTE_NAME_COLOR: "rgb(153, 69, 0)",
  HTML_ATTRIBUTE_VALUE_COLOR: "rgb(26, 26, 166)",
  HTML_COMMENT_COLOR: "rgb(35, 110, 37)",
  HTML_DOCTYPE_COLOR: "rgb(192, 192, 192)",
  ARROW_COLOR: "#6e6e6e",
  ARROW_MARGIN_RIGHT: 3,
  ARROW_FONT_SIZE: 12,
  ARROW_ANIMATION_DURATION: "0",
  TREENODE_FONT_FAMILY: "Menlo, monospace",
  TREENODE_FONT_SIZE: "11px",
  TREENODE_LINE_HEIGHT: 1.2,
  TREENODE_PADDING_LEFT: 12,
  TABLE_BORDER_COLOR: "#aaa",
  TABLE_TH_BACKGROUND_COLOR: "#eee",
  TABLE_TH_HOVER_COLOR: "hsla(0, 0%, 90%, 1)",
  TABLE_SORT_ICON_COLOR: "#6e6e6e",
  TABLE_DATA_BACKGROUND_IMAGE: "linear-gradient(to bottom, white, white 50%, rgb(234, 243, 255) 50%, rgb(234, 243, 255))",
  TABLE_DATA_BACKGROUND_SIZE: "128px 32px"
};
var themes = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  chromeDark: theme$1,
  chromeLight: theme
});
var arrayWithHoles = createCommonjsModule(function(module) {
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr))
      return arr;
  }
  module.exports = _arrayWithHoles;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});
unwrapExports(arrayWithHoles);
var iterableToArrayLimit = createCommonjsModule(function(module) {
  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr)))
      return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = void 0;
    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i)
          break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null)
          _i["return"]();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
  module.exports = _iterableToArrayLimit;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});
unwrapExports(iterableToArrayLimit);
var arrayLikeToArray = createCommonjsModule(function(module) {
  function _arrayLikeToArray2(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
  module.exports = _arrayLikeToArray2;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});
unwrapExports(arrayLikeToArray);
var unsupportedIterableToArray = createCommonjsModule(function(module) {
  function _unsupportedIterableToArray2(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return arrayLikeToArray(o, minLen);
  }
  module.exports = _unsupportedIterableToArray2;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});
unwrapExports(unsupportedIterableToArray);
var nonIterableRest = createCommonjsModule(function(module) {
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  module.exports = _nonIterableRest;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});
unwrapExports(nonIterableRest);
var slicedToArray = createCommonjsModule(function(module) {
  function _slicedToArray2(arr, i) {
    return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
  }
  module.exports = _slicedToArray2;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});
var _slicedToArray = unwrapExports(slicedToArray);
var _typeof_1 = createCommonjsModule(function(module) {
  function _typeof2(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      module.exports = _typeof2 = function _typeof3(obj2) {
        return typeof obj2;
      };
      module.exports["default"] = module.exports, module.exports.__esModule = true;
    } else {
      module.exports = _typeof2 = function _typeof3(obj2) {
        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      };
      module.exports["default"] = module.exports, module.exports.__esModule = true;
    }
    return _typeof2(obj);
  }
  module.exports = _typeof2;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});
var _typeof = unwrapExports(_typeof_1);
var runtime_1 = createCommonjsModule(function(module) {
  var runtime = function(exports) {
    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1;
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
      return obj[key];
    }
    try {
      define({}, "");
    } catch (err) {
      define = function(obj, key, value) {
        return obj[key] = value;
      };
    }
    function wrap(innerFn, outerFn, self2, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);
      generator._invoke = makeInvokeMethod(innerFn, self2, context);
      return generator;
    }
    exports.wrap = wrap;
    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }
    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";
    var ContinueSentinel = {};
    function Generator() {
    }
    function GeneratorFunction() {
    }
    function GeneratorFunctionPrototype() {
    }
    var IteratorPrototype = {};
    IteratorPrototype[iteratorSymbol] = function() {
      return this;
    };
    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      IteratorPrototype = NativeIteratorPrototype;
    }
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction");
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        define(prototype, method, function(arg) {
          return this._invoke(method, arg);
        });
      });
    }
    exports.isGeneratorFunction = function(genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };
    exports.mark = function(genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        define(genFun, toStringTagSymbol, "GeneratorFunction");
      }
      genFun.prototype = Object.create(Gp);
      return genFun;
    };
    exports.awrap = function(arg) {
      return {
        __await: arg
      };
    };
    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;
          if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function(value2) {
              invoke("next", value2, resolve, reject);
            }, function(err) {
              invoke("throw", err, resolve, reject);
            });
          }
          return PromiseImpl.resolve(value).then(function(unwrapped) {
            result.value = unwrapped;
            resolve(result);
          }, function(error) {
            return invoke("throw", error, resolve, reject);
          });
        }
      }
      var previousPromise;
      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function(resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
      this._invoke = enqueue;
    }
    defineIteratorMethods(AsyncIterator.prototype);
    AsyncIterator.prototype[asyncIteratorSymbol] = function() {
      return this;
    };
    exports.AsyncIterator = AsyncIterator;
    exports.async = function(innerFn, outerFn, self2, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0)
        PromiseImpl = Promise;
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self2, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
        return result.done ? result.value : iter.next();
      });
    };
    function makeInvokeMethod(innerFn, self2, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }
        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }
          return doneResult();
        }
        context.method = method;
        context.arg = arg;
        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel)
                continue;
              return delegateResult;
            }
          }
          if (context.method === "next") {
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }
            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }
          state = GenStateExecuting;
          var record = tryCatch(innerFn, self2, context);
          if (record.type === "normal") {
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;
            if (record.arg === ContinueSentinel) {
              continue;
            }
            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted;
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (method === undefined$1) {
        context.delegate = null;
        if (context.method === "throw") {
          if (delegate.iterator["return"]) {
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);
            if (context.method === "throw") {
              return ContinueSentinel;
            }
          }
          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }
        return ContinueSentinel;
      }
      var record = tryCatch(method, delegate.iterator, context.arg);
      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }
      var info = record.arg;
      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }
      if (info.done) {
        context[delegate.resultName] = info.value;
        context.next = delegate.nextLoc;
        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }
      } else {
        return info;
      }
      context.delegate = null;
      return ContinueSentinel;
    }
    defineIteratorMethods(Gp);
    define(Gp, toStringTagSymbol, "Generator");
    Gp[iteratorSymbol] = function() {
      return this;
    };
    Gp.toString = function() {
      return "[object Generator]";
    };
    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };
      if (1 in locs) {
        entry.catchLoc = locs[1];
      }
      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }
      this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }
    function Context(tryLocsList) {
      this.tryEntries = [{
        tryLoc: "root"
      }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }
    exports.keys = function(object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();
      return function next() {
        while (keys.length) {
          var key2 = keys.pop();
          if (key2 in object) {
            next.value = key2;
            next.done = false;
            return next;
          }
        }
        next.done = true;
        return next;
      };
    };
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }
        if (typeof iterable.next === "function") {
          return iterable;
        }
        if (!isNaN(iterable.length)) {
          var i = -1, next = function next2() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next2.value = iterable[i];
                next2.done = false;
                return next2;
              }
            }
            next2.value = undefined$1;
            next2.done = true;
            return next2;
          };
          return next.next = next;
        }
      }
      return {
        next: doneResult
      };
    }
    exports.values = values;
    function doneResult() {
      return {
        value: undefined$1,
        done: true
      };
    }
    Context.prototype = {
      constructor: Context,
      reset: function(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined$1;
        this.tryEntries.forEach(resetTryEntry);
        if (!skipTempReset) {
          for (var name in this) {
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },
      stop: function() {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }
        return this.rval;
      },
      dispatchException: function(exception) {
        if (this.done) {
          throw exception;
        }
        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;
          if (caught) {
            context.method = "next";
            context.arg = undefined$1;
          }
          return !!caught;
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;
          if (entry.tryLoc === "root") {
            return handle("end");
          }
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          finallyEntry = null;
        }
        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;
        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }
        return this.complete(record);
      },
      complete: function(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }
        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }
        return ContinueSentinel;
      },
      finish: function(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
      "catch": function(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName,
          nextLoc
        };
        if (this.method === "next") {
          this.arg = undefined$1;
        }
        return ContinueSentinel;
      }
    };
    return exports;
  }(module.exports);
  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
});
var regenerator = runtime_1;
var arrayWithoutHoles = createCommonjsModule(function(module) {
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr))
      return arrayLikeToArray(arr);
  }
  module.exports = _arrayWithoutHoles;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});
unwrapExports(arrayWithoutHoles);
var iterableToArray = createCommonjsModule(function(module) {
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter))
      return Array.from(iter);
  }
  module.exports = _iterableToArray;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});
unwrapExports(iterableToArray);
var nonIterableSpread = createCommonjsModule(function(module) {
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  module.exports = _nonIterableSpread;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});
unwrapExports(nonIterableSpread);
var toConsumableArray = createCommonjsModule(function(module) {
  function _toConsumableArray2(arr) {
    return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
  }
  module.exports = _toConsumableArray2;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});
var _toConsumableArray = unwrapExports(toConsumableArray);
var defineProperty = createCommonjsModule(function(module) {
  function _defineProperty2(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  module.exports = _defineProperty2;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});
var _defineProperty = unwrapExports(defineProperty);
var ExpandedPathsContext = (0, import_react2.createContext)([{}, function() {
}]);
var unselectable = {
  WebkitTouchCallout: "none",
  WebkitUserSelect: "none",
  KhtmlUserSelect: "none",
  MozUserSelect: "none",
  msUserSelect: "none",
  OUserSelect: "none",
  userSelect: "none"
};
function ownKeys$7(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$7(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys$7(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$7(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
var base = function(theme2) {
  return {
    DOMNodePreview: {
      htmlOpenTag: {
        base: {
          color: theme2.HTML_TAG_COLOR
        },
        tagName: {
          color: theme2.HTML_TAGNAME_COLOR,
          textTransform: theme2.HTML_TAGNAME_TEXT_TRANSFORM
        },
        htmlAttributeName: {
          color: theme2.HTML_ATTRIBUTE_NAME_COLOR
        },
        htmlAttributeValue: {
          color: theme2.HTML_ATTRIBUTE_VALUE_COLOR
        }
      },
      htmlCloseTag: {
        base: {
          color: theme2.HTML_TAG_COLOR
        },
        offsetLeft: {
          marginLeft: -theme2.TREENODE_PADDING_LEFT
        },
        tagName: {
          color: theme2.HTML_TAGNAME_COLOR,
          textTransform: theme2.HTML_TAGNAME_TEXT_TRANSFORM
        }
      },
      htmlComment: {
        color: theme2.HTML_COMMENT_COLOR
      },
      htmlDoctype: {
        color: theme2.HTML_DOCTYPE_COLOR
      }
    },
    ObjectPreview: {
      objectDescription: {
        fontStyle: "italic"
      },
      preview: {
        fontStyle: "italic"
      },
      arrayMaxProperties: theme2.OBJECT_PREVIEW_ARRAY_MAX_PROPERTIES,
      objectMaxProperties: theme2.OBJECT_PREVIEW_OBJECT_MAX_PROPERTIES
    },
    ObjectName: {
      base: {
        color: theme2.OBJECT_NAME_COLOR
      },
      dimmed: {
        opacity: 0.6
      }
    },
    ObjectValue: {
      objectValueNull: {
        color: theme2.OBJECT_VALUE_NULL_COLOR
      },
      objectValueUndefined: {
        color: theme2.OBJECT_VALUE_UNDEFINED_COLOR
      },
      objectValueRegExp: {
        color: theme2.OBJECT_VALUE_REGEXP_COLOR
      },
      objectValueString: {
        color: theme2.OBJECT_VALUE_STRING_COLOR
      },
      objectValueSymbol: {
        color: theme2.OBJECT_VALUE_SYMBOL_COLOR
      },
      objectValueNumber: {
        color: theme2.OBJECT_VALUE_NUMBER_COLOR
      },
      objectValueBoolean: {
        color: theme2.OBJECT_VALUE_BOOLEAN_COLOR
      },
      objectValueFunctionPrefix: {
        color: theme2.OBJECT_VALUE_FUNCTION_PREFIX_COLOR,
        fontStyle: "italic"
      },
      objectValueFunctionName: {
        fontStyle: "italic"
      }
    },
    TreeView: {
      treeViewOutline: {
        padding: 0,
        margin: 0,
        listStyleType: "none"
      }
    },
    TreeNode: {
      treeNodeBase: {
        color: theme2.BASE_COLOR,
        backgroundColor: theme2.BASE_BACKGROUND_COLOR,
        lineHeight: theme2.TREENODE_LINE_HEIGHT,
        cursor: "default",
        boxSizing: "border-box",
        listStyle: "none",
        fontFamily: theme2.TREENODE_FONT_FAMILY,
        fontSize: theme2.TREENODE_FONT_SIZE
      },
      treeNodePreviewContainer: {},
      treeNodePlaceholder: _objectSpread$7({
        whiteSpace: "pre",
        fontSize: theme2.ARROW_FONT_SIZE,
        marginRight: theme2.ARROW_MARGIN_RIGHT
      }, unselectable),
      treeNodeArrow: {
        base: _objectSpread$7(_objectSpread$7({
          color: theme2.ARROW_COLOR,
          display: "inline-block",
          fontSize: theme2.ARROW_FONT_SIZE,
          marginRight: theme2.ARROW_MARGIN_RIGHT
        }, parseFloat(theme2.ARROW_ANIMATION_DURATION) > 0 ? {
          transition: "transform ".concat(theme2.ARROW_ANIMATION_DURATION, " ease 0s")
        } : {}), unselectable),
        expanded: {
          WebkitTransform: "rotateZ(90deg)",
          MozTransform: "rotateZ(90deg)",
          transform: "rotateZ(90deg)"
        },
        collapsed: {
          WebkitTransform: "rotateZ(0deg)",
          MozTransform: "rotateZ(0deg)",
          transform: "rotateZ(0deg)"
        }
      },
      treeNodeChildNodesContainer: {
        margin: 0,
        paddingLeft: theme2.TREENODE_PADDING_LEFT
      }
    },
    TableInspector: {
      base: {
        color: theme2.BASE_COLOR,
        position: "relative",
        border: "1px solid ".concat(theme2.TABLE_BORDER_COLOR),
        fontFamily: theme2.BASE_FONT_FAMILY,
        fontSize: theme2.BASE_FONT_SIZE,
        lineHeight: "120%",
        boxSizing: "border-box",
        cursor: "default"
      }
    },
    TableInspectorHeaderContainer: {
      base: {
        top: 0,
        height: "17px",
        left: 0,
        right: 0,
        overflowX: "hidden"
      },
      table: {
        tableLayout: "fixed",
        borderSpacing: 0,
        borderCollapse: "separate",
        height: "100%",
        width: "100%",
        margin: 0
      }
    },
    TableInspectorDataContainer: {
      tr: {
        display: "table-row"
      },
      td: {
        boxSizing: "border-box",
        border: "none",
        height: "16px",
        verticalAlign: "top",
        padding: "1px 4px",
        WebkitUserSelect: "text",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
        lineHeight: "14px"
      },
      div: {
        position: "static",
        top: "17px",
        bottom: 0,
        overflowY: "overlay",
        transform: "translateZ(0)",
        left: 0,
        right: 0,
        overflowX: "hidden"
      },
      table: {
        positon: "static",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        borderTop: "0 none transparent",
        margin: 0,
        backgroundImage: theme2.TABLE_DATA_BACKGROUND_IMAGE,
        backgroundSize: theme2.TABLE_DATA_BACKGROUND_SIZE,
        tableLayout: "fixed",
        borderSpacing: 0,
        borderCollapse: "separate",
        width: "100%",
        fontSize: theme2.BASE_FONT_SIZE,
        lineHeight: "120%"
      }
    },
    TableInspectorTH: {
      base: {
        position: "relative",
        height: "auto",
        textAlign: "left",
        backgroundColor: theme2.TABLE_TH_BACKGROUND_COLOR,
        borderBottom: "1px solid ".concat(theme2.TABLE_BORDER_COLOR),
        fontWeight: "normal",
        verticalAlign: "middle",
        padding: "0 4px",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
        lineHeight: "14px",
        ":hover": {
          backgroundColor: theme2.TABLE_TH_HOVER_COLOR
        }
      },
      div: {
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
        fontSize: theme2.BASE_FONT_SIZE,
        lineHeight: "120%"
      }
    },
    TableInspectorLeftBorder: {
      none: {
        borderLeft: "none"
      },
      solid: {
        borderLeft: "1px solid ".concat(theme2.TABLE_BORDER_COLOR)
      }
    },
    TableInspectorSortIcon: _objectSpread$7({
      display: "block",
      marginRight: 3,
      width: 8,
      height: 7,
      marginTop: -7,
      color: theme2.TABLE_SORT_ICON_COLOR,
      fontSize: 12
    }, unselectable)
  };
};
var DEFAULT_THEME_NAME = "chromeLight";
var ThemeContext = (0, import_react2.createContext)(base(themes[DEFAULT_THEME_NAME]));
var useStyles = function useStyles2(baseStylesKey) {
  var themeStyles = (0, import_react2.useContext)(ThemeContext);
  return themeStyles[baseStylesKey];
};
var themeAcceptor = function themeAcceptor2(WrappedComponent) {
  var ThemeAcceptor = function ThemeAcceptor2(_ref) {
    var _ref$theme = _ref.theme, theme2 = _ref$theme === void 0 ? DEFAULT_THEME_NAME : _ref$theme, restProps = _objectWithoutProperties(_ref, ["theme"]);
    var themeStyles = (0, import_react2.useMemo)(function() {
      switch (Object.prototype.toString.call(theme2)) {
        case "[object String]":
          return base(themes[theme2]);
        case "[object Object]":
          return base(theme2);
        default:
          return base(themes[DEFAULT_THEME_NAME]);
      }
    }, [theme2]);
    return import_react2.default.createElement(ThemeContext.Provider, {
      value: themeStyles
    }, import_react2.default.createElement(WrappedComponent, restProps));
  };
  ThemeAcceptor.propTypes = {
    theme: import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.object])
  };
  return ThemeAcceptor;
};
function ownKeys$6(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$6(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys$6(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$6(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
var Arrow = function Arrow2(_ref) {
  var expanded = _ref.expanded, styles = _ref.styles;
  return import_react2.default.createElement("span", {
    style: _objectSpread$6(_objectSpread$6({}, styles.base), expanded ? styles.expanded : styles.collapsed)
  }, "\u25B6");
};
var TreeNode = (0, import_react2.memo)(function(props) {
  props = _objectSpread$6({
    expanded: true,
    nodeRenderer: function nodeRenderer2(_ref2) {
      var name = _ref2.name;
      return import_react2.default.createElement("span", null, name);
    },
    onClick: function onClick2() {
    },
    shouldShowArrow: false,
    shouldShowPlaceholder: true
  }, props);
  var _props = props, expanded = _props.expanded, onClick = _props.onClick, children = _props.children, nodeRenderer = _props.nodeRenderer, title = _props.title, shouldShowArrow = _props.shouldShowArrow, shouldShowPlaceholder = _props.shouldShowPlaceholder;
  var styles = useStyles("TreeNode");
  var NodeRenderer = nodeRenderer;
  return import_react2.default.createElement("li", {
    "aria-expanded": expanded,
    role: "treeitem",
    style: styles.treeNodeBase,
    title
  }, import_react2.default.createElement("div", {
    style: styles.treeNodePreviewContainer,
    onClick
  }, shouldShowArrow || import_react2.Children.count(children) > 0 ? import_react2.default.createElement(Arrow, {
    expanded,
    styles: styles.treeNodeArrow
  }) : shouldShowPlaceholder && import_react2.default.createElement("span", {
    style: styles.treeNodePlaceholder
  }, "\xA0"), import_react2.default.createElement(NodeRenderer, props)), import_react2.default.createElement("ol", {
    role: "group",
    style: styles.treeNodeChildNodesContainer
  }, expanded ? children : void 0));
});
TreeNode.propTypes = {
  name: import_prop_types.default.string,
  data: import_prop_types.default.any,
  expanded: import_prop_types.default.bool,
  shouldShowArrow: import_prop_types.default.bool,
  shouldShowPlaceholder: import_prop_types.default.bool,
  nodeRenderer: import_prop_types.default.func,
  onClick: import_prop_types.default.func
};
function ownKeys$5(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$5(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys$5(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$5(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _createForOfIteratorHelper$1(o, allowArrayLike) {
  var it;
  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it)
        o = it;
      var i = 0;
      var F = function F2() {
      };
      return { s: F, n: function n() {
        if (i >= o.length)
          return { done: true };
        return { done: false, value: o[i++] };
      }, e: function e(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return { s: function s() {
    it = o[Symbol.iterator]();
  }, n: function n() {
    var step = it.next();
    normalCompletion = step.done;
    return step;
  }, e: function e(_e2) {
    didErr = true;
    err = _e2;
  }, f: function f() {
    try {
      if (!normalCompletion && it.return != null)
        it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray$1(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$1(o, minLen);
}
function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
var DEFAULT_ROOT_PATH = "$";
var WILDCARD = "*";
function hasChildNodes(data, dataIterator) {
  return !dataIterator(data).next().done;
}
var wildcardPathsFromLevel = function wildcardPathsFromLevel2(level) {
  return Array.from({
    length: level
  }, function(_, i) {
    return [DEFAULT_ROOT_PATH].concat(Array.from({
      length: i
    }, function() {
      return "*";
    })).join(".");
  });
};
var getExpandedPaths = function getExpandedPaths2(data, dataIterator, expandPaths, expandLevel, prevExpandedPaths) {
  var wildcardPaths = [].concat(wildcardPathsFromLevel(expandLevel)).concat(expandPaths).filter(function(path) {
    return typeof path === "string";
  });
  var expandedPaths = [];
  wildcardPaths.forEach(function(wildcardPath) {
    var keyPaths = wildcardPath.split(".");
    var populatePaths = function populatePaths2(curData, curPath, depth) {
      if (depth === keyPaths.length) {
        expandedPaths.push(curPath);
        return;
      }
      var key = keyPaths[depth];
      if (depth === 0) {
        if (hasChildNodes(curData, dataIterator) && (key === DEFAULT_ROOT_PATH || key === WILDCARD)) {
          populatePaths2(curData, DEFAULT_ROOT_PATH, depth + 1);
        }
      } else {
        if (key === WILDCARD) {
          var _iterator = _createForOfIteratorHelper$1(dataIterator(curData)), _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done; ) {
              var _step$value = _step.value, name = _step$value.name, _data = _step$value.data;
              if (hasChildNodes(_data, dataIterator)) {
                populatePaths2(_data, "".concat(curPath, ".").concat(name), depth + 1);
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        } else {
          var value = curData[key];
          if (hasChildNodes(value, dataIterator)) {
            populatePaths2(value, "".concat(curPath, ".").concat(key), depth + 1);
          }
        }
      }
    };
    populatePaths(data, "", 0);
  });
  return expandedPaths.reduce(function(obj, path) {
    obj[path] = true;
    return obj;
  }, _objectSpread$5({}, prevExpandedPaths));
};
function ownKeys$4(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$4(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys$4(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$4(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
var ConnectedTreeNode = (0, import_react2.memo)(function(props) {
  var data = props.data, dataIterator = props.dataIterator, path = props.path, depth = props.depth, nodeRenderer = props.nodeRenderer;
  var _useContext = (0, import_react2.useContext)(ExpandedPathsContext), _useContext2 = _slicedToArray(_useContext, 2), expandedPaths = _useContext2[0], setExpandedPaths = _useContext2[1];
  var nodeHasChildNodes = hasChildNodes(data, dataIterator);
  var expanded = !!expandedPaths[path];
  var handleClick = (0, import_react2.useCallback)(function() {
    return nodeHasChildNodes && setExpandedPaths(function(prevExpandedPaths) {
      return _objectSpread$4(_objectSpread$4({}, prevExpandedPaths), {}, _defineProperty({}, path, !expanded));
    });
  }, [nodeHasChildNodes, setExpandedPaths, path, expanded]);
  return import_react2.default.createElement(TreeNode, _extends({
    expanded,
    onClick: handleClick,
    shouldShowArrow: nodeHasChildNodes,
    shouldShowPlaceholder: depth > 0,
    nodeRenderer
  }, props), expanded ? _toConsumableArray(dataIterator(data)).map(function(_ref) {
    var name = _ref.name, data2 = _ref.data, renderNodeProps = _objectWithoutProperties(_ref, ["name", "data"]);
    return import_react2.default.createElement(ConnectedTreeNode, _extends({
      name,
      data: data2,
      depth: depth + 1,
      path: "".concat(path, ".").concat(name),
      key: name,
      dataIterator,
      nodeRenderer
    }, renderNodeProps));
  }) : null);
});
ConnectedTreeNode.propTypes = {
  name: import_prop_types.default.string,
  data: import_prop_types.default.any,
  dataIterator: import_prop_types.default.func,
  depth: import_prop_types.default.number,
  expanded: import_prop_types.default.bool,
  nodeRenderer: import_prop_types.default.func
};
var TreeView = (0, import_react2.memo)(function(_ref2) {
  var name = _ref2.name, data = _ref2.data, dataIterator = _ref2.dataIterator, nodeRenderer = _ref2.nodeRenderer, expandPaths = _ref2.expandPaths, expandLevel = _ref2.expandLevel;
  var styles = useStyles("TreeView");
  var stateAndSetter = (0, import_react2.useState)({});
  var _stateAndSetter = _slicedToArray(stateAndSetter, 2), setExpandedPaths = _stateAndSetter[1];
  (0, import_react2.useLayoutEffect)(function() {
    return setExpandedPaths(function(prevExpandedPaths) {
      return getExpandedPaths(data, dataIterator, expandPaths, expandLevel, prevExpandedPaths);
    });
  }, [data, dataIterator, expandPaths, expandLevel]);
  return import_react2.default.createElement(ExpandedPathsContext.Provider, {
    value: stateAndSetter
  }, import_react2.default.createElement("ol", {
    role: "tree",
    style: styles.treeViewOutline
  }, import_react2.default.createElement(ConnectedTreeNode, {
    name,
    data,
    dataIterator,
    depth: 0,
    path: DEFAULT_ROOT_PATH,
    nodeRenderer
  })));
});
TreeView.propTypes = {
  name: import_prop_types.default.string,
  data: import_prop_types.default.any,
  dataIterator: import_prop_types.default.func,
  nodeRenderer: import_prop_types.default.func,
  expandPaths: import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.array]),
  expandLevel: import_prop_types.default.number
};
function ownKeys$3(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$3(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys$3(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$3(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
var ObjectName = function ObjectName2(_ref) {
  var name = _ref.name, _ref$dimmed = _ref.dimmed, dimmed = _ref$dimmed === void 0 ? false : _ref$dimmed, _ref$styles = _ref.styles, styles = _ref$styles === void 0 ? {} : _ref$styles;
  var themeStyles = useStyles("ObjectName");
  var appliedStyles = _objectSpread$3(_objectSpread$3(_objectSpread$3({}, themeStyles.base), dimmed ? themeStyles["dimmed"] : {}), styles);
  return import_react2.default.createElement("span", {
    style: appliedStyles
  }, name);
};
ObjectName.propTypes = {
  name: import_prop_types.default.string,
  dimmed: import_prop_types.default.bool
};
function ownKeys$2(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys$2(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$2(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
var ObjectValue = function ObjectValue2(_ref) {
  var object = _ref.object, styles = _ref.styles;
  var themeStyles = useStyles("ObjectValue");
  var mkStyle = function mkStyle2(key) {
    return _objectSpread$2(_objectSpread$2({}, themeStyles[key]), styles);
  };
  switch (_typeof(object)) {
    case "bigint":
      return import_react2.default.createElement("span", {
        style: mkStyle("objectValueNumber")
      }, String(object), "n");
    case "number":
      return import_react2.default.createElement("span", {
        style: mkStyle("objectValueNumber")
      }, String(object));
    case "string":
      return import_react2.default.createElement("span", {
        style: mkStyle("objectValueString")
      }, '"', object, '"');
    case "boolean":
      return import_react2.default.createElement("span", {
        style: mkStyle("objectValueBoolean")
      }, String(object));
    case "undefined":
      return import_react2.default.createElement("span", {
        style: mkStyle("objectValueUndefined")
      }, "undefined");
    case "object":
      if (object === null) {
        return import_react2.default.createElement("span", {
          style: mkStyle("objectValueNull")
        }, "null");
      }
      if (object instanceof Date) {
        return import_react2.default.createElement("span", null, object.toString());
      }
      if (object instanceof RegExp) {
        return import_react2.default.createElement("span", {
          style: mkStyle("objectValueRegExp")
        }, object.toString());
      }
      if (Array.isArray(object)) {
        return import_react2.default.createElement("span", null, "Array(".concat(object.length, ")"));
      }
      if (!object.constructor) {
        return import_react2.default.createElement("span", null, "Object");
      }
      if (typeof object.constructor.isBuffer === "function" && object.constructor.isBuffer(object)) {
        return import_react2.default.createElement("span", null, "Buffer[".concat(object.length, "]"));
      }
      return import_react2.default.createElement("span", null, object.constructor.name);
    case "function":
      return import_react2.default.createElement("span", null, import_react2.default.createElement("span", {
        style: mkStyle("objectValueFunctionPrefix")
      }, "\u0192\xA0"), import_react2.default.createElement("span", {
        style: mkStyle("objectValueFunctionName")
      }, object.name, "()"));
    case "symbol":
      return import_react2.default.createElement("span", {
        style: mkStyle("objectValueSymbol")
      }, object.toString());
    default:
      return import_react2.default.createElement("span", null);
  }
};
ObjectValue.propTypes = {
  object: import_prop_types.default.any
};
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propertyIsEnumerable = Object.prototype.propertyIsEnumerable;
function getPropertyValue(object, propertyName) {
  var propertyDescriptor = Object.getOwnPropertyDescriptor(object, propertyName);
  if (propertyDescriptor.get) {
    try {
      return propertyDescriptor.get();
    } catch (_unused) {
      return propertyDescriptor.get;
    }
  }
  return object[propertyName];
}
function intersperse(arr, sep) {
  if (arr.length === 0) {
    return [];
  }
  return arr.slice(1).reduce(function(xs, x) {
    return xs.concat([sep, x]);
  }, [arr[0]]);
}
var ObjectPreview = function ObjectPreview2(_ref) {
  var data = _ref.data;
  var styles = useStyles("ObjectPreview");
  var object = data;
  if (_typeof(object) !== "object" || object === null || object instanceof Date || object instanceof RegExp) {
    return import_react2.default.createElement(ObjectValue, {
      object
    });
  }
  if (Array.isArray(object)) {
    var maxProperties = styles.arrayMaxProperties;
    var previewArray = object.slice(0, maxProperties).map(function(element, index) {
      return import_react2.default.createElement(ObjectValue, {
        key: index,
        object: element
      });
    });
    if (object.length > maxProperties) {
      previewArray.push(import_react2.default.createElement("span", {
        key: "ellipsis"
      }, "\u2026"));
    }
    var arrayLength = object.length;
    return import_react2.default.createElement(import_react2.default.Fragment, null, import_react2.default.createElement("span", {
      style: styles.objectDescription
    }, arrayLength === 0 ? "" : "(".concat(arrayLength, ")\xA0")), import_react2.default.createElement("span", {
      style: styles.preview
    }, "[", intersperse(previewArray, ", "), "]"));
  } else {
    var _maxProperties = styles.objectMaxProperties;
    var propertyNodes = [];
    for (var propertyName in object) {
      if (hasOwnProperty.call(object, propertyName)) {
        var ellipsis = void 0;
        if (propertyNodes.length === _maxProperties - 1 && Object.keys(object).length > _maxProperties) {
          ellipsis = import_react2.default.createElement("span", {
            key: "ellipsis"
          }, "\u2026");
        }
        var propertyValue = getPropertyValue(object, propertyName);
        propertyNodes.push(import_react2.default.createElement("span", {
          key: propertyName
        }, import_react2.default.createElement(ObjectName, {
          name: propertyName || '""'
        }), ":\xA0", import_react2.default.createElement(ObjectValue, {
          object: propertyValue
        }), ellipsis));
        if (ellipsis)
          break;
      }
    }
    var objectConstructorName = object.constructor ? object.constructor.name : "Object";
    return import_react2.default.createElement(import_react2.default.Fragment, null, import_react2.default.createElement("span", {
      style: styles.objectDescription
    }, objectConstructorName === "Object" ? "" : "".concat(objectConstructorName, " ")), import_react2.default.createElement("span", {
      style: styles.preview
    }, "{", intersperse(propertyNodes, ", "), "}"));
  }
};
var ObjectRootLabel = function ObjectRootLabel2(_ref) {
  var name = _ref.name, data = _ref.data;
  if (typeof name === "string") {
    return import_react2.default.createElement("span", null, import_react2.default.createElement(ObjectName, {
      name
    }), import_react2.default.createElement("span", null, ": "), import_react2.default.createElement(ObjectPreview, {
      data
    }));
  } else {
    return import_react2.default.createElement(ObjectPreview, {
      data
    });
  }
};
var ObjectLabel = function ObjectLabel2(_ref) {
  var name = _ref.name, data = _ref.data, _ref$isNonenumerable = _ref.isNonenumerable, isNonenumerable = _ref$isNonenumerable === void 0 ? false : _ref$isNonenumerable;
  var object = data;
  return import_react2.default.createElement("span", null, typeof name === "string" ? import_react2.default.createElement(ObjectName, {
    name,
    dimmed: isNonenumerable
  }) : import_react2.default.createElement(ObjectPreview, {
    data: name
  }), import_react2.default.createElement("span", null, ": "), import_react2.default.createElement(ObjectValue, {
    object
  }));
};
ObjectLabel.propTypes = {
  isNonenumerable: import_prop_types.default.bool
};
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;
  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it)
        o = it;
      var i = 0;
      var F = function F2() {
      };
      return { s: F, n: function n() {
        if (i >= o.length)
          return { done: true };
        return { done: false, value: o[i++] };
      }, e: function e(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return { s: function s() {
    it = o[Symbol.iterator]();
  }, n: function n() {
    var step = it.next();
    normalCompletion = step.done;
    return step;
  }, e: function e(_e2) {
    didErr = true;
    err = _e2;
  }, f: function f() {
    try {
      if (!normalCompletion && it.return != null)
        it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
var createIterator = function createIterator2(showNonenumerable, sortObjectKeys) {
  var objectIterator = regenerator.mark(function objectIterator2(data) {
    var shouldIterate, dataIsArray, i, _iterator, _step, entry, _entry, k, v, keys, _iterator2, _step2, propertyName, propertyValue, _propertyValue;
    return regenerator.wrap(function objectIterator$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            shouldIterate = _typeof(data) === "object" && data !== null || typeof data === "function";
            if (shouldIterate) {
              _context.next = 3;
              break;
            }
            return _context.abrupt("return");
          case 3:
            dataIsArray = Array.isArray(data);
            if (!(!dataIsArray && data[Symbol.iterator])) {
              _context.next = 32;
              break;
            }
            i = 0;
            _iterator = _createForOfIteratorHelper(data);
            _context.prev = 7;
            _iterator.s();
          case 9:
            if ((_step = _iterator.n()).done) {
              _context.next = 22;
              break;
            }
            entry = _step.value;
            if (!(Array.isArray(entry) && entry.length === 2)) {
              _context.next = 17;
              break;
            }
            _entry = _slicedToArray(entry, 2), k = _entry[0], v = _entry[1];
            _context.next = 15;
            return {
              name: k,
              data: v
            };
          case 15:
            _context.next = 19;
            break;
          case 17:
            _context.next = 19;
            return {
              name: i.toString(),
              data: entry
            };
          case 19:
            i++;
          case 20:
            _context.next = 9;
            break;
          case 22:
            _context.next = 27;
            break;
          case 24:
            _context.prev = 24;
            _context.t0 = _context["catch"](7);
            _iterator.e(_context.t0);
          case 27:
            _context.prev = 27;
            _iterator.f();
            return _context.finish(27);
          case 30:
            _context.next = 64;
            break;
          case 32:
            keys = Object.getOwnPropertyNames(data);
            if (sortObjectKeys === true && !dataIsArray) {
              keys.sort();
            } else if (typeof sortObjectKeys === "function") {
              keys.sort(sortObjectKeys);
            }
            _iterator2 = _createForOfIteratorHelper(keys);
            _context.prev = 35;
            _iterator2.s();
          case 37:
            if ((_step2 = _iterator2.n()).done) {
              _context.next = 53;
              break;
            }
            propertyName = _step2.value;
            if (!propertyIsEnumerable.call(data, propertyName)) {
              _context.next = 45;
              break;
            }
            propertyValue = getPropertyValue(data, propertyName);
            _context.next = 43;
            return {
              name: propertyName || '""',
              data: propertyValue
            };
          case 43:
            _context.next = 51;
            break;
          case 45:
            if (!showNonenumerable) {
              _context.next = 51;
              break;
            }
            _propertyValue = void 0;
            try {
              _propertyValue = getPropertyValue(data, propertyName);
            } catch (e) {
            }
            if (!(_propertyValue !== void 0)) {
              _context.next = 51;
              break;
            }
            _context.next = 51;
            return {
              name: propertyName,
              data: _propertyValue,
              isNonenumerable: true
            };
          case 51:
            _context.next = 37;
            break;
          case 53:
            _context.next = 58;
            break;
          case 55:
            _context.prev = 55;
            _context.t1 = _context["catch"](35);
            _iterator2.e(_context.t1);
          case 58:
            _context.prev = 58;
            _iterator2.f();
            return _context.finish(58);
          case 61:
            if (!(showNonenumerable && data !== Object.prototype)) {
              _context.next = 64;
              break;
            }
            _context.next = 64;
            return {
              name: "__proto__",
              data: Object.getPrototypeOf(data),
              isNonenumerable: true
            };
          case 64:
          case "end":
            return _context.stop();
        }
      }
    }, objectIterator2, null, [[7, 24, 27, 30], [35, 55, 58, 61]]);
  });
  return objectIterator;
};
var defaultNodeRenderer = function defaultNodeRenderer2(_ref) {
  var depth = _ref.depth, name = _ref.name, data = _ref.data, isNonenumerable = _ref.isNonenumerable;
  return depth === 0 ? import_react2.default.createElement(ObjectRootLabel, {
    name,
    data
  }) : import_react2.default.createElement(ObjectLabel, {
    name,
    data,
    isNonenumerable
  });
};
var ObjectInspector = function ObjectInspector2(_ref2) {
  var _ref2$showNonenumerab = _ref2.showNonenumerable, showNonenumerable = _ref2$showNonenumerab === void 0 ? false : _ref2$showNonenumerab, sortObjectKeys = _ref2.sortObjectKeys, nodeRenderer = _ref2.nodeRenderer, treeViewProps = _objectWithoutProperties(_ref2, ["showNonenumerable", "sortObjectKeys", "nodeRenderer"]);
  var dataIterator = createIterator(showNonenumerable, sortObjectKeys);
  var renderer = nodeRenderer ? nodeRenderer : defaultNodeRenderer;
  return import_react2.default.createElement(TreeView, _extends({
    nodeRenderer: renderer,
    dataIterator
  }, treeViewProps));
};
ObjectInspector.propTypes = {
  expandLevel: import_prop_types.default.number,
  expandPaths: import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.array]),
  name: import_prop_types.default.string,
  data: import_prop_types.default.any,
  showNonenumerable: import_prop_types.default.bool,
  sortObjectKeys: import_prop_types.default.oneOfType([import_prop_types.default.bool, import_prop_types.default.func]),
  nodeRenderer: import_prop_types.default.func
};
var ObjectInspector$1 = themeAcceptor(ObjectInspector);
if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement) {
    var O = Object(this);
    var len = parseInt(O.length) || 0;
    if (len === 0) {
      return false;
    }
    var n = parseInt(arguments[1]) || 0;
    var k;
    if (n >= 0) {
      k = n;
    } else {
      k = len + n;
      if (k < 0) {
        k = 0;
      }
    }
    var currentElement;
    while (k < len) {
      currentElement = O[k];
      if (searchElement === currentElement || searchElement !== searchElement && currentElement !== currentElement) {
        return true;
      }
      k++;
    }
    return false;
  };
}
function getHeaders(data) {
  if (_typeof(data) === "object") {
    var rowHeaders;
    if (Array.isArray(data)) {
      var nRows = data.length;
      rowHeaders = _toConsumableArray(Array(nRows).keys());
    } else if (data !== null) {
      rowHeaders = Object.keys(data);
    }
    var colHeaders = rowHeaders.reduce(function(colHeaders2, rowHeader) {
      var row = data[rowHeader];
      if (_typeof(row) === "object" && row !== null) {
        var cols = Object.keys(row);
        cols.reduce(function(xs, x) {
          if (!xs.includes(x)) {
            xs.push(x);
          }
          return xs;
        }, colHeaders2);
      }
      return colHeaders2;
    }, []);
    return {
      rowHeaders,
      colHeaders
    };
  }
  return void 0;
}
function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys$1(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$1(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
var DataContainer = function DataContainer2(_ref) {
  var rows = _ref.rows, columns = _ref.columns, rowsData = _ref.rowsData;
  var styles = useStyles("TableInspectorDataContainer");
  var borderStyles = useStyles("TableInspectorLeftBorder");
  return import_react2.default.createElement("div", {
    style: styles.div
  }, import_react2.default.createElement("table", {
    style: styles.table
  }, import_react2.default.createElement("colgroup", null), import_react2.default.createElement("tbody", null, rows.map(function(row, i) {
    return import_react2.default.createElement("tr", {
      key: row,
      style: styles.tr
    }, import_react2.default.createElement("td", {
      style: _objectSpread$1(_objectSpread$1({}, styles.td), borderStyles.none)
    }, row), columns.map(function(column) {
      var rowData = rowsData[i];
      if (_typeof(rowData) === "object" && rowData !== null && hasOwnProperty.call(rowData, column)) {
        return import_react2.default.createElement("td", {
          key: column,
          style: _objectSpread$1(_objectSpread$1({}, styles.td), borderStyles.solid)
        }, import_react2.default.createElement(ObjectValue, {
          object: rowData[column]
        }));
      } else {
        return import_react2.default.createElement("td", {
          key: column,
          style: _objectSpread$1(_objectSpread$1({}, styles.td), borderStyles.solid)
        });
      }
    }));
  }))));
};
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
var SortIconContainer = function SortIconContainer2(props) {
  return import_react2.default.createElement("div", {
    style: {
      position: "absolute",
      top: 1,
      right: 0,
      bottom: 1,
      display: "flex",
      alignItems: "center"
    }
  }, props.children);
};
var SortIcon = function SortIcon2(_ref) {
  var sortAscending = _ref.sortAscending;
  var styles = useStyles("TableInspectorSortIcon");
  var glyph = sortAscending ? "\u25B2" : "\u25BC";
  return import_react2.default.createElement("div", {
    style: styles
  }, glyph);
};
var TH = function TH2(_ref2) {
  var _ref2$sortAscending = _ref2.sortAscending, sortAscending = _ref2$sortAscending === void 0 ? false : _ref2$sortAscending, _ref2$sorted = _ref2.sorted, sorted = _ref2$sorted === void 0 ? false : _ref2$sorted, _ref2$onClick = _ref2.onClick, onClick = _ref2$onClick === void 0 ? void 0 : _ref2$onClick, _ref2$borderStyle = _ref2.borderStyle, borderStyle = _ref2$borderStyle === void 0 ? {} : _ref2$borderStyle, children = _ref2.children, thProps = _objectWithoutProperties(_ref2, ["sortAscending", "sorted", "onClick", "borderStyle", "children"]);
  var styles = useStyles("TableInspectorTH");
  var _useState = (0, import_react2.useState)(false), _useState2 = _slicedToArray(_useState, 2), hovered = _useState2[0], setHovered = _useState2[1];
  var handleMouseEnter = (0, import_react2.useCallback)(function() {
    return setHovered(true);
  }, []);
  var handleMouseLeave = (0, import_react2.useCallback)(function() {
    return setHovered(false);
  }, []);
  return import_react2.default.createElement("th", _extends({}, thProps, {
    style: _objectSpread(_objectSpread(_objectSpread({}, styles.base), borderStyle), hovered ? styles.base[":hover"] : {}),
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick
  }), import_react2.default.createElement("div", {
    style: styles.div
  }, children), sorted && import_react2.default.createElement(SortIconContainer, null, import_react2.default.createElement(SortIcon, {
    sortAscending
  })));
};
var HeaderContainer = function HeaderContainer2(_ref) {
  var _ref$indexColumnText = _ref.indexColumnText, indexColumnText = _ref$indexColumnText === void 0 ? "(index)" : _ref$indexColumnText, _ref$columns = _ref.columns, columns = _ref$columns === void 0 ? [] : _ref$columns, sorted = _ref.sorted, sortIndexColumn = _ref.sortIndexColumn, sortColumn = _ref.sortColumn, sortAscending = _ref.sortAscending, onTHClick = _ref.onTHClick, onIndexTHClick = _ref.onIndexTHClick;
  var styles = useStyles("TableInspectorHeaderContainer");
  var borderStyles = useStyles("TableInspectorLeftBorder");
  return import_react2.default.createElement("div", {
    style: styles.base
  }, import_react2.default.createElement("table", {
    style: styles.table
  }, import_react2.default.createElement("tbody", null, import_react2.default.createElement("tr", null, import_react2.default.createElement(TH, {
    borderStyle: borderStyles.none,
    sorted: sorted && sortIndexColumn,
    sortAscending,
    onClick: onIndexTHClick
  }, indexColumnText), columns.map(function(column) {
    return import_react2.default.createElement(TH, {
      borderStyle: borderStyles.solid,
      key: column,
      sorted: sorted && sortColumn === column,
      sortAscending,
      onClick: onTHClick.bind(null, column)
    }, column);
  })))));
};
var TableInspector = function TableInspector2(_ref) {
  var data = _ref.data, columns = _ref.columns;
  var styles = useStyles("TableInspector");
  var _useState = (0, import_react2.useState)({
    sorted: false,
    sortIndexColumn: false,
    sortColumn: void 0,
    sortAscending: false
  }), _useState2 = _slicedToArray(_useState, 2), _useState2$ = _useState2[0], sorted = _useState2$.sorted, sortIndexColumn = _useState2$.sortIndexColumn, sortColumn = _useState2$.sortColumn, sortAscending = _useState2$.sortAscending, setState = _useState2[1];
  var handleIndexTHClick = (0, import_react2.useCallback)(function() {
    setState(function(_ref2) {
      var sortIndexColumn2 = _ref2.sortIndexColumn, sortAscending2 = _ref2.sortAscending;
      return {
        sorted: true,
        sortIndexColumn: true,
        sortColumn: void 0,
        sortAscending: sortIndexColumn2 ? !sortAscending2 : true
      };
    });
  }, []);
  var handleTHClick = (0, import_react2.useCallback)(function(col) {
    setState(function(_ref3) {
      var sortColumn2 = _ref3.sortColumn, sortAscending2 = _ref3.sortAscending;
      return {
        sorted: true,
        sortIndexColumn: false,
        sortColumn: col,
        sortAscending: col === sortColumn2 ? !sortAscending2 : true
      };
    });
  }, []);
  if (_typeof(data) !== "object" || data === null) {
    return import_react2.default.createElement("div", null);
  }
  var _getHeaders = getHeaders(data), rowHeaders = _getHeaders.rowHeaders, colHeaders = _getHeaders.colHeaders;
  if (columns !== void 0) {
    colHeaders = columns;
  }
  var rowsData = rowHeaders.map(function(rowHeader) {
    return data[rowHeader];
  });
  var columnDataWithRowIndexes;
  if (sortColumn !== void 0) {
    columnDataWithRowIndexes = rowsData.map(function(rowData, index) {
      if (_typeof(rowData) === "object" && rowData !== null) {
        var columnData = rowData[sortColumn];
        return [columnData, index];
      }
      return [void 0, index];
    });
  } else {
    if (sortIndexColumn) {
      columnDataWithRowIndexes = rowHeaders.map(function(rowData, index) {
        var columnData = rowHeaders[index];
        return [columnData, index];
      });
    }
  }
  if (columnDataWithRowIndexes !== void 0) {
    var comparator = function comparator2(mapper, ascending) {
      return function(a, b) {
        var v1 = mapper(a);
        var v2 = mapper(b);
        var type1 = _typeof(v1);
        var type2 = _typeof(v2);
        var lt = function lt2(v12, v22) {
          if (v12 < v22) {
            return -1;
          } else if (v12 > v22) {
            return 1;
          } else {
            return 0;
          }
        };
        var result;
        if (type1 === type2) {
          result = lt(v1, v2);
        } else {
          var order = {
            string: 0,
            number: 1,
            object: 2,
            symbol: 3,
            boolean: 4,
            undefined: 5,
            function: 6
          };
          result = lt(order[type1], order[type2]);
        }
        if (!ascending)
          result = -result;
        return result;
      };
    };
    var sortedRowIndexes = columnDataWithRowIndexes.sort(comparator(function(item) {
      return item[0];
    }, sortAscending)).map(function(item) {
      return item[1];
    });
    rowHeaders = sortedRowIndexes.map(function(i) {
      return rowHeaders[i];
    });
    rowsData = sortedRowIndexes.map(function(i) {
      return rowsData[i];
    });
  }
  return import_react2.default.createElement("div", {
    style: styles.base
  }, import_react2.default.createElement(HeaderContainer, {
    columns: colHeaders,
    sorted,
    sortIndexColumn,
    sortColumn,
    sortAscending,
    onTHClick: handleTHClick,
    onIndexTHClick: handleIndexTHClick
  }), import_react2.default.createElement(DataContainer, {
    rows: rowHeaders,
    columns: colHeaders,
    rowsData
  }));
};
TableInspector.propTypes = {
  data: import_prop_types.default.oneOfType([import_prop_types.default.array, import_prop_types.default.object]),
  columns: import_prop_types.default.array
};
var TableInspector$1 = themeAcceptor(TableInspector);
var TEXT_NODE_MAX_INLINE_CHARS = 80;
var shouldInline = function shouldInline2(data) {
  return data.childNodes.length === 0 || data.childNodes.length === 1 && data.childNodes[0].nodeType === Node.TEXT_NODE && data.textContent.length < TEXT_NODE_MAX_INLINE_CHARS;
};
var OpenTag = function OpenTag2(_ref) {
  var tagName = _ref.tagName, attributes = _ref.attributes, styles = _ref.styles;
  return import_react2.default.createElement("span", {
    style: styles.base
  }, "<", import_react2.default.createElement("span", {
    style: styles.tagName
  }, tagName), function() {
    if (attributes) {
      var attributeNodes = [];
      for (var i = 0; i < attributes.length; i++) {
        var attribute = attributes[i];
        attributeNodes.push(import_react2.default.createElement("span", {
          key: i
        }, " ", import_react2.default.createElement("span", {
          style: styles.htmlAttributeName
        }, attribute.name), '="', import_react2.default.createElement("span", {
          style: styles.htmlAttributeValue
        }, attribute.value), '"'));
      }
      return attributeNodes;
    }
  }(), ">");
};
var CloseTag = function CloseTag2(_ref2) {
  var tagName = _ref2.tagName, _ref2$isChildNode = _ref2.isChildNode, isChildNode = _ref2$isChildNode === void 0 ? false : _ref2$isChildNode, styles = _ref2.styles;
  return import_react2.default.createElement("span", {
    style: _extends({}, styles.base, isChildNode && styles.offsetLeft)
  }, "</", import_react2.default.createElement("span", {
    style: styles.tagName
  }, tagName), ">");
};
var nameByNodeType = {
  1: "ELEMENT_NODE",
  3: "TEXT_NODE",
  7: "PROCESSING_INSTRUCTION_NODE",
  8: "COMMENT_NODE",
  9: "DOCUMENT_NODE",
  10: "DOCUMENT_TYPE_NODE",
  11: "DOCUMENT_FRAGMENT_NODE"
};
var DOMNodePreview = function DOMNodePreview2(_ref3) {
  var isCloseTag = _ref3.isCloseTag, data = _ref3.data, expanded = _ref3.expanded;
  var styles = useStyles("DOMNodePreview");
  if (isCloseTag) {
    return import_react2.default.createElement(CloseTag, {
      styles: styles.htmlCloseTag,
      isChildNode: true,
      tagName: data.tagName
    });
  }
  switch (data.nodeType) {
    case Node.ELEMENT_NODE:
      return import_react2.default.createElement("span", null, import_react2.default.createElement(OpenTag, {
        tagName: data.tagName,
        attributes: data.attributes,
        styles: styles.htmlOpenTag
      }), shouldInline(data) ? data.textContent : !expanded && "\u2026", !expanded && import_react2.default.createElement(CloseTag, {
        tagName: data.tagName,
        styles: styles.htmlCloseTag
      }));
    case Node.TEXT_NODE:
      return import_react2.default.createElement("span", null, data.textContent);
    case Node.CDATA_SECTION_NODE:
      return import_react2.default.createElement("span", null, "<![CDATA[" + data.textContent + "]]>");
    case Node.COMMENT_NODE:
      return import_react2.default.createElement("span", {
        style: styles.htmlComment
      }, "<!--", data.textContent, "-->");
    case Node.PROCESSING_INSTRUCTION_NODE:
      return import_react2.default.createElement("span", null, data.nodeName);
    case Node.DOCUMENT_TYPE_NODE:
      return import_react2.default.createElement("span", {
        style: styles.htmlDoctype
      }, "<!DOCTYPE ", data.name, data.publicId ? ' PUBLIC "'.concat(data.publicId, '"') : "", !data.publicId && data.systemId ? " SYSTEM" : "", data.systemId ? ' "'.concat(data.systemId, '"') : "", ">");
    case Node.DOCUMENT_NODE:
      return import_react2.default.createElement("span", null, data.nodeName);
    case Node.DOCUMENT_FRAGMENT_NODE:
      return import_react2.default.createElement("span", null, data.nodeName);
    default:
      return import_react2.default.createElement("span", null, nameByNodeType[data.nodeType]);
  }
};
DOMNodePreview.propTypes = {
  isCloseTag: import_prop_types.default.bool,
  name: import_prop_types.default.string,
  data: import_prop_types.default.object.isRequired,
  expanded: import_prop_types.default.bool.isRequired
};
var domIterator = regenerator.mark(function domIterator2(data) {
  var textInlined, i, node;
  return regenerator.wrap(function domIterator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(data && data.childNodes)) {
            _context.next = 17;
            break;
          }
          textInlined = shouldInline(data);
          if (!textInlined) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return");
        case 4:
          i = 0;
        case 5:
          if (!(i < data.childNodes.length)) {
            _context.next = 14;
            break;
          }
          node = data.childNodes[i];
          if (!(node.nodeType === Node.TEXT_NODE && node.textContent.trim().length === 0)) {
            _context.next = 9;
            break;
          }
          return _context.abrupt("continue", 11);
        case 9:
          _context.next = 11;
          return {
            name: "".concat(node.tagName, "[").concat(i, "]"),
            data: node
          };
        case 11:
          i++;
          _context.next = 5;
          break;
        case 14:
          if (!data.tagName) {
            _context.next = 17;
            break;
          }
          _context.next = 17;
          return {
            name: "CLOSE_TAG",
            data: {
              tagName: data.tagName
            },
            isCloseTag: true
          };
        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, domIterator2);
});
var DOMInspector = function DOMInspector2(props) {
  return import_react2.default.createElement(TreeView, _extends({
    nodeRenderer: DOMNodePreview,
    dataIterator: domIterator
  }, props));
};
DOMInspector.propTypes = {
  data: import_prop_types.default.object.isRequired
};
var DOMInspector$1 = themeAcceptor(DOMInspector);
var Inspector = function Inspector2(_ref) {
  var _ref$table = _ref.table, table = _ref$table === void 0 ? false : _ref$table, data = _ref.data, rest = _objectWithoutProperties(_ref, ["table", "data"]);
  if (table) {
    return import_react2.default.createElement(TableInspector$1, _extends({
      data
    }, rest));
  }
  if ((0, import_is_dom.default)(data))
    return import_react2.default.createElement(DOMInspector$1, _extends({
      data
    }, rest));
  return import_react2.default.createElement(ObjectInspector$1, _extends({
    data
  }, rest));
};
Inspector.propTypes = {
  data: import_prop_types.default.any,
  name: import_prop_types.default.string,
  table: import_prop_types.default.bool
};

// app/components/schema-output.tsx
var SchemaOutput = ({ dmmf }) => {
  return /* @__PURE__ */ React.createElement(ObjectInspector$1, {
    data: dmmf,
    theme: {
      ...theme$1,
      BASE_BACKGROUND_COLOR: "#1E293B",
      BASE_FONT_SIZE: "24px",
      TREENODE_FONT_SIZE: "1rem"
    }
  });
};

// app/routes/index.tsx
function Index() {
  var _a, _b, _c;
  const fetcher = useFetcher();
  return /* @__PURE__ */ React.createElement("div", {
    className: "h-screen w-full bg-gray-900 font-mono flex flex-col pt-8"
  }, /* @__PURE__ */ React.createElement("p", {
    className: "text-gray-900 p-2 relative font-extrabold text-4xl text-center bg-gradient-to-r from-green-400 to-blue-500 "
  }, "Prisma Schema Analyzer", /* @__PURE__ */ React.createElement("span", {
    className: "absolute right-4 text-sm top-5"
  }, "Made with \u2764\uFE0F by\xA0", /* @__PURE__ */ React.createElement("a", {
    className: "text-teal-300 animate-pulse",
    href: "https://www.twitter.com/sabinthedev",
    target: "_blank"
  }, "@sabinthedev"))), /* @__PURE__ */ React.createElement("div", {
    className: "flex gap-x-10 h-full w-full p-12"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "h-full flex-1 rounded-xl overflow-scroll"
  }, /* @__PURE__ */ React.createElement(SchemaForm, {
    fetcher
  })), /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center"
  }, /* @__PURE__ */ React.createElement("button", {
    type: "submit",
    form: "schema-form",
    className: "bg-teal-400 transition duration-700 ease-in-out hover:-translate-y-2 bg-gradient-to-r from-green-400 to-blue-500 hover:opacity-75 hover:drop-shadow-xl rounded-full w-24 h-24 flex justify-center items-center relative font-bold text-slate-800"
  }, "Process")), /* @__PURE__ */ React.createElement("div", {
    className: `
        ${((_a = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _a.error) && "flex justify-center items-center animate-pulse text-center drop-shadow-[0_0_15px_rgb(251,113,133)]"}
        ${(fetcher == null ? void 0 : fetcher.data) && !((_b = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _b.error) && `drop-shadow-[0_0_15px_#5eead4]`}
        h-full flex-1  rounded-xl overflow-scroll p-4 bg-slate-800 px-8
      `
  }, ((_c = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _c.error) ? /* @__PURE__ */ React.createElement("p", {
    className: "font-extrabold text-2xl m-0 p-0 text-rose-400"
  }, fetcher.data.error) : (fetcher == null ? void 0 : fetcher.data) && /* @__PURE__ */ React.createElement(SchemaOutput, {
    dmmf: fetcher == null ? void 0 : fetcher.data
  }))));
}
export {
  Index as default
};
/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
//# sourceMappingURL=/_static/build/routes/index-WWVFNT5V.js.map
