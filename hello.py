import random
import time

print("!WELCOME TO THE SORTING HAT CEREMONY!")

name = input("What is your name?\n")
#now making the hat dramatic

print("\n nhmmmmm...")
time.sleep(2)

print("Very interesting, I see you have a lot of potential...")
time.sleep(2)

#Create house list
houses = ["Gryffindor🦁", "Hufflepuff🦡", "Ravenclaw🦅", "Slytherin🐍"]
house = random.choice(houses)

funny_comments=[ "You look like you would argue with a proffesor and somehow win.",
"You definitely say I'll start studying tomorrow,I can sense 37 unfinishes assignments.",
"Your brain has 48 tabs open, and 3 of them are playing music, I can hear it.",
"You seem suspiciously good at avoiding responsibilites, I like that.",
"You would survive Hogwarts mostly through luck." , 
"You have main character energy... but occasionally NPC behaviour."]

comment = random.choice(funny_comments)
print(f"\n{name}...")
time.sleep(2)
print("I've decided where you belong...")
time.sleep(2)

print(f"\n✨ {house.upper()}!✨")
print(comment)