import { render } from '@redwoodjs/testing/web'

import TestRunWfLayout from './TestRunWfLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('TestRunWfLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TestRunWfLayout />)
    }).not.toThrow()
  })
})
