import sys
import requests
import re
from bs4 import BeautifulSoup
import time
import json


call_dict = {'W1FC': [-70.5337, 41.5714], 'WM3PEN': [-75.0355, 40.0426], 'A92EE': [50.5876, 26.2235], 'K1JT': [-74.633, 40.3473], 'N1JFU': [-71.0631, 42.0395], 'XE2X': [-98.2594, 26.1072], 'W0RSJ': [-75.2182, 40.7057], 'E74C': [18.3813, 43.8501], 'WY0V': [-96.4239, 42.5148], 'S56GD': [13.8344, 45.7829], 'RN2F': [20.4879, 54.7672], 'W9SV': [-88.3371, 42.5391], 'N3AZ': [-98.0809, 29.5618], 'NZ0T': [-93.6005, 36.5975], 'K9ARZ': [-88.278, 41.8996], 'ZD7CTO': [-5.71517, -15.9286], 'JA7OWB': [140.884, 38.2555], 'KM6BNU': [-120.351, 38.2555], 'AI7OK': [-115.15, 36.0562], 'KY4ZY': [-83.8845, 36.0515], 'A25R': [26.502, -23.0356], 'KC8RFE': [-88.3033, 40.1236]}


def json_parse(file:str):
    g = []
    with open(file) as f:
        lines = f.readlines()
        for line in lines:
            if line != "\n":
                arr = line.split()
                j_dict = {'date': int(arr[0]), 'frequency': float(arr[1]), 'rx_tx': arr[2], 'mode': arr[3],
                          'db': int(arr[4]), 'dt': float(arr[5]), 'audio_freq': int(arr[6]), 'callsign': arr[7],
                          "locator": arr[8], "message": arr[9]}
                js = {
                    "type": "Feature",
                    "properties": j_dict,
                    "geometry": {
                        "type": "Point",
                        "coordinates": [-74.633, 40.3473]
                    }
                }
                g.append(js)
    # final = json.dumps(g, indent=1)

    # display
    return(g)
    # r = requests.post("http://localhost:5000/api/v1/radios/add", json=g)
    # print(f"Status Code: {r.status_code}, Response: {r.json()}")
    
    
def find_call(callsign:str):
    website = f"http://localhost:5000/api/v1/callsigns?callsign={callsign}"
    result = requests.get(website)
    di = json.loads(result.content.decode())
    if di["total_results"] == 0:
        return []
    else:
        return di["callsigns"][0]['coordinates']


def geo_fix(js:dict):
    global call_dict
    callsign = js['properties']['callsign']
    p = find_call(callsign=callsign)
    if p != []:
        js['geometry']['coordinates'] = p
    else:
        website = f"https://www.levinecentral.com/ham/grid_square.php?Call={callsign}"
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'}
        time.sleep(30)
        result = requests.get(website, headers=headers)
        # print(result.content.decode())
        soup = BeautifulSoup(result.content, 'html.parser')
        data = soup.getText()
        # print(data)
        coord = re.search(r"Latitude: (-?\d+.\d+) [\s|\S]+ Longitude: (-?\d+.\d+)", data)
        print(coord)
        if coord is None:
            pass
        else:
            x = [float(coord[2]), float(coord[1])]
            js['geometry']['coordinates'] = x
            call_dict[callsign] = x
            addSite = r"http://localhost:5000/api/v1/callsigns/update"
            result = requests.post(addSite, json=[{"callsign":callsign, "coordinates": x}])
    return js


def send_radios(js:list):
    #FIXME: Fix api link based on new databse configuration
    r = requests.post("http://localhost:5000/api/v1/radios/add", json=js)
    print(f"Status Code: {r.status_code}, Response: {r.json()}")
    
def send_callsigns(js:list):
    r = requests.post("http://localhost:5000/api/v1/callsigns/update", json=js)
    print(f"Status Code: {r.status_code}, Response: {r.json()}")


if __name__ == "__main__":
    file = sys.argv[1]
    l = json_parse(file)
    #example = {'type': 'Feature', 'properties': {'date': 231108014445, 'frequency': 14.074, 'rx_tx': 'Rx', 'mode': 'FT8', 'db': -15, 'dt': 1.4, 'audio_freq': 2853, 'callsign': 'XE2X', 'locator': 'HA2NP', 'message': 'RR73'}, 'geometry': {'type': 'Point', 'coordinates': [-74.633, 40.3473]}}
    #print((geo_fix(example)))
    g = []
    for example in l:
        if example["properties"]["callsign"] != "CQ":
            g.append(geo_fix(example))
    print(g)
    #send_radios(g)
    #print(call_dict)
