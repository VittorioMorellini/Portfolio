import Contacts from '@/pages/contacts'
import { render, screen } from '@testing-library/react'

type IndexPageRef = React.ForwardedRef<HTMLDivElement>

describe('Describe our contacts page', () => {

    beforeEach(() => {
        render(<Contacts ref={null}/>)
    })

    it('Should render properly', () => {
        const header = screen.getByRole('heading')
        expect(header).toHaveTextContent(/let\'s connect!/i)
    })

    it.todo('Should the link to social be available')
})