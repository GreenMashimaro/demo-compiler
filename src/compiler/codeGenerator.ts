import type { AST } from './parser'

export function codeGenerator(node: AST): string {
  switch (node.type) {
    case 'Program':
      return node.body.map(codeGenerator).join('\n')

    case 'ExpressionStatement':
      return `${codeGenerator(node.expression)};`

    case 'CallExpressionIdent': {
      const args = node.arguments.map(codeGenerator).join(', ')
      return `${codeGenerator(node.callee as unknown as AST)}(${args})`
    }

    case 'Identifier':
      return node.name

    case 'NumberLiteral':
      return node.value

    case 'StringLiteral':
      return `"${node.value}"`

    default:
      throw new TypeError(node.type)
  }
}
