#Hint: Displays the average daily volume in the top left corner of the chart in the following format for volume: [today][1month][3months][6months][1year] with all values reported in millions
def todayvolume = (volume(period = AggregationPeriod.DAY) / 1000000);
def onemovolume = Average(volume(period = AggregationPeriod.DAY), (30)) / 1000000;
def threemovolume = Average(volume(period = AggregationPeriod.DAY), (90)) / 1000000;
def sixmonthvolume =  Average(volume(period = AggregationPeriod.DAY), (30*6)) / 1000000;
def yearvolume =  Average(volume(period = AggregationPeriod.DAY), (252)) / 1000000;



AddLabel(yes, "[Today: " + todayvolume + " mil] [1Mo: " + (onemovolume) + " mil] [3Mo: " + (threemovolume) + " mil] [6Mo: " + sixmonthvolume + " mil] [1Y: " + yearvolume + " mil]");