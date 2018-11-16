#hint: <b>Fibonacci Retracements</b>\nFibonacci retracements use horizontal lines to indicate areas of support or resistance at the key Fibonacci levels before it continues in the original direction. These levels are created by drawing a trendline between two extreme points and then dividing the vertical distance by the key Fibonacci ratios of: 23.6%, 38.2%, 50%, 61.8%, 78.6%, and 100%.


#hint Price: Price used in the alerts on crossing retracement lines. <b>(Default is Close)</b>
#hint onExpansion: Determines if the retracement lines are projected past the current bar into the right side expansion <b>(Default is Yes)</b>
#hint Extend_to_left: Determines if the retracement lines are extended to the left side of the chart. <b>(Default is No)</b>

#hint Coefficient0: Retracement Line 0: Retracement from the highest high to the lowest low.\n <b>(Default is 0%)</b>
#hint Coefficient_1: Retracement Line 1: Retracement from the highest high to the lowest low.\n <b>(Default is 23.6%)</b> 
#hint Coefficient_2: Retracement Line 2: Retracement from the highest high to the lowest low.\n <b>(Default is 38.2%)</b>
#hint Coefficient_3: Retracement Line 3: Retracement from the highest high to the lowest low.\n <b>(Default is 50%)</b>
#hint Coefficient_4: Retracement Line 4: Retracement from the highest high to the lowest low.\n <b>(Default is 61.8%)</b>
#hint Coefficient_5: Retracement Line 5: Retracement from the highest high to the lowest low.\n <b>(Default is 78.6%)</b>
#hint Coefficient_6: Retracement Line 6: Retracement from the highest high to the lowest low.\n <b>(Default is 100%)</b>

#wizard input: Price
#wizard text: Inputs: Price:
#wizard input: onExpansion
#wizard text: onExpansion:
#wizard input: Extend_to_left
#wizard text: Extend_to_left:
#wizard input: Coefficient0 
#wizard text: Coefficient0:
#wizard input: Coefficient_1 
#wizard text: Coefficient_1:
#wizard input: Coefficient_2 
#wizard text: Coefficient_2:
#wizard input: Coefficient_3 
#wizard text: Coefficient_3:
#wizard input: Coefficient_4
#wizard text: Coefficient_4:
#wizard input: Coefficient_5
#wizard text: Coefficient_5:
#wizard input: Coefficient_6 
#wizard text: Coefficient_6:

input price = close;
input high = high;
input low = low;
input onExpansion = Yes;
input Extend_to_left = no;
input Coefficient0 = 0.000;
input coefficient_1 = .236;
input Coefficient_2 = .382;
input Coefficient_3 = .500;
input Coefficient_4 = .618;
Input Coefficient_5 = .786;
input Coefficient_6 = 1.000;

def a = HighestAll(high);
def b = LowestAll(low);
def barnumber = barNumber();
def c = if high == a then barnumber else double.nan;
def d = if low == b then barnumber else double.nan;
rec highnumber = compoundValue(1, if IsNaN(c) then highnumber[1] else c, c);
def highnumberall = HighestAll(highnumber);
rec lownumber = compoundValue(1, if IsNaN(d) then lownumber[1] else d, d);
def lownumberall = LowestAll(lownumber);

def upward = highnumberall > lownumberall;
def downward = highnumberall < lownumberall;

def x = AbsValue(lownumberall - highnumberall );

def slope = (a - b) / x;
def slopelow = (b - a) / x;

def day = getDay();
def month = getMonth();
def year = getYear();
def lastDay = getLastDay();
def lastmonth = getLastMonth();
def lastyear = getLastYear();
def isToday = if(day == lastDay and month == lastmonth and year == lastyear, 1, 0);
def istodaybarnumber = HighestAll(if isToday then barnumber else double.nan);

def line = b + (slope * (barnumber - lownumber));
def linelow = a + (slopelow * (barnumber - highnumber));

def currentlinelow = if barnumber <= lownumberall then linelow else double.nan;
def currentline = if barnumber <= highnumberall then line else double.nan;

Plot FibFan =  if  downward then currentlinelow else if upward then currentline else double.nan;
FibFan.SetStyle(Curve.SHORT_DASH);
FibFan.AssignValueColor(color.red);
fibfan.hidebubble();

def range =  a - b;

Plot Retracement0 = if downward and !onexpansion and !extend_to_left and barnumber >= highnumberall and barnumber <= istodaybarnumber then highestall((b + (range *  coefficient0))) else if upward and !extend_to_left and !onexpansion and barnumber >= lownumberall and barnumber <= istodaybarnumber then highestall(a - (range * coefficient0)) else if downward and onexpansion and !extend_to_left and barnumber >= highnumberall then highestall((b + (range *  coefficient0))) else if upward and onexpansion and barnumber >= lownumberall and !extend_to_left then highestall(a - (range * coefficient0)) else if downward and !onexpansion and extend_to_left and barnumber <= istodaybarnumber then highestall((b + (range *  coefficient0))) else if upward and extend_to_left and !onexpansion and barnumber <= istodaybarnumber then highestall(a - (range * coefficient0)) else if downward and onexpansion and extend_to_left then highestall((b + (range *  coefficient0))) else if upward and onexpansion and extend_to_left then highestall(a - (range * coefficient0)) else double.nan;
Retracement0.assignvaluecolor(color.red);
retracement0.hidebubble();
#AddChartBubble((barnumber == istodaybarnumber +10), retracement0, concat( "$", round(retracement0, 2)), color.red, yes);
AddChartBubble((downward and barnumber == highnumberall), retracement0, concat( (coefficient0 * 100), "%"), color.red, yes);
AddChartBubble((upward and barnumber == lownumberall), retracement0, concat( (coefficient0 * 100), "%"), color.red, yes);


Plot Retracement1 =  if downward and !onexpansion and !extend_to_left and barnumber >= highnumberall and barnumber <= istodaybarnumber then highestall((b + (range *  coefficient_1))) else if upward and !extend_to_left and !onexpansion and barnumber >= lownumberall and barnumber <= istodaybarnumber then highestall(a - (range * coefficient_1)) else if downward and onexpansion and !extend_to_left and barnumber >= highnumberall then highestall((b + (range *  coefficient_1))) else if upward and onexpansion and barnumber >= lownumberall and !extend_to_left then highestall(a - (range * coefficient_1)) else if downward and !onexpansion and extend_to_left and barnumber <= istodaybarnumber then highestall((b + (range *  coefficient_1))) else if upward and extend_to_left and !onexpansion and barnumber <= istodaybarnumber then highestall(a - (range * coefficient_1)) else if downward and onexpansion and extend_to_left then highestall((b + (range *  coefficient_1))) else if upward and onexpansion and extend_to_left then highestall(a - (range * coefficient_1)) else double.nan;
Retracement1.assignvaluecolor(color.red);
retracement1.hidebubble();
#AddChartBubble((barnumber == istodaybarnumber+10), retracement1, concat( "$", round(retracement1, 2)), color.red, yes);
AddChartBubble((downward and barnumber == highnumberall), retracement1, concat( (coefficient_1 * 100), "%"), color.red, yes);
AddChartBubble((upward and barnumber == lownumberall), retracement1, concat( (coefficient_1 * 100), "%"), color.red, yes);

Plot Retracement2 =if downward and !onexpansion and !extend_to_left and barnumber >= highnumberall and barnumber <= istodaybarnumber then highestall((b + (range *  coefficient_2))) else if upward and !extend_to_left and !onexpansion and barnumber >= lownumberall and barnumber <= istodaybarnumber then highestall(a - (range * coefficient_2)) else if downward and onexpansion and !extend_to_left and barnumber >= highnumberall then highestall((b + (range *  coefficient_2))) else if upward and onexpansion and barnumber >= lownumberall and !extend_to_left then highestall(a - (range * coefficient_2)) else if downward and !onexpansion and extend_to_left and barnumber <= istodaybarnumber then highestall((b + (range *  coefficient_2))) else if upward and extend_to_left and !onexpansion and barnumber <= istodaybarnumber then highestall(a - (range * coefficient_2)) else if downward and onexpansion and extend_to_left then highestall((b + (range *  coefficient_2))) else if upward and onexpansion and extend_to_left then highestall(a - (range * coefficient_2)) else double.nan;
Retracement2.assignvaluecolor(color.red);
retracement2.hidebubble();
#AddChartBubble((barnumber == istodaybarnumber+10), retracement2, concat( "$", round(retracement2, 2)), color.red, yes);
AddChartBubble((downward and barnumber == highnumberall), retracement2, concat( (coefficient_2 * 100), "%"), color.red, yes);
AddChartBubble((upward and barnumber == lownumberall), retracement2, concat( (coefficient_2 * 100), "%"), color.red, yes);


Plot Retracement3 = if downward and !onexpansion and !extend_to_left and barnumber >= highnumberall and barnumber <= istodaybarnumber then highestall((b + (range *  coefficient_3))) else if upward and !extend_to_left and !onexpansion and barnumber >= lownumberall and barnumber <= istodaybarnumber then highestall(a - (range * coefficient_3)) else if downward and onexpansion and !extend_to_left and barnumber >= highnumberall then highestall((b + (range *  coefficient_3))) else if upward and onexpansion and barnumber >= lownumberall and !extend_to_left then highestall(a - (range * coefficient_3)) else if downward and !onexpansion and extend_to_left and barnumber <= istodaybarnumber then highestall((b + (range *  coefficient_3))) else if upward and extend_to_left and !onexpansion and barnumber <= istodaybarnumber then highestall(a - (range * coefficient_3)) else if downward and onexpansion and extend_to_left then highestall((b + (range *  coefficient_3))) else if upward and onexpansion and extend_to_left then highestall(a - (range * coefficient_3)) else double.nan;
Retracement3.assignvaluecolor(color.red);
retracement3.hidebubble();
#AddChartBubble((barnumber == istodaybarnumber+10), retracement3, concat( "$", round(retracement3, 2)), color.red, yes);
AddChartBubble((upward and barnumber == lownumberall), retracement3, concat( (coefficient_3 * 100), "%"), color.red, yes);
AddChartBubble((downward and barnumber == highnumberall), retracement3, concat( (coefficient_3 * 100), "%"), color.red, yes);
AddChartBubble((upward and barnumber == lownumberall), retracement3, concat( (coefficient_3 * 100), "%"), color.red, yes);


Plot Retracement4 = if downward and !onexpansion and !extend_to_left and barnumber >= highnumberall and barnumber <= istodaybarnumber then highestall((b + (range *  coefficient_4))) else if upward and !extend_to_left and !onexpansion and barnumber >= lownumberall and barnumber <= istodaybarnumber then highestall(a - (range * coefficient_4)) else if downward and onexpansion and !extend_to_left and barnumber >= highnumberall then highestall((b + (range *  coefficient_4))) else if upward and onexpansion and barnumber >= lownumberall and !extend_to_left then highestall(a - (range * coefficient_4)) else if downward and !onexpansion and extend_to_left and barnumber <= istodaybarnumber then highestall((b + (range *  coefficient_4))) else if upward and extend_to_left and !onexpansion and barnumber <= istodaybarnumber then highestall(a - (range * coefficient_4)) else if downward and onexpansion and extend_to_left then highestall((b + (range *  coefficient_4))) else if upward and onexpansion and extend_to_left then highestall(a - (range * coefficient_4)) else double.nan;
Retracement4.assignvaluecolor(color.red);
retracement4.hidebubble();
#AddChartBubble((barnumber == istodaybarnumber+10), retracement4, concat( "$", round(retracement4, 2)), color.red, yes);
AddChartBubble((downward and barnumber == highnumberall), retracement4, concat( (coefficient_4 * 100), "%"), color.red, yes);
AddChartBubble((upward and barnumber == lownumberall), retracement4, concat( (coefficient_4 * 100), "%"), color.red, yes);

