
from os import listdir
from os.path import isfile, join


def concatenate_files(folder, file):

    file_list = [f for f in listdir(folder) if isfile(join(folder, f))]

    output_file = open(file,"a")

    for one_file  in file_list:
        print(f"{folder}/{one_file}")
        open_file=open(f"{folder}/{one_file}", "r")
        lines = open_file.readlines()
        for line in lines:
            if line != "\n":
                output_file.write(line)
                print(line)
        open_file.close()


def remove_EOF(filename):
    f_source = open(filename,"r")
    f_output = open(filename+"_new","w")

    lines = f_source.readlines()

    for line in lines:
        line = line.replace(" \n","\n") 
        if line == "\n":
            pass
        else: 
            f_output.writelines(line+"\n")
            print(line)

if __name__ =="__main__":
    # remove_EOF("../poems/poems-Marcos_de_la_Fuente.txt")
    concatenate_files("../poems/marcos", "output2")