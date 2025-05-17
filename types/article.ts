export interface Article {
    _id: string,
    listing_url: string,
    name: string,
    summary: string,
    property_type: string,
    bedrooms: object,
    bathrooms: object,
    amenities: string[],
    description: string,
    creationDate: string,
}