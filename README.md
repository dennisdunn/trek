# Trek

A simple port of the gameplay of the 1970's Star Trek game.

## The game engine

The original Star Trek game was meant to be played over a terminal connection. I first met the game in the boiler room of my high school where you could sign up for 1 hour blocks on the teletype machine. This being the 21st century, however, means this will never do.

The app is built with Node and React. The two biggest problems I had to solve were state management and the game loop.

### State management

The state problem was solved with a combination of hooks and context. Custom hooks such as `useShip()` and `useWarp()` get the relevant state from the context.

The `useDispatch()` custom hook provides a function which will dispatch an action to the correct reducer. Actions have the shape `{sys:string, type:string, payload:any}` where `sys` is the name of the reducer.

### Game loop

I found that my components were getting pretty heavy with code checking for state and then dispatching actions based on that state. I really wanted some sort of message bus to trigger these state changes. I finally realized that I already had such a mechanism in the `useEffect()` hook.

The `<Game/>` component encapsulates these monitoring functions. It uses the state managment custom hooks to effect changes to the game state based on user actions. UI components are only responsible for dispatching actions triggered by controls in the component.
