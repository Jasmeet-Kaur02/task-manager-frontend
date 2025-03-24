# Expo Frontend - Setup Instructions

This project is built with **React Native and Expo**. Follow these steps to set up and run the project.

## Prerequisites
- Install **Node.js** (LTS version recommended)
- Install **Expo CLI** globally:
  ```sh
  npm install -g expo-cli
  ```
  To clone this repo, you must have Git installed on local machine.

- Install dependencies:
  ```sh
  npm install
  ```

## Running the App
1. Start the Expo development server:
   ```sh
   npx expo start
   ```
2. Scan the QR code with the **Expo Go** app (iOS/Android) or run on an emulator:
   - Android: Press `a` in the terminal.
   - iOS (Mac only): Press `i` in the terminal.

## Folder Structure
```
├── src
│   ├── components   # Reusable UI components
│   ├── screens      # App screens
│   ├── context      # Global state management
│   ├── constants    # All contants variables
│   ├── navigation   # All files contain navigation logic
│   ├── api          # API calls
│
├── App.js          # Root component
├── package.json    # Dependencies & scripts
```
