import { Assets, colors, ListRow } from 'tosslib';
import { SavingsProduct } from '../api.ts';

interface ProductListProps {
  items: SavingsProduct[];
  selectedId?: string | null;
  onSelect?: (product: SavingsProduct) => void;
}

export function ProductList({ items, selectedId, onSelect }: ProductListProps) {
  return (
    <>
      {items.map((product) => (
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
          // 선택된 ID와 현재 ID가 같으면 체크 아이콘 표시
          right={selectedId === product.id ? <Assets.Icon name="icon-check-circle-green" /> : <></>}
          onClick={() => {
            if (onSelect) {
              onSelect(product);
            }
          }}
        />
      ))}
    </>
  );
}