import { describe, expect, it } from 'vitest'
import { tokenizer } from './tokenizer'
import type { AST } from './parser'
import { parser } from './parser'
import { traverser } from './traverser'

function visitorUtil(ast: AST, visitorLog: string[]) {
  traverser(ast, {
    Program: {
      enter() {
        visitorLog.push('Program enter')
      },
      exit() {
        visitorLog.push('Program exit')
      },
    },
    NumberLiteral: {
      enter() {
        visitorLog.push('NumberLiteral enter')
      },
      exit() {
        visitorLog.push('NumberLiteral exit')
      },
    },
    StringLiteral: {
      enter() {
        visitorLog.push('StringLiteral enter')
      },
      exit() {
        visitorLog.push('StringLiteral exit')
      },
    },
    CallExpression: {
      enter(node) {
        const name = 'name' in node ? node.name : ''
        visitorLog.push(`CallExpression ${name} enter`)
      },
      exit(node) {
        const name = 'name' in node ? node.name : ''
        visitorLog.push(`CallExpression ${name} exit`)
      },
    },
  })
}

describe('traverser', () => {
  it('(add 2 3)', () => {
    const tokens = tokenizer('(add 2 3)')
    const ast = parser(tokens)
    const visitorLog: string[] = []

    visitorUtil(ast, visitorLog)
    expect(visitorLog).toMatchInlineSnapshot(`
      [
        "Program enter",
        "CallExpression add enter",
        "NumberLiteral enter",
        "NumberLiteral exit",
        "NumberLiteral enter",
        "NumberLiteral exit",
        "CallExpression add exit",
        "Program exit",
      ]
    `)
  })

  it('(add 2 (subtract 4 2))', () => {
    const tokens = tokenizer('(add 2 (subtract 4 2))')
    const ast = parser(tokens)
    const visitorLog: string[] = []

    visitorUtil(ast, visitorLog)
    expect(visitorLog).toMatchInlineSnapshot(`
      [
        "Program enter",
        "CallExpression add enter",
        "NumberLiteral enter",
        "NumberLiteral exit",
        "CallExpression subtract enter",
        "NumberLiteral enter",
        "NumberLiteral exit",
        "NumberLiteral enter",
        "NumberLiteral exit",
        "CallExpression subtract exit",
        "CallExpression add exit",
        "Program exit",
      ]
    `)
  })
})
