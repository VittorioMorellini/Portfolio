import { DefaultSeo } from 'next-seo'

function SEO() {

    return (
        <DefaultSeo
            title='Vittorio Morellini'
            description='Software engineer'
            openGraph={{
                type: "website",
                locale: "it_IT",
                url: "https://portfolio-vittoriomorellini.vercel.app",
                site_name: "Personal site",
                images: [
                    {
                        url: "",
                        alt: "",
                        height: 1920,
                        width: 1080,
                        type: "image/png",
                    },
                ],
            }}
            twitter={{
                handle: "",
                site: "",
                cardType: "",
            }}        
        />
    )
}

export default SEO;