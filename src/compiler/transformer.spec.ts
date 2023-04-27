import { describe, expect, it } from 'vitest'
import { parser } from './parser'
import { tokenizer } from './tokenizer'
import { transformer } from './transformer'

describe('transformer', () => {
  it('(add 2 (subtract 4 2))', () => {
    const tokens = tokenizer('(add 2 (subtract 4 2))')
    const ast = parser(tokens)
    const newAst = transformer(ast)

    expect(newAst).toMatchInlineSnapshot(`
      {
        "body": [
          {
            "expression": {
              "arguments": [
                {
                  "type": "NumberLiteral",
                  "value": "2",
                },
                {
                  "arguments": [
                    {
                      "type": "NumberLiteral",
                      "value": "4",
                    },
                    {
                      "type": "NumberLiteral",
                      "value": "2",
                    },
                  ],
                  "callee": {
                    "name": "subtract",
                    "type": "Identifier",
                  },
                  "type": "CallExpressionIdent",
                },
              ],
              "callee": {
                "name": "add",
                "type": "Identifier",
              },
              "type": "CallExpressionIdent",
            },
            "type": "ExpressionStatement",
          },
        ],
        "type": "Program",
      }
    `)
  })
})
