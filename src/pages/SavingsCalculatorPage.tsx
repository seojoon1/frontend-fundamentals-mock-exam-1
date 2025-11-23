import {
  // Assets,
  Border,
  // colors,
  ListHeader,
  ListRow,
  NavigationBar,
  SelectBottomSheet,
  Spacing,
  Tab,
  TextField,
} from 'tosslib';
import { getSavingProducts, SavingsProduct } from '../api.ts';
import { useEffect, useState, useMemo } from 'react';
import { ProductList } from '../components/ProductList.tsx';
import {
  calculateExpectedReturn,
  calculateDifference,
  calculateRecommendedMonthly,
  getTopProducts,
} from '../utils/savingUtils.ts';
import { ResultList } from '../components/ResultList.tsx';
export function SavingsCalculatorPage() {
  const [products, setProducts] = useState<SavingsProduct[]>([]);
  const [targetAmount, setTargetAmount] = useState<number | null>(null);
  const [monthlyAmount, setMonthlyAmount] = useState<number | null>(null);
  const [term, setTerm] = useState<number>(12)
  const [select, setSelect] = useState<string | null>("")
  const [selectedTab, setSelectedTab] = useState<string>('products');
  const [annualRate, setAnnualRate] = useState<number>(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSavingProducts();
        setProducts(data);
        console.log('데이터 로딩 성공:', data);
        console.log(products);
      } catch (error) {
        console.error('에러 발생:', error);
      }
    };

    fetchData();
  }, []);

  const expectedReturn = useMemo(() => {
  return calculateExpectedReturn(monthlyAmount, term, annualRate);
}, [monthlyAmount, term, annualRate]);

const difference = useMemo(() => {
  return calculateDifference(targetAmount, expectedReturn);
}, [targetAmount, expectedReturn]);

const recommendedMonthlyAmount = useMemo(() => {
  return calculateRecommendedMonthly(targetAmount, term, annualRate);
},[term, annualRate])

const top2Products = useMemo(() => {
  return getTopProducts(products, 2);
}, [products]);
const filteredProducts = products.filter(
    (product) =>
      product.minMonthlyAmount <= (monthlyAmount ?? 0) &&
      product.maxMonthlyAmount >= (monthlyAmount ?? 0) &&
      product.availableTerms === term
  );

const handleProductSelect = (product: SavingsProduct) => {
    if (select === product.id) {
      setSelect('');
      setAnnualRate(0);
    } else {
      setSelect(product.id);
      setAnnualRate(product.annualRate);
    }
  };

  return (
    <>
      <NavigationBar title="적금 계산기" />

      <Spacing size={16} />

      <TextField label="목표 금액" placeholder="목표 금액을 입력하세요" suffix="원" onChange={(e)=>{
        setTargetAmount(Number(e.target.value));
        console.log(targetAmount);
      }}/>
      <Spacing size={16} />
      <TextField label="월 납입액" placeholder="희망 월 납입액을 입력하세요" suffix="원" onChange={(e)=>{
        setMonthlyAmount(Number(e.target.value));
        console.log(monthlyAmount);
      }}/>
      <Spacing size={16} />
      <SelectBottomSheet label="저축 기간" title="저축 기간을 선택해주세요" value={term} onChange={(SelectValue) => { 
        setTerm(SelectValue);
      }}>
        <SelectBottomSheet.Option value={6}>6개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={12}>12개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={24}>24개월</SelectBottomSheet.Option>
      </SelectBottomSheet>

      <Spacing size={24} />
      <Border height={16} />
      <Spacing size={8} />

      <Tab onChange={(a) => {
        setSelectedTab(a);
        console.log(selectedTab);
      }}>
        <Tab.Item value="products" selected={selectedTab === 'products'}>
          적금 상품
        </Tab.Item>
        <Tab.Item value="results" selected={selectedTab === 'results'}>
          계산 결과
        </Tab.Item>
      </Tab>
      {selectedTab === 'products' && 
      <ProductList 
          items={filteredProducts} 
          selectedId={select}
          onSelect={handleProductSelect} 
        />}
      {/* 아래는 계산 결과 탭 내용이에요. 계산 결과 탭을 구현할 때 주석을 해제해주세요. */}
      {selectedTab === 'results' &&<>
        {
          select === "" ? <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 선택해주세요." />} /> :<>
          <Spacing size={8} />
        <ResultList 
          expectedReturn={expectedReturn} 
          difference={difference} 
          recommendedMonthlyAmount={recommendedMonthlyAmount} 
        />
          <Spacing size={8} />
          </>
        }
        <Border height={16} />
        <Spacing size={8} />

        <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>} />
        <Spacing size={12} />
        <ProductList 
          items={top2Products} 
          selectedId={select}
          onSelect={handleProductSelect} 
        />
        <Spacing size={40} />
      </>}
      {/* 아래는 사용자가 적금 상품을 선택하지 않고 계산 결과 탭을 선택했을 때 출력해주세요. */}
    </>
  );
}
