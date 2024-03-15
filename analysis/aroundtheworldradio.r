library(readr)
#First dataset 
K6AGA <- read_csv("C:/Users/gg311/Downloads/K6AGA.csv")
plot(x=K6AGA$direction, y=K6AGA$db, xlab="Direction (degrees)", ylab="Decibel level", main="Data for K6AGA callsign")
model.K6AGA = lm(K6AGA$db~K6AGA$direction)
abline(model.K6AGA) #First plot for K6AGA
boxplot(K6AGA$db~K6AGA$direction, xlab="Direction (degrees)", ylab="Decibel level",main="Data for K6AGA callsign") #Box plot creattion
#second dataset
updated_2_22json <- read.csv("C:/Users/gg311/Downloads/updated_2_22json.csv")
distance = updated_2_22json$eq_distance
distance_categories=findInterval(distance, c(0, 5000, 8000, 10000, 12000, 14000, 16000, 20000))
table(distance_categories) #this is to view how many signals fall into each category
data = data.frame(
      Distance=c("0-5000 mi", "5000-8000 mi", "8000-10000 mi", "10000-12000 mi", "12000-14000 mi", "14000-16000 mi", "16000+ mi"),
      Number=c(3, 165, 54, 769, 1462, 219, 44))
barplot(data$Number, names.arg = data$Distance, xlab="DIstance from UCI", ylab="Number of radios recieved", main="Count Data from Feb. 22, 2024")
