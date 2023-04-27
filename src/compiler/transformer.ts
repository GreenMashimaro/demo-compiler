import type {
  AST,
  INodeCallExpression,
  INodeCallExpressionIdent,
  INodeExpressionStatement,
  INodeProgram,
  INodeStringLiteral,
} from './parser'
import type { INodeNumberLiteral } from './parser'
import { traverser } from './traverser'

export function transformer(ast: AST): AST {
  const newAst: INodeProgram = {
    type: 'Program',
    body: [],
  }

  // @ts-expect-error
  ast._context = newAst.body

  traverser(ast, {
    NumberLiteral: {
      enter(node, parent) {
        node = node as INodeNumberLiteral
        const _node: INodeNumberLiteral = {
          type: 'NumberLiteral',
          value: node.value,
        }
        // @ts-expect-error
        parent._context.push(_node)
      },
    },

    StringLiteral: {
      enter(node, parent) {
        node = node as INodeStringLiteral
        const _node: INodeStringLiteral = {
          type: 'StringLiteral',
          value: node.value,
        }
        // @ts-expect-error
        parent._context.push(_node)
      },
    },

    CallExpression: {
      enter(node, parent) {
        node = node as INodeCallExpression
        let expression: INodeCallExpressionIdent | INodeExpressionStatement = {
          type: 'CallExpressionIdent',
          callee: {
            type: 'Identifier',
            name: node.name,
          },
          arguments: [],
        }

        // @ts-expect-error
        node._context = expression.arguments

        if (parent && parent.type !== 'CallExpression') {
          const _expression: INodeExpressionStatement = {
            type: 'ExpressionStatement',
            expression: expression,
          }

          expression = _expression
        }

        // @ts-expect-error
        parent._context.push(expression)
      },
    },
  })

  return newAst
}
