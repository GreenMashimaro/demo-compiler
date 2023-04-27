import type { AST } from './parser'

type IVisitor = {
  [key in AST['type']]?: {
    enter?: (node: AST, parent: AST | null) => void
    exit?: (node: AST, parent: AST | null) => void
  }
}

export function traverser(ast: AST, visitor: IVisitor) {
  function traverseArray(array: AST[], parent: AST) {
    array.forEach((child) => {
      traverseNode(child, parent)
    })
  }

  function traverseNode(node: AST, parent: AST | null) {
    const methods = visitor[node.type]

    if (methods && methods.enter) {
      methods.enter(node, parent)
    }

    switch (node.type) {
      case 'Program':
        traverseArray(node.body, node)
        break
      case 'CallExpression':
        traverseArray(node.params, node)
        break
      case 'NumberLiteral':
      case 'StringLiteral':
        break
      default:
        throw new TypeError((node as AST).type)
    }

    if (methods && methods.exit) {
      methods.exit(node, parent)
    }
  }

  traverseNode(ast, null)
}
