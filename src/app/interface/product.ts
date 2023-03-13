
export interface product{
   id: number,
   name: string,
   description: string,
   price: number,
    quantity: number,
    isDiscountApplicable?: boolean,
    percentDiscount?: number,
    isActive: boolean

}