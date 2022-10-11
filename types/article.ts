export interface Article {
    _id: string,
    listing_url: string,
    name: string,
    summary: string,
    property_type: string,
    bedrooms: object,
    bathrooms: object,
    amenities: string[],
    extrafield1: string,
    extrafield2: string

    // Id: string;
    // ListingUrl: string;
    // Name: string;
    // Summary: string;
}