from typing import Literal, TypedDict

EventType = Literal[
    'button_press', # MouseEvent mouse button is pressed
    "button_release", # MouseEvent mouse button is released
    "close", # CloseEvent the figure is closed
    "draw", # DrawEvent canvas has been drawn (but screen widget not updated yet)
    "key_press", # KeyEvent key is pressed
    "key_release", # KeyEvent key is released
    "motion_notify", # MouseEvent mouse is moved
    "pick", # PickEvent an object in the canvas is selected
    "resize", # ResizeEvent the figure is resized
    "scroll", # MouseEvent mouse scroll wheel is rolled
    "figure_enter", # LocationEvent mouse enters a new figure
    "figure_leave", # LocationEvent mouse leaves a figure
    "axes_enter", # LocationEvent mouse enters a new axes
    "axes_leave", # LocationEvent mouse leaves an axes
]

class EventPayload(TypedDict):
    type: EventType
