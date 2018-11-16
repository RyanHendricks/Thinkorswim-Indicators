declare lower;
declare zerobase;

def TradeCount = tick_count;
def MoneyCount = volume;

plot avgTradeCount = ((MoneyCount[1] + MoneyCount) / 2) / ((TradeCount + TradeCount[1]) / 2);

AvgTradeCount.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
AvgTradeCount.AssignValueColor(if TradeCount >= AvgTradeCount then Color.UPTICK else Color.DOWNTICK);
