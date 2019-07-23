# https://codeforces.com/problemset/problem/1012/F

#from Tkinter import *
from matplotlib import pyplot as plt
from matplotlib.patches import Rectangle, Ellipse
import algo
fig,ax = plt.subplots()
currentAxis = plt.gca()
colors = ["red", "blue", "green", "yellow", "grey", "magenta", "cyan"]
base_line = 1
def draw_days(base_line, number):
    rect_w = 0.1
    rect_h = 0.08
    for day in range(0, number):
        x = day * 0.1
        y = base_line
        rect = Rectangle((x, y), rect_w, rect_h, alpha = 1, fill=None)
        rx, ry = rect.get_xy()
        cx = rx + rect.get_width()/2.0
        cy = ry + rect.get_height()/2.0
        currentAxis.annotate(day, (cx, cy), color='b', weight='bold', 
                fontsize=6, ha='center', va='center')
        currentAxis.add_patch(rect)
        
def draw_trip(base_line, start, duration, color, text):
    rect_w = duration * 0.1
    rect_h = 0.08
    x = start * 0.1
    y = base_line + 0.1
    rect = Rectangle((x, y), rect_w, rect_h, alpha = 1, facecolor = color)
    rx, ry = rect.get_xy()
    cx = rx + rect.get_width()/2.0
    cy = ry + rect.get_height()/2.0
    currentAxis.annotate(str(start), (cx, cy), color='w', weight='bold', fontsize=6, ha='center', va='center')
    currentAxis.add_patch(rect)

def draw_visa(base_line, up_base_line, start, duration, color, text):
    rect_w = duration * 0.1
    rect_h = 0.08
    x = start * 0.1 + rect_w / 2
    if up_base_line:
        y = base_line - 0.1
    else:
         y = base_line - 0.15
    rect = Ellipse((x, y), rect_w, rect_h, alpha = 1, facecolor = color)
    cx, cy = rect.get_center()
    currentAxis.annotate(str(start), (cx, cy), color='w', weight='bold', fontsize=6, ha='center', va='center')
    currentAxis.add_patch(rect)

def visualize_solution(base_line, test_case):
    sol = algo.read_input(test_case)
    sol.solve()
    draw_days(base_line, sol.get_last_day())
    for trip in sol.trips:
        draw_trip(base_line, trip.start, trip.duration, colors[trip.to_country], trip.to_country + 1)
    for passport in sol.passports:
        for visa in passport.visas:
            if(passport.id == 0):
                draw_visa(base_line, True, visa.issued_on, visa.required_duration, colors[visa.for_country], visa.for_country + 1)
            else:
                draw_visa(base_line, False, visa.issued_on, visa.required_duration, colors[visa.for_country], visa.for_country + 1)  


visualize_solution(0.0, "./test-data/testCase1.txt")
visualize_solution(0.4, "./test-data/testCase2.txt")
visualize_solution(0.8, "./test-data/testCase3.txt")
plt.show()