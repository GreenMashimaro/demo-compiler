import type { IToken } from './parser'

// eslint-disable-next-line sonarjs/cognitive-complexity
export function tokenizer(input: string): IToken[] {
  let current = 0
  const tokens: IToken[] = []

  while (current < input.length) {
    let char = input[current]

    if (char === '(') {
      tokens.push({ type: 'paren', value: '(' })
      current++
      continue
    }

    if (char === ')') {
      tokens.push({ type: 'paren', value: ')' })
      current++
      continue
    }

    const WHITESPACE = /\s/
    if (WHITESPACE.test(char)) {
      current++
      continue
    }

    const NUMBERS = /[0-9]/
    if (NUMBERS.test(char)) {
      let value: string = ''

      while (NUMBERS.test(char)) {
        value += char
        char = input[++current]
      }

      tokens.push({ type: 'number', value })
      continue
    }

    const LETTERS = /[a-z]/i
    if (LETTERS.test(char)) {
      let value = ''

      while (LETTERS.test(char)) {
        value += char
        char = input[++current]
      }

      tokens.push({ type: 'name', value })

      continue
    }

    if (char === '"') {
      let value = ''
      char = input[++current]

      while (char !== '"') {
        value += char
        char = input[++current]
      }
      char = input[++current]
      tokens.push({ type: 'string', value })
      continue
    }

    throw new TypeError('I dont konw what this character is: ' + char)
  }

  return tokens
}
