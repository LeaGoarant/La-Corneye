export interface Products {
    title: string;
    description: string;
    longDescription: string;
    price: number;
    images: Images[];
}

export interface Images {
    path: string;
    isDefault: boolean;
}