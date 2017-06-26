#Hint: Average Daily Range

def len = 2;

def dayHigh = DailyHighLow(AggregationPeriod.DAY, len, 0, no).dailyhigh;
def dayLow = DailyHighLow(AggregationPeriod.DAY, len, 0, no).DailyLow;

def ADR_high = (dayHigh + dayHigh[1] + dayHigh[2] + dayHigh[3] + dayHigh[4]) / 5;
def ADR_low = (dayLow + dayLow[1] + dayLow[2] + dayLow[3] + dayLow[4]) / 5;

plot ADR_H = ADR_high;
plot ADR_L = ADR_low;