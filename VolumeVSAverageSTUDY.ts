#Hint: Displays the average daily volume in the top left corner of the chart in the following format for volume: [today][3months][1year][5years]
def todayvolume = (volume(period = AggregationPeriod.DAY) / 1000000);
def threemovolume = Average(volume(period = AggregationPeriod.DAY), (90)) / 1000000;
def yearvolume =  Average(volume(period = AggregationPeriod.DAY), (252)) / 1000000;
def fiveyearvolume =  Average(volume(period = AggregationPeriod.DAY), (365 * 5)) / 1000000;


AddLabel(yes, "[" + todayvolume + " mil] [" + (threemovolume) + " mil] [" + yearvolume + " mil] [" + fiveyearvolume + " mil]");