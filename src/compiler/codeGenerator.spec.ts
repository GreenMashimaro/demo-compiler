import { describe, expect, it } from 'vitest'
import { codeGenerator } from './codeGenerator'
import { tokenizer } from './tokenizer'
import { parser } from './parser'
import { transformer } from './transformer'

describe('codeGenerator', () => {
  it('(add 2 (subtract 4 2))', () => {
    const tokens = tokenizer('(add 2 (subtract 4 2))')
    const ast = parser(tokens)
    const newAst = transformer(ast)
    const codeStr = codeGenerator(newAst)

    expect(codeStr).toMatchInlineSnapshot('"add(2, subtract(4, 2));"')
  })
})
