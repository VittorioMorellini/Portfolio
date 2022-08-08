import { DefaultSeo } from 'next-seo'

function SEO() {

    return (
        <DefaultSeo
            title='Sixtema business consulting'
            description='Consulenza aziendale eseguita dai consukenti di Sixtema'
            openGraph={{
                type: "website",
                locale: "it_IT",
                url: "https://businessconsulting.it",
                site_name: "Business consulting",
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