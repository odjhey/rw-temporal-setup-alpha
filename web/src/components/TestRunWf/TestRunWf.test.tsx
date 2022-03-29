import { render } from '@redwoodjs/testing/web'

import TestRunWf from './TestRunWf'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TestRunWf', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TestRunWf />)
    }).not.toThrow()
  })
})
