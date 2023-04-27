import { describe, expect, it } from 'vitest'
import { tokenizer } from './tokenizer'

describe('tokenizer', () => {
  it('(', () => {
    const tokens = tokenizer('(')
    expect(tokens).toMatchInlineSnapshot(`
      [
        {
          "type": "paren",
          "value": "(",
        },
      ]
    `)
  })

  it(')', () => {
    const tokens = tokenizer(')')
    expect(tokens).toMatchInlineSnapshot(`
      [
        {
          "type": "paren",
          "value": ")",
        },
      ]
    `)
  })

  it('123', () => {
    const tokens = tokenizer('123')
    expect(tokens).toMatchInlineSnapshot(`
      [
        {
          "type": "number",
          "value": "123",
        },
      ]
    `)
  })

  it('  123', () => {
    const tokens = tokenizer('   123')
    expect(tokens).toMatchInlineSnapshot(`
      [
        {
          "type": "number",
          "value": "123",
        },
      ]
    `)
  })

  it('"hello"', () => {
    const tokens = tokenizer('"hello"')
    expect(tokens).toMatchInlineSnapshot(`
      [
        {
          "type": "string",
          "value": "hello",
        },
      ]
    `)
  })

  it('(add 2 3)', () => {
    const tokens = tokenizer('(add 2 3)')
    expect(tokens).toMatchInlineSnapshot(`
      [
        {
          "type": "paren",
          "value": "(",
        },
        {
          "type": "name",
          "value": "add",
        },
        {
          "type": "number",
          "value": "2",
        },
        {
          "type": "number",
          "value": "3",
        },
        {
          "type": "paren",
          "value": ")",
        },
      ]
    `)
  })
})
