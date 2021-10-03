# Import the pygame module
import pygame
from pygame.locals import *
from happytransformer import HappyGeneration


# Initialize pygame
pygame.init()

def check_exit():
    # Look at every event in the queue
    for event in pygame.event.get():
        # Did the user hit a key?
        if event.type == pygame.KEYDOWN:
        #  Was it the Escape key? If so, stop the loop.
            if event.key == K_ESCAPE:
                pygame.quit()   

        # Did the user click the window close button? If so, stop the loop.
        elif event.type == pygame.QUIT:
            pygame.quit()  



def main_loop( human_poem_color, AI_poem_color , row , AI_poem, time_wait, font_obj_new_text, seed_test_for_AI):
    
    
    # Ensure program maintains a rate of 40 frames per second
    pygame.time.wait(time_wait)

    new_poem_surface_obj_AI = font_obj_new_text.render( AI_poem, True, AI_poem_color)
    new_poem_rect_obj_AI = new_poem_surface_obj_AI.get_rect()
    new_poem_rect_obj_AI.topleft = (20, 20+row)

    new_poem_surface_obj_human = font_obj_new_text.render( seed_test_for_AI, True, human_poem_color)
    new_poem_rect_obj_human = new_poem_surface_obj_human.get_rect()
    new_poem_rect_obj_human.topleft = (20, 20+row)

    # draw the text onto the surface
    screen.blit(new_poem_surface_obj_AI, new_poem_rect_obj_AI)
    screen.blit(new_poem_surface_obj_human, new_poem_rect_obj_human)

    # Update the display
    pygame.display.flip()
    

    check_exit()  

# #Create a HappyGeneration Object
# happy_gen = HappyGeneration("GPT-NEO", "EleutherAI/gpt-neo-125M")

# Create the screen object
# The size is determined by the constant SCREEN_WIDTH and SCREEN_HEIGHT
screen = pygame.display.set_mode((0, 0), pygame.FULLSCREEN)

#set up the colors
white = (255, 255, 255)
black = (  0,   0,   0)
grey = (128, 128, 128)


#set up center of screen
size_s = screen.get_size()

#set up rectangle size
w_rectangle = 600
h_rectangle = 300

# word size
word_size = 6


# text setting inside the box
font_obj_box = pygame.font.Font('freesansbold.ttf', 90)

# Open the poem
f = open("poem.txt", "r")

# count word in the poem to fix the text in scream 
words = []
w_line = 0
for line in f:
    w_line += len(line)
    for word in line.split():
        words.append(word)
        
number_of_words = len(words)

#font_obj_new_text = pygame.font.Font('freesansbold.ttf', int(size_s[1]/number_of_words) )
font_obj_new_text = pygame.font.Font('freesansbold.ttf', word_size )


# Setup the clock for a decent framerate
clock = pygame.time.Clock()

# 
fresult = open("poem_AI-2.txt", "r")
    
# Fill the screen with black
screen.fill(black)


row = word_size
seed_test_for_AI = ""
for word in words:
    # Draw the cube on the screen
    pygame.draw.rect(screen, white, (size_s[0]/2-w_rectangle/2, size_s[1]/2-h_rectangle/2, w_rectangle, h_rectangle), width=2)

    #for word in line.split():
    text_surface_obj = font_obj_box.render( word, True, white)
    text_rect_obj = text_surface_obj.get_rect()
    text_rect_obj.center = (size_s[0]/2, size_s[1]/2)

    # draw the text onto the surface
    screen.blit(text_surface_obj, text_rect_obj)

    # Update the display
    pygame.display.flip()

    screen.fill(black, (size_s[0]/2-w_rectangle/2+2, size_s[1]/2-h_rectangle/2+2, w_rectangle-2, h_rectangle-2))

    #Run happy_gen.generate()
    # result = happy_gen.generate_text( seed_test_for_AI )
    result = fresult.readline()
    AI_poem = result
    print(result)

    seed_test_for_AI = seed_test_for_AI + word + " " 

    ### main loop, where is the number 200, it is for time wait
    main_loop( white, grey , row , AI_poem, 200 , font_obj_new_text, seed_test_for_AI)

    row += word_size
        

# 
fresult = open("poem_AI-2.txt", "r")

row = word_size
seed_test_for_AI = ""
# Fill the screen with black
screen.fill(black)

for word in words:
    #Run happy_gen.generate()
    # result = happy_gen.generate_text( seed_test_for_AI )
    result = fresult.readline()
    AI_poem = result
    print(result)

    seed_test_for_AI = seed_test_for_AI + word + " " 

    ### main loop, where is the number 0, it is for time wait
    main_loop(white, grey , row , AI_poem, 0 , font_obj_new_text, seed_test_for_AI)

    row += word_size



while True:
    # top rigth = AI
    pygame.draw.rect(screen, white, ((size_s[0]/4)*3-w_rectangle/2, size_s[1]/4-h_rectangle/2, w_rectangle, h_rectangle), width=2)

    # botton left = Human
    pygame.draw.rect(screen, white, (size_s[0]/4-w_rectangle/2, (size_s[1]/4)*3-h_rectangle/2, w_rectangle, h_rectangle), width=2)

    #
    text_surface_obj_A = font_obj_box.render( "AI", True, white)
    text_rect_obj_A = text_surface_obj_A.get_rect()
    text_rect_obj_A.center = ((size_s[0]/4)*3, size_s[1]/4)

    screen.fill(black, ((size_s[0]/4)*3-w_rectangle/2+2, size_s[1]/4-h_rectangle/2+2, w_rectangle-2, h_rectangle-2))

    #
    text_surface_obj_H = font_obj_box.render( "HUMAN", True, white)
    text_rect_obj_H = text_surface_obj_H.get_rect()
    text_rect_obj_H.center = (size_s[0]/4, (size_s[1]/4)*3)

    screen.fill(black, (size_s[0]/4-w_rectangle/2+2, (size_s[1]/4)*3-h_rectangle/2+2, w_rectangle-2, h_rectangle-2))

    # draw the text onto the surface
    screen.blit(text_surface_obj_A, text_rect_obj_A)
    screen.blit(text_surface_obj_H, text_rect_obj_H)

     # Update the display
    pygame.display.flip()

    check_exit()
    
#pygame.quit()    
    