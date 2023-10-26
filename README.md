# Histogram-Generator
In this assignment, we would like to implement a client-side tool to visually see the distribution of students’ grades in a class. Given an array of grades, the user should be able to adjust cutoffs and see the resulting histogram displayed dynamically.

### Part A - HTML/CSS:

Create two files called “histogram.html” and “histogram.css” to recreate something that resembles the picture below, leaving out the circles on the right-hand side of the “Histogram” container.  In this assignment, you do not need to follow the suggested design.  You should try to develop a better design. The values of the input boxes should be initialized accordingly (i.e. with valid entries). In case you're interested, here are the official SFU colors that were used.

### Part B – Javascript

Create a file called “calculate.js”.  This file will contain logic to read an uploaded .csv file containing rows of student names and grades. A file handler should parse the file’s data into an appropriate JavaScript structure.

Note that there is one student in the A+ range, three in the A range, etc …

Each time the user changes the lower bounds of any letter grade, the Histogram should dynamically adjust itself to represent the number of students in each range. I used the letter ‘O’ to represent a student, but please be creative here. You can use table cells, div box widths, images, etc. You may not use any external CSS frameworks, but Bootstrap is acceptable.

If there is an invalid input of any kind, i.e. bounds of letter grades overlap, or a string is entered as input, then your program should deal with it accordingly (it is up to you how you’d like to do that :D).

The program should also dynamically generate the Stats for the course, including:

The highest grade\n
The lowest grade\n
The Mean grade\n
The Median grade\n
