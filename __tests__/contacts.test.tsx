import Contacts from '@/pages/contacts'
import { render, screen } from '@testing-library/react'

describe('Describe our contacts page', () => {

    beforeEach(() => {
        render(<Contacts />)
    })

    it('Should render properly', () => {
        const header = screen.getByRole('heading')
        expect(header).toHaveTextContent(/let\'s connect!/i)
    })

    it.todo('Should the link to social be available')
})