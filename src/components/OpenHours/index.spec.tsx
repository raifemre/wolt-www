// #region Global Imports
import * as React from 'react'
// #endregion Global Imports

// #region Local Imports
import { render } from '../../../test/utils'
import { OpenHours } from '@Components'
// #endregion Local Imports

describe('Components', () => {
  describe('OpenHours', () => {
    it('should render contact message due to not having opening hours', () => {
      const { getAllByText } = render(<OpenHours openHours={{}} />)

      expect(getAllByText('Please contact with the restaurant').length).toEqual(
        1
      )
    })

    it('should match snapshot', () => {
      const { container } = render(<OpenHours openHours={{}} />)

      expect(container).toMatchSnapshot()
    })
  })
})
