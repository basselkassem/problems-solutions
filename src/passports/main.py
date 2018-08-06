# https://codeforces.com/problemset/problem/1012/F

from Tkinter import *
import algo
dim = 50
max_square_num = 30
canvas_width = dim * max_square_num + dim
canvas_height = dim * 15
base_line = canvas_height / 2 - 4 *dim
base_line2 = base_line + 4 * dim
base_line3 = base_line2 + 4 * dim
master = Tk()
main_canvas = Canvas(master, width=canvas_width, height=canvas_height)

colors = ["red", "blue", "green", "yellow", "grey", "magenta", "cyan"]

def draw_days(base_line, number):
    for day in range(0, number):
        rec_coord = dim / 2 + dim * day, base_line - dim / 2, dim / 2 + dim * (day + 1), base_line + dim / 2
        text_coord = dim + dim * (day), base_line
        main_canvas.create_rectangle(rec_coord)
        main_canvas.create_text(text_coord, text = day + 1)

def draw_trip(base_line, up_base_line, start, duration, color, text):
    rec_coord = []
    text_coord = []
    if up_base_line == True:
        rec_coord = dim / 2 + dim * (start - 1), base_line - 5 * dim / 4, dim / 2 + dim * (start + duration - 1), base_line - 3 * dim / 4
        text_coord = dim + dim * (start - 1), base_line - 6 * dim / 4
    else:
        rec_coord = dim / 2 + dim * (start - 1), base_line + 5 * dim / 4, dim / 2 + dim * (start + duration - 1), base_line + 3 * dim / 4
        text_coord = dim + dim * (start - 1), base_line + 6 * dim / 4
    main_canvas.create_text(text_coord, text = text)
    main_canvas.create_rectangle(rec_coord, fill = color)

def draw_visa(base_line, up_base_line, start, duration, color, text):
    rec_coord = []
    text_coord = []
    if up_base_line == True:
        rec_coord = dim + dim * (start - 1), base_line - 5 * dim / 4, dim + dim * (start + duration - 1), base_line - 3 * dim / 4
        text_coord = 3 * dim / 2 + dim * (start - 1), base_line - 6 * dim / 4
    else:
        rec_coord = dim + dim * (start - 1), base_line + 5 * dim / 4, dim + dim * (start + duration - 1), base_line + 3 * dim / 4
        text_coord = 3 * dim / 2 + dim * (start - 1), base_line + 6 * dim / 4
    main_canvas.create_text(text_coord, text = text)
    main_canvas.create_oval(rec_coord, fill = color)

def visualize_solution(base_line, test_case):
    sol = algo.read_input(test_case)
    sol.solve()
    draw_days(base_line, sol.get_last_day())
    for trip in sol.trips:
        draw_trip(base_line, True, trip.start, trip.duration, colors[trip.to_country], trip.to_country + 1)
    for passport in sol.passports:
        for visa in passport.visas:
            if(passport.id == 0):
                draw_visa(base_line, True, visa.issued_on, visa.required_duration, colors[visa.for_country], visa.for_country + 1)
            else:
                draw_visa(base_line, False, visa.issued_on, visa.required_duration, colors[visa.for_country], visa.for_country + 1)  


visualize_solution(base_line, "./test-data/testCase1.txt")
visualize_solution(base_line2, "./test-data/testCase2.txt")
visualize_solution(base_line3, "./test-data/testCase3.txt")

main_canvas.pack()
master.mainloop()
