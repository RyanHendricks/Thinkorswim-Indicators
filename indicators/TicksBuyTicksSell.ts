declare lower;
declare zerobase;
#plot

plot TradeCount = (((tick_count(priceType = PriceType.BID)) + (tick_count(priceType = PriceType.ASK))) / 2) / tick_count();