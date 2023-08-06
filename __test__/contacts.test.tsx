import { render, screen } from '@testing-library/react'
import Contacts from '@/pages/contacts'

describe('Describe our contacts page', () => {
    it('Should render properly', () => {
        render(<Contacts />)
        // const header = screen.getByRole('heading', {
        //     name: /Let&apos;s connect!/i,
        // })
        const header = screen.getByRole('heading')
        expect(header).toHaveTextContent('Let\'s connect!')
    })
})