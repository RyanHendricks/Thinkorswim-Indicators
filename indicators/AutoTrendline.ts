def isLastBar = !IsNaN(close) and IsNaN(close[-1]);
def isNewDate = GetYYYYMMDD() != GetYYYYMMDD()[1];
def barCounter = if isNewDate then 1 else barCounter[1] + 1;

def minOffset;
if isLastBar {
    minOffset = fold i = 0 to barCounter with offset1 do if GetValue(low, i) <= GetValue(low, offset1) then i else offset1;
} else {
    minOffset = Double.NaN;
}

def lookForward = AggregationPeriod.DAY / GetAggregationPeriod();
def lastBarOffset = fold j = 0 to lookForward with offset2 while !(GetValue(isNewDate, -j) and offset2 != 0) and !IsNaN(GetValue(close, -j)) and !GetValue(isLastBar, -j) do offset2 + 1;
def isMinBar = GetValue(minOffset, -lastBarOffset) == lastBarOffset;

plot Trendline = if isMinBar then low else if isLastBar then close else Double.NaN;
Trendline.EnableApproximation();

def height = GetValue(close, -lastBarOffset) - low;
def dangle = ATan(height / (lastBarOffset + 1)) * 180 / Double.Pi;
AddLabel(yes, dangle, if dangle < -45 then Color.DARK_RED else if dangle < 0 then Color.RED else if dangle > 45 then Color.GREEN else Color.GREEN);