export interface Products {
    id: number;
    title: string;
    description: string;
    price: number;
    images: Images[];
}

export interface Images {
    path: string;
    isDefault: boolean;
}