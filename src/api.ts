import { http, isHttpError } from 'tosslib';

export interface SavingsProduct {
    id: string;
    name:string;
    annualRate:number;
    minMonthlyAmount :number;
    maxMonthlyAmount :number;
    availableTerms : number;
}
// GET /api/savings-products
export async function getSavingProducts(){
  const response = await http.get<SavingsProduct[]>('/api/savings-products',);
  console.log(response); // [{"id": 'savings-001', "name": "기본 정기적금", ... }]
  return response;
}