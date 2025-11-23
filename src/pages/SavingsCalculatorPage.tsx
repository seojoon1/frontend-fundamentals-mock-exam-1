import {
  Assets,
  Border,
  colors,
  ListHeader,
  ListRow,
  NavigationBar,
  SelectBottomSheet,
  Spacing,
  Tab,
  TextField,
} from 'tosslib';
import { getSavingProducts } from '../api.ts';
import { useEffect } from 'react';
import { useSavingsCalculatorStore } from '../store/savingsCalculatorStore';
import { filterSavingsProducts, calculateExpectedProfit, calculateDifference } from '../utils/savingsFilter';

export function SavingsCalculatorPage() {
  const {
    products,
    targetAmount,
    monthlyAmount,
    term,
    selectedProductId,
    selectedTab,
    annualRate,
    setProducts,
    setTargetAmount,
    setMonthlyAmount,
    setTerm,
    setSelectedProductId,
    setSelectedTab,
    setAnnualRate,
  } = useSavingsCalculatorStore();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSavingProducts();
        setProducts(data);
        console.log('데이터 로딩 성공:', data);
      } catch (error) {
        console.error('에러 발생:', error);
      }
    };

    fetchData();
  }, [setProducts]);

  const filteredProducts = filterSavingsProducts(products, monthlyAmount, term);
  const expectedProfit = calculateExpectedProfit(monthlyAmount, term, annualRate);
  const difference = calculateDifference(expectedProfit, targetAmount);

  const handleProductSelect = (productId: string) => {
    if (selectedProductId === productId) {
      setSelectedProductId(null);
    } else {
      const product = products.find((p: any) => p.id === productId);
      if (product) {
        setSelectedProductId(productId);
        setAnnualRate(product.annualRate);
      }
    }
  };


  return (
    <>
      <NavigationBar title="적금 계산기" />

      <Spacing size={16} />

      <TextField
        label="목표 금액"
        placeholder="목표 금액을 입력하세요"
        suffix="원"
        onChange={(e) => {
          setTargetAmount(Number(e.target.value) || null);
        }}
      />
      <Spacing size={16} />
      <TextField
        label="월 납입액"
        placeholder="희망 월 납입액을 입력하세요"
        suffix="원"
        onChange={(e) => {
          setMonthlyAmount(Number(e.target.value) || null);
        }}
      />
      <Spacing size={16} />
      <SelectBottomSheet
        label="저축 기간"
        title="저축 기간을 선택해주세요"
        value={term}
        onChange={(selectValue) => {
          setTerm(selectValue);
        }}
      >
        <SelectBottomSheet.Option value={6}>6개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={12}>12개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={24}>24개월</SelectBottomSheet.Option>
      </SelectBottomSheet>

      <Spacing size={24} />
      <Border height={16} />
      <Spacing size={8} />

      <Tab
        onChange={(a) => {
          setSelectedTab(a);
        }}
      >
        <Tab.Item value="products" selected={selectedTab === 'products'}>
          적금 상품
        </Tab.Item>
        <Tab.Item value="results" selected={selectedTab === 'results'}>
          계산 결과
        </Tab.Item>
      </Tab>
      {selectedTab === 'products' && (
        <>
          {filteredProducts.map((product) => (
            <ListRow
              key={product.id}
              contents={
                <ListRow.Texts
                  type="3RowTypeA"
                  top={product.name}
                  topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
                  middle={`연 이자율: ${product.annualRate}%`}
                  middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
                  bottom={`${product.minMonthlyAmount.toLocaleString()}원~${product.maxMonthlyAmount.toLocaleString()}원 | ${product.availableTerms}개월`}
                  bottomProps={{ fontSize: 13, color: colors.grey600 }}
                />
              }
              right={
                selectedProductId === product.id ? <Assets.Icon name="icon-check-circle-green" /> : <></>
              }
              onClick={() => {
                handleProductSelect(product.id);
              }}
            />
          ))}
        </>
      )}
      {selectedTab === 'results' && (
        <>
          {selectedProductId === null ? (
            <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 선택해주세요." />} />
          ) : (
            <>
              <Spacing size={8} />
              <ListRow
                contents={
                  <ListRow.Texts
                    type="2RowTypeA"
                    top="예상 수익 금액"
                    topProps={{ color: colors.grey600 }}
                    bottom={`${Math.floor(expectedProfit).toLocaleString()}원`}
                    bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
                  />
                }
              />
              <ListRow
                contents={
                  <ListRow.Texts
                    type="2RowTypeA"
                    top="목표 금액과의 차이"
                    topProps={{ color: colors.grey600 }}
                    bottom={`${Math.floor(difference).toLocaleString()}원`}
                    bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
                  />
                }
              />
              <ListRow
                contents={
                  <ListRow.Texts
                    type="2RowTypeA"
                    top="추천 월 납입 금액"
                    topProps={{ color: colors.grey600 }}
                    bottom={`100,000원`}
                    bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
                  />
                }
              />

              <Spacing size={8} />
            </>
          )}
          <Border height={16} />
          <Spacing size={8} />

          <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>} />
          <Spacing size={12} />

          <ListRow
            contents={
              <ListRow.Texts
                type="3RowTypeA"
                top={'기본 정기적금'}
                topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
                middle={`연 이자율: 3.2%`}
                middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
                bottom={`100,000원 ~ 500,000원 | 12개월`}
                bottomProps={{ fontSize: 13, color: colors.grey600 }}
              />
            }
            onClick={() => {}}
          />
          <ListRow
            contents={
              <ListRow.Texts
                type="3RowTypeA"
                top={'고급 정기적금'}
                topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
                middle={`연 이자율: 2.8%`}
                middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
                bottom={`50,000원 ~ 1,000,000원 | 24개월`}
                bottomProps={{ fontSize: 13, color: colors.grey600 }}
              />
            }
            onClick={() => {}}
          />

          <Spacing size={40} />
        </>
      )}
    </>
  );
}
