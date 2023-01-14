import { NextPage } from "next";
import Airtable from 'airtable'
import { Post } from "types/post";

export async function getStaticProps() {
    console.log(process.env.AIRTABLE_API_KEY)

    const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('app5UjZ5ccq0THcIi')
    const resultCat = await base('Post').select({

    }).all()
    console.log({resultCat})

    return {
        props: {
            data: resultCat.map(record => {
                return {id: record.id, ...record.fields}
            })
        }
    }
}

interface CatalogProps {
    data: Post[]
}

const Catalog: NextPage<CatalogProps> = (props) => {
    console.log(props)
    return (
        <div>
            <h1>Catalog</h1>
            {
                props.data.map(p => {
                    return <li key={p.Id}>{p.Id}: {p.Content}</li>
                })
            }
        </div>
    )
}

export default Catalog;