// utils.ts
import { SavingsProduct } from '../api'; // 타입 정의 경로에 맞게 수정

/**
 * 예상 수익 금액 계산
 */
export const calculateExpectedReturn = (
  monthlyAmount: number | null, 
  term: number, 
  annualRate: number
): number => {
  if (!monthlyAmount || !term) return 0;
  
  const monthly = Number(monthlyAmount);
  const rate = Number(annualRate);
  
  return Math.floor(monthly * term * (1 + rate * 0.5));
};

/**
 * 목표 금액과의 차이 계산
 */
export const calculateDifference = (
  targetAmount: number | null, 
  expectedReturn: number
): number => {
  if (!targetAmount) return 0;
  return targetAmount - expectedReturn;
};

/**
 * 추천 월 납입 금액 계산
 */
export const calculateRecommendedMonthly = (
  targetAmount: number | null,
  term: number,
  annualRate: number
): number => {
  if (!targetAmount || !term) return 0;
  
  const rate = Number(annualRate);
  
  const divider = term * (1 + rate * 0.5);
  if (divider === 0) return 0;

  return Math.floor(targetAmount / divider);
};

/**
 * 이자율 높은 순 상위 N개 상품 추출
 */
export const getTopProducts = (
  products: SavingsProduct[], 
  limit: number = 2
): SavingsProduct[] => {
  return [...products]
    .sort((a, b) => b.annualRate - a.annualRate)
    .slice(0, limit);
};
