import { SavingsProduct } from '../api';

/**
 * 월 납입액, 기간에 맞는 적금 상품을 필터링합니다.
 * @param products - 전체 적금 상품 목록
 * @param monthlyAmount - 월 납입액
 * @param term - 저축 기간 (개월)
 * @returns 필터링된 적금 상품 목록
 */
export function filterSavingsProducts(
  products: SavingsProduct[],
  monthlyAmount: number | null,
  term: number
): SavingsProduct[] {
  if (!monthlyAmount) {
    return [];
  }

  return products.filter(
    (product) =>
      product.minMonthlyAmount <= monthlyAmount &&
      product.maxMonthlyAmount >= monthlyAmount &&
      product.availableTerms === term
  );
}

/**
 * 예상 수익 금액을 계산합니다.
 * @param monthlyAmount - 월 납입액
 * @param term - 저축 기간 (개월)
 * @param annualRate - 연 이자율 (%)
 * @returns 예상 수익 금액
 */
export function calculateExpectedProfit(
  monthlyAmount: number | null,
  term: number,
  annualRate: number
): number {
  if (!monthlyAmount) {
    return 0;
  }

  return Number(monthlyAmount) * term * (1 + (Number(annualRate) * 0.5) / 100);
}

/**
 * 목표 금액과의 차이를 계산합니다.
 * @param expectedProfit - 예상 수익 금액
 * @param targetAmount - 목표 금액
 * @returns 목표 금액과의 차이
 */
export function calculateDifference(
  expectedProfit: number,
  targetAmount: number | null
): number {
  if (!targetAmount) {
    return 0;
  }

  return expectedProfit - targetAmount;
}
