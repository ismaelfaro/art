import os
import re

f = open("../poems/shredding_after_selling.es.txt", "r")

wordsInLine = [len(x.split(" "))-1  for x in f if len(x.split(" "))-1!=0]

f2 = open("../poems/shredding_after_selling.es.AI.txt", "r")

# create a new file with the same content of f2 plus the simbol ~ where need jump to new line
file = open("../poems/shredding_after_selling.es.AI-.txt", "w")

for line in f2:
    res = ' '.join([x for x in line.split(" ") if x != "^^"])
    res_line = ' '.join(res.split())

    each_word_long = [ len(y) for y in res_line.split(" ")]

    # print(each_word_long)
    incrementePos = 0
    # v = -1  #it is an index to add the spaces added by the simbol ~
    for i in range(0,len(wordsInLine)):
        incrementePos = incrementePos + wordsInLine[i]
        # print("increment position ",incrementePos)
        Sum = sum(each_word_long[0:incrementePos])
        idx = Sum+incrementePos-1
        res_line = res_line[:idx] + '~' + res_line[idx+1:]
        # idx = Sum+incrementePos+v
        # res_line = res_line[:idx] + '~' + res_line[idx:]
        # v +=1
        # res_line.insert(idx, '~')
        
        print(res_line)
    file.write(res_line + os.linesep)



file.close()