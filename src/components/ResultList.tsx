import { colors, ListRow } from 'tosslib';
interface ResultListProps {
  expectedReturn: number;
  difference: number;
  recommendedMonthlyAmount: number;
}

export function ResultList({ expectedReturn, difference, recommendedMonthlyAmount}: ResultListProps) {
  return (
    <>
      <ListRow
            contents={
              <ListRow.Texts
                type="2RowTypeA"
                top="예상 수익 금액"
                topProps={{ color: colors.grey600 }}
                bottom={`${expectedReturn.toLocaleString()}원`}
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
                bottom={`${difference.toLocaleString()}원`}
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
                bottom={`${recommendedMonthlyAmount.toLocaleString()}원`}
                bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
              />
            }
          />
          </>
  );
}