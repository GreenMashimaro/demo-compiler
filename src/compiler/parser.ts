export interface IToken {
  type: 'paren' | 'number' | 'string' | 'name'
  value: string
}

export interface INodeNumberLiteral {
  type: 'NumberLiteral'
  value: string
}

export interface INodeStringLiteral {
  type: 'StringLiteral'
  value: string
}

export interface INodeCallExpression {
  type: 'CallExpression'
  name: string
  params: AST[]
}

export interface INodeProgram {
  type: 'Program'
  body: AST[]
}

export interface INodeIdentifier {
  type: 'Identifier'
  name: string
}

export interface INodeCallExpressionIdent {
  type: 'CallExpressionIdent'
  callee: INodeIdentifier
  arguments: AST[]
}

export interface INodeExpressionStatement {
  type: 'ExpressionStatement'
  expression: INodeCallExpressionIdent | INodeExpressionStatement
}

export type AST =
  | INodeNumberLiteral
  | INodeStringLiteral
  | INodeCallExpression
  | INodeProgram
  | INodeIdentifier
  | INodeCallExpressionIdent
  | INodeExpressionStatement

export function parser(tokens: IToken[]): AST {
  let current = 0

  function walk(): AST {
    let token = tokens[current]
    const tokenType = token.type

    if (tokenType === 'number') {
      current++
      return {
        type: 'NumberLiteral',
        value: token.value,
      }
    }

    if (tokenType === 'string') {
      current++
      return {
        type: 'StringLiteral',
        value: token.value,
      }
    }

    if (tokenType === 'paren' && token.value === '(') {
      token = tokens[++current]
      const node: INodeCallExpression = {
        type: 'CallExpression',
        name: token.value,
        params: [],
      }

      token = tokens[++current]

      while (token.type !== 'paren' || (token.type === 'paren' && token.value === '(')) {
        node.params.push(walk())
        token = tokens[current]
      }

      current++

      return node
    }

    throw new TypeError(token.type)
  }

  const ast: INodeProgram = {
    type: 'Program',
    body: [],
  }

  while (current < tokens.length) {
    ast.body.push(walk())
  }

  return ast
}
