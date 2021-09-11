# Import the pygame module
import pygame
from pygame.locals import *
from happytransformer import HappyGeneration


# Initialize pygame
pygame.init()

# #Create a HappyGeneration Object
# happy_gen = HappyGeneration("GPT-NEO", "EleutherAI/gpt-neo-125M")

# Create the screen object
# The size is determined by the constant SCREEN_WIDTH and SCREEN_HEIGHT
screen = pygame.display.set_mode((0, 0), pygame.FULLSCREEN)

#set up the colors
white = (255, 255, 255)
black = (  0,   0,   0)


#set up center of screen
size_s = screen.get_size()

#set up rectangle size
w_rectangle = 200
h_rectangle = 100



# text setting inside the box
font_obj_box = pygame.font.Font('freesansbold.ttf', 32)

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
font_obj_new_text = pygame.font.Font('freesansbold.ttf', 10 )


# Setup the clock for a decent framerate
clock = pygame.time.Clock()

# Variable to keep the main loop running
running = True
fresult = open("poem_AI-2.txt", "r")
# Main loop
while running:
    # Look at every event in the queue
    for event in pygame.event.get():
        # Did the user hit a key?
        # if event.type == pygame.KEYDOWN:
        #     # Was it the Escape key? If so, stop the loop.
        if event.type == pygame.K_ESCAPE:
            running = False

        # Did the user click the window close button? If so, stop the loop.
        elif event.type == pygame.QUIT:
            running = False
            
    # Fill the screen with white
    screen.fill(black)

    # Draw the cube on the screen
    pygame.draw.rect(screen, white, (size_s[0]/2-w_rectangle/2, size_s[1]/2-h_rectangle/2, w_rectangle, h_rectangle), width=2)
    
    row = 11
    seed_test_for_AI = ""
    for word in words:
        #for word in line.split():
            
        text_surface_obj = font_obj_box.render( word, True, white)
        text_rect_obj = text_surface_obj.get_rect()
        text_rect_obj.center = (size_s[0]/2, size_s[1]/2)

        # draw the text onto the surface
        screen.blit(text_surface_obj, text_rect_obj)

        # Update the display
        pygame.display.flip()

        # Ensure program maintains a rate of 40 frames per second
        pygame.time.wait(200)
        screen.fill(black, (size_s[0]/2-w_rectangle/2+2, size_s[1]/2-h_rectangle/2+2, w_rectangle-2, h_rectangle-2))

        seed_test_for_AI = seed_test_for_AI + word + " "
       
        #Run happy_gen.generate()
        # result = happy_gen.generate_text( seed_test_for_AI )
        result = fresult.readline()
        AI_poem = result
        print(result)

        new_poem_surface_obj = font_obj_new_text.render( AI_poem, True, white)
        new_poem_rect_obj = new_poem_surface_obj.get_rect()
        new_poem_rect_obj.topleft = (20, 20+row)

        # draw the text onto the surface
        screen.blit(new_poem_surface_obj, new_poem_rect_obj)

        # Update the display
        pygame.display.flip()
        row += 11

        # Look at every event in the queue
        for event in pygame.event.get():
            # Did the user hit a key?
            # if event.type == pygame.KEYDOWN:
            #     # Was it the Escape key? If so, stop the loop.
            if event.type == pygame.K_ESCAPE:
                running = False

            # Did the user click the window close button? If so, stop the loop.
            elif event.type == pygame.QUIT:
                running = False
            
 
    # Update the display
    pygame.display.update()
    
    