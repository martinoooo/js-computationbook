export const GRAMMAR = [
  { token: "i", pattern: "if" }, // # if keyword
  { token: "e", pattern: "else" }, // # else keyword
  { token: "w", pattern: "while" }, // # while keyword
  { token: "d", pattern: "do-nothing" }, // # do-nothing keyword
  { token: "(", pattern: "\\(" }, // # opening bracket
  { token: ")", pattern: "\\)" }, // # closing bracket
  { token: "{", pattern: "\\{" }, // # opening curly bracket
  { token: "}", pattern: "\\}" }, // # closing curly bracket
  { token: ";", pattern: "\\;" }, // # semicolon
  { token: "=", pattern: "\\=" }, // # equals sign
  { token: "+", pattern: "\\+" }, // # addition sign
  { token: "*", pattern: "\\*" }, // # multiplication sign
  { token: "<", pattern: "\\<" }, // # less-than sign
  { token: "n", pattern: "[0-9]+" }, //  # number
  { token: "b", pattern: "true|false" }, // # boolean
  { token: "v", pattern: "[a-z]+" } //  # variable name
];

class LexicalAnalyzer {
  constructor(string) {
    this.string = string;
  }

  analyze() {
    const tokens = [];
    while (this.more_tokens()) {
      tokens.push(this.next_token());
    }
    return tokens;
  }

  more_tokens() {
    return this.string !== "";
  }

  next_token() {
    const [rule, match] = this.rule_matching(this.string);
    this.string = this.string_after(match);
    return rule.token;
  }

  rule_matching(string) {
    const matches = GRAMMAR.map(rule => {
      return [rule, this.match_at_beginning(rule.pattern, string)];
    });
    const rules_with_matches = matches.filter(match => {
      return !!match[1];
    });
    return this.rule_with_longest_match(rules_with_matches);
  }

  match_at_beginning(pattern, string) {
    const reg = new RegExp("^" + pattern, "g");
    return reg.exec(string);
  }

  rule_with_longest_match(rules_with_matches) {
    return rules_with_matches.sort((a, b) => {
      return a[1][0].length < b[1][0].length;
    })[0];
  }

  string_after(match) {
    return match.input.replace(match[0], "").replace(/^\s/, "");
  }
}

export default LexicalAnalyzer;
