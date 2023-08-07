import Contacts from '@/pages/contacts'
import { render, screen } from '@testing-library/react'

describe('Describe our contacts page', () => {
    it('Should render properly', () => {
        render(<Contacts />)
        const header = screen.getByRole('heading')
        expect(header).toHaveTextContent('Let\'s connect!')
    })
})