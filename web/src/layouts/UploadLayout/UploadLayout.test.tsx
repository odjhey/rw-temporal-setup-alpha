import { render } from '@redwoodjs/testing/web'

import UploadLayout from './UploadLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('UploadLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UploadLayout />)
    }).not.toThrow()
  })
})
