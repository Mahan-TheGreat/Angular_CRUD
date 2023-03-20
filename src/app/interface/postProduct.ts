import { ImageDTO } from "./image";

export interface postProduct{
    id: number,
    name: string,
    description: string,
    price: number,
    quantity: number,
    isDiscountApplicable?: boolean,
    percentDiscount?: number,
    imagePath: ImageDTO,
    isActive: boolean

}