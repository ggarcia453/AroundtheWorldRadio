library(readr)
K6AGA <- read_csv("C:/Users/gg311/Downloads/K6AGA.csv")
plot(x=K6AGA$direction, y=K6AGA$db, xlab="Direction (degrees)", ylab="Decibel level", main="Data for K6AGA callsign")
model.K6AGA = lm(K6AGA$db~K6AGA$direction)
abline(model.K6AGA) #First plot for K6AGA
boxplot(K6AGA$db~K6AGA$direction, xlab="Direction (degrees)", ylab="Decibel level",main="Data for K6AGA callsign") #Box plot creattion

updated_2_22json <- read_csv("C:/Users/gg311/Downloads/updated_2.22json.csv")
distance = updated_2_22json$eq_distance
distance_categories=findInterval(distance, c(0, 2000, 4000, 8000, 14000))
table(distance_categories) #this is to view how many signals fall into each category
data = data.frame(
       Distance=c("0-2000 mi", "2000-4000 mi", "4000-8000 mi", "8000+ mi"),
       Number=c(1086, 776, 483, 390))
barplot(data$Number, names.arg = data$Distance, xlab="Distance from UCI", ylab="Number of radios recieved", main="Count Data from Feb. 22, 2024")
db = updated_2_22json$db
plot(distance, db, xlab="Distance from UCI (mi)", ylab="Decibel Level", main="Distance vs Decibel ")
