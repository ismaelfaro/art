
from typing import Iterable
from happytransformer import HappyGeneration

#Create a HappyGeneration Object
#happy_gen = HappyGeneration("GPT-NEO", "EleutherAI/gpt-neo-125M")
# happy_gen = HappyGeneration("GPT-NEO", "EleutherAI/gpt-neo-1.3B")



with open('poem.txt') as f:
    contents = f.read().replace("\n","")


words = [ i for i in contents.split(" ") ]

print(len(words))

# poem_len = len(poem)
# partial_poem = []

# count = 0

# for word in poem[0:3]:
    
#     partial_poem.append(word)
#     initial_text = " ".join(partial_poem)
#     ai_text = happy_gen.generate_text( initial_text)
#     print(initial_text, "^*^", ai_text.text.replace("\n",""))

# print(text)

# x


# # count word in the poem to fix the text in scream 
# words = []
# w_line = 0
# for line in f:
#     w_line += len(line)
#     for word in line.split():
#         words.append(word)
        
# number_of_words = len(words)

    