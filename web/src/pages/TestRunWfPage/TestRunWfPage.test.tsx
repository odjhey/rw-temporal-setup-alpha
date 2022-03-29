import { render } from '@redwoodjs/testing/web'

import TestRunWfPage from './TestRunWfPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('TestRunWfPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TestRunWfPage />)
    }).not.toThrow()
  })
})
