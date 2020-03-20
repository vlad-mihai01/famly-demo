#Demo Famly

Demo :  http://vlad-mihai.com/demo/famly

## Dependencies 

- Swiper
    Used to generate the list container

- Axios
    Used for the API calls 

## Custom components

- Child card
    Simple component that displays the image and name of a child
- Time Picker
    I wanted to create a versatile and easy to use component that can display the time both in 24 and 12 hours format.
    Props:
    - initialTime - Takes an initial hour and minutes to display on first load
    - hoursArray - Takes an array of numbers in 24h format, from which the user can choose
    - minutesArray - Takes an array of numbers, from which the user can choose
    - mode12 - if `true` the component will display everything in 12h format. Probably I should name it `format12`
    - initialTimeArray - if `true` the initial time will be the first value from the `hoursArray` prop
    - returnTimeFunction - function that can return the current `hour, minutes and am or pm` if in `mode12`
- Buttons
- Loading component

## CSS
    - All CSS except for the reset file which comes from bootstrap is custom created. 
    > I will probably remove that also and have a custom made one

## UX
    - The app has to main pages `Sign in` and `Sign out`.
        This was chosen first in order to have a clear separation of the action performed. 
        And second while kids sign in the don't appear on the page anymore so it is easier 
        for the parents to find their kid.
    

## UI
    - The UI is based on flat design style. 
    - The animations between steps are meant to convey a soft transition between pages and 
    steps and focus the attention of the user.
    > I like to think of them as a storytelling of the task
    - In order for a better separation and ease of use of the app each task (Sign in & Sign out) 
    has its own colour theme
    - The typography and colours have been checked for proper contrast ratio and colour blind usability

### Pallet 
    - The primary palette has been derived from the brand colour of Famly.

### Typography
    - Font family - Lato