Plot Retracement5 = if downward and !onexpansion and !extend_to_left and barnumber >= highnumberall and barnumber <= istodaybarnumber then highestall((b + (range *  coefficient_5))) else if upward and !extend_to_left and !onexpansion and barnumber >= lownumberall and barnumber <= istodaybarnumber then highestall(a - (range * coefficient_5)) else if downward and onexpansion and !extend_to_left and barnumber >= highnumberall then highestall((b + (range *  coefficient_5))) else if upward and onexpansion and barnumber >= lownumberall and !extend_to_left then highestall(a - (range * coefficient_5)) else if downward and !onexpansion and extend_to_left and barnumber <= istodaybarnumber then highestall((b + (range *  coefficient_5))) else if upward and extend_to_left and !onexpansion and barnumber <= istodaybarnumber then highestall(a - (range * coefficient_5)) else if downward and onexpansion and extend_to_left then highestall((b + (range *  coefficient_5))) else if upward and onexpansion and extend_to_left then highestall(a - (range * coefficient_5)) else double.nan;
Retracement5.assignvaluecolor(color.red);
retracement5.hidebubble();
#AddChartBubble((barnumber == istodaybarnumber+10), retracement5, concat( "$", round(retracement5, 2)), color.red, yes);
AddChartBubble((downward and barnumber == highnumberall), retracement5, concat( (coefficient_5 * 100), "%"), color.red, yes);
AddChartBubble((upward and barnumber == lownumberall), retracement5, concat( (coefficient_5 * 100), "%"), color.red, yes);


Plot Retracement6 = if downward and !onexpansion and !extend_to_left and barnumber >= highnumberall and barnumber <= istodaybarnumber then highestall((b + (range *  coefficient_6))) else if upward and !extend_to_left and !onexpansion and barnumber >= lownumberall and barnumber <= istodaybarnumber then highestall(a - (range * coefficient_6)) else if downward and onexpansion and !extend_to_left and barnumber >= highnumberall then highestall((b + (range *  coefficient_6))) else if upward and onexpansion and barnumber >= lownumberall and !extend_to_left then highestall(a - (range * coefficient_6)) else if downward and !onexpansion and extend_to_left and barnumber <= istodaybarnumber then highestall((b + (range *  coefficient_6))) else if upward and extend_to_left and !onexpansion and barnumber <= istodaybarnumber then highestall(a - (range * coefficient_6)) else if downward and onexpansion and extend_to_left then highestall((b + (range *  coefficient_6))) else if upward and onexpansion and extend_to_left then highestall(a - (range * coefficient_6)) else double.nan;
Retracement6.assignvaluecolor(color.red);
retracement6.hidebubble();
#AddChartBubble((barnumber == istodaybarnumber+10), retracement6, concat( "$", round(retracement6, 2)), color.red, yes);

AddChartBubble((downward and barnumber == highnumberall), retracement6, concat( (coefficient_6 * 100), "%"), color.red, yes);
AddChartBubble((upward and barnumber == lownumberall), retracement6, concat( (coefficient_6 * 100), "%"), color.red, yes);


alert((price crosses below Retracement0) , "Price crosses below Retracement Line 0");
alert((price crosses above Retracement0) , "Price crosses above Retracement Line 0");
alert((price crosses below Retracement1) , "Price crosses below Retracement Line 1");
alert((price crosses above Retracement1) , "Price crosses above Retracement Line 1");
alert((price crosses below Retracement2) , "Price crosses below Retracement Line 2");
alert((price crosses above Retracement2) , "Price crosses above Retracement Line 2");
alert((price crosses below Retracement3) , "Price crosses below Retracement Line 3");
alert((price crosses above Retracement3) , "Price crosses above Retracement Line 3");
alert((price crosses below Retracement4) , "Price crosses below Retracement Line 4");
alert((price crosses above Retracement4) , "Price crosses above Retracement Line 4");
alert((price crosses below Retracement5) , "Price crosses below Retracement Line 5");
alert((price crosses above Retracement5) , "Price crosses above Retracement Line 5");
alert((price crosses below Retracement6) , "Price crosses below Retracement Line 6");
alert((price crosses above Retracement6) , "Price crosses above Retracement Line 6");