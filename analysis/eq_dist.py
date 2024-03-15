import json
import math


file="C:/Users/gg311/Downloads/2.22json.csv"
mstb_coord_lat = -117.8461104
mstb_coord_lon = 33.6421561

def distance(point1: float, point2: float) -> float:
    '''
    Calculates the equirectangular distance between
    two points on the surface of Earth
    '''
    dlat = math.radians(abs(float(point1) - float(mstb_coord_lat)))
    dlon = math.radians(abs(float(point2) - float(mstb_coord_lon)))
    if dlon > math.pi:
        dlon = 2*math.pi - dlon 
    alat = math.radians((float(point1) + float(mstb_coord_lat))/2)
    R = 3958.8
    x = dlon * math.cos(alat)
    d = math.sqrt(x*x + dlat*dlat) * R
    return d


if __name__ == "__main__":
    #print(os.path.exists(file))
    tot = {0: 'N/A'}
    with open(file, "r") as f:
        count = 1
        print(f.readline().strip())
        for line in f.readlines():
            x = line.strip().split(",")
            #print(x)
            try:            
                y,z = float(x[-1][1:-1]), float(x[-2][1:-1])
                dis = distance(y,z)
                #print(dis)
                tot[count] = dis
            except ValueError:
                #print("No coords")
                tot[count] = "N/A"
            print(line.strip() + ", \"" + str(tot[count]) + "\"")
            count+= 1
    count = 0
    '''with open(file, "a") as p:
        for line in p:
            p.write(tot[count])
            count+=1
    '''