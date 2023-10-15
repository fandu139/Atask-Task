# ATASK-Task

Made with React Native

Tech Features:
1. React Native
2. Typescript
3. React Navigation 
4. React Native Vector Icons
6. react-hook-form
7. React Native AsyncStorage
8. React Native Fast Image

## Hooks and APIs Implementation
- [X] useCallback
- [X] useContext
- [X] useEffect
- [X] useRef
- [X] useState
- [X] memo
- [X] createContext

## Setup Environment
First, setup your environment by following this guide on https://reactnative.dev/docs/environment-setup

## Clone Project
```
git clone
cd 
npm install
```

## Structure

```
App
├── assets
│   ├── icon
│   └── image
├── context
├── helper
│   ├── string
|   ├── pattern
│   └── navigation
├── hook
├── navigation
├── screens
│   ├── Account
│   ├── Auth
│   └── Home
│   └── MainScreen
│   └── Splash
│   └── WebView
├── theme
├── storage
├── uikit
│   └── Button
│   └── Divider
│   └── Header
│   └── Icon
│   └── Spinner
│   └── Text
│   └── TextInput
```

## Testing
We have two kind of test: unit test and snapshot test.
For unit test and snapshot, we will use `jest` with react native.

Every unit test must be placed under corresponding feature you want to add test and create `__test__` folder.
Every component should have snapshot test.

if you want to running unit testing, you can run this command `npm run test`

### List Testing Coverage
| Type Testing | Location FIle |
| ----------------------- | ----------------------------------- |
| Snapshoot Test | App/uikit/* and App/screens/Splash |
| Function Test | App/helper/string |


## Icon & Image
We use icomoon for converting svg icon into `.ttf` so you don't need to use png file for icon.
Icomoon can be accessed here: https://icomoon.io/

## Flow Chart
![import icon](./docs/image/Flow-Diagram.jpeg)
