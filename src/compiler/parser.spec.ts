import { describe, expect, it } from 'vitest'
import { tokenizer } from './tokenizer'
import { parser } from './parser'

describe('parser', () => {
  it('(add 2 3)', () => {
    const tokens = tokenizer('(add 2 3)')
    const ast = parser(tokens)
    expect(ast).toMatchInlineSnapshot(`
      {
        "body": [
          {
            "name": "add",
            "params": [
              {
                "type": "NumberLiteral",
                "value": "2",
              },
              {
                "type": "NumberLiteral",
                "value": "3",
              },
            ],
            "type": "CallExpression",
          },
        ],
        "type": "Program",
      }
    `)
  })

  it('(add 2 (subtract 4 2))', () => {
    const tokens = tokenizer('(add 2 (subtract 4 2))')
    const ast = parser(tokens)
    expect(ast).toMatchInlineSnapshot(`
      {
        "body": [
          {
            "name": "add",
            "params": [
              {
                "type": "NumberLiteral",
                "value": "2",
              },
              {
                "name": "subtract",
                "params": [
                  {
                    "type": "NumberLiteral",
                    "value": "4",
                  },
                  {
                    "type": "NumberLiteral",
                    "value": "2",
                  },
                ],
                "type": "CallExpression",
              },
            ],
            "type": "CallExpression",
          },
        ],
        "type": "Program",
      }
    `)
  })
})
