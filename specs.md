# Specifications

## Layout sections

### Header

### Body

#### Stacks

* Stack
* Alt Stack

#### Script

* Current Operation
* Script Running

#### Input

* Input: Script to run
* Button to run it
  when button selected: show the scipt to run on the Runnin Script section
* Cancel Button
  When button selected: cancel animation
* Clear button
  When button selected: clear script in the Script Running section

### Footer

* OPCODE types legend

## Animation Functions (js and css)

### 1) push_animation()

1. Take the first element of the script (delete it from the script)
2. Move it to the Current Operation section and convert it to icon
3. Move it to the top of the stack
4. End

### 2) pop_animation()

1. Take the top element of the stack and move it to the Current Operation section
2. End

### 3) query_n_animation(n)

1. Highlight the queried element on the stack (like blinking or flashing)
2. Move the element to the Current Operation section, without removing
it from the stack
3. End

### 4) remove_n_animation(n)

1. animate the Deletion the element in the n :position from the stack
(-1 means the first from the top, -2 means the second from the top, etc.)
2. move the rest of the elements (if any) down to fill the open space
3. End

### 5) clear_operation_section()

1. Clear the Operation Section (delete all content with an animation like fade away)
2. End

### 6) fill_current_operation_with_value(value)

1. Fill the Current Operation section with the value specified on the parameter
2. End
