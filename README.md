# QR Check-in Mobile

![Status](https://img.shields.io/badge/status-in%20progress-yellow)
![Tech](https://img.shields.io/badge/stack-Expo_50_|_React_Native_|_TypeScript_|_Reanimated_3-blue)

A premium mobile application for seamless workplace attendance verification. The app leverages **Expo Router** for navigation, **Reanimated 3** for high-performance animations, and native device capabilities (Camera, Haptics, Geolocation) to provide a fluid user experience.

## 🚀 Key Features

- **Smart Form Engine**:
  - **Phone Input**: Telegram-style masking (e.g., `+7 (701) ...`) that auto-formats as you type.
  - **Email Autocomplete**: Suggests popular domains (`@gmail.com`, etc.) instantly upon typing `@`.
- **Premium UX/UI**:
  - **Adaptive Dark Mode**: Fully supported darker interface with "pearl" gray inputs and optimized contrast.
  - **Skeleton Loading**: Replaced outdated spinners with shimmering skeleton placeholders for a modern feel.
  - **Haptic Feedback**: Tactile vibrations on successful interactions (QR scan, form submission).
- **Performance First**:
  - **Vector Animations**: Custom SVG animations (Success Checkmark) powered by `react-native-reanimated` (0kb bloat compared to Lottie).
  - **Smooth Transitions**: 60fps layout animations without jank.
- **Hardware Integration**: Real-time QR scanning and Geolocation verification.

## 🛠 Tech Stack

- **Core**: React Native, Expo SDK 50, TypeScript
- **Routing**: Expo Router (File-based routing)
- **Animations**: React Native Reanimated 3, React Native SVG
- **UI Components**: Lucide React Native (Icons), Custom Component Architecture
- **Utils**: Expo Haptics, Expo AV (Sound Design), React Native Mask Input

## ⚙️ Getting Started

1.  **Clone the repository**

    ```bash
    git clone [https://github.com/azamxvit/qr-checkin-expo.git](https://github.com/azamxvit/qr-checkin-expo.git)
    cd qr-checkin-expo
    ```

2.  **Install dependencies**

    ```bash
    pnpm install
    # or npm install
    ```

3.  **Start the development server**

    ```bash
    npx expo start -c
    ```

4.  **Run on Device/Simulator**
    - Scan the QR code with **Expo Go** (Android/iOS).
    - Or press `i` for iOS Simulator / `a` for Android Emulator.

## 🏗 Architecture & Decisions

- **Component-Based Architecture**: The UI is strictly organized into functional directories (`inputs`, `feedback`, `cards`) using **Barrel Exports** (`index.ts`) for clean import statements.
- **`useCheckIn` Hook**: Encapsulates the entire business logic (form state, validation, API mocking) separate from the View layer.
- **Dependency Isolation**: Complex logic like input masking and validation is isolated within specific components (`PhoneInput`, `EmailInput`), keeping the main screens clean and readable.
- **No Heavy Dependencies**: We deliberately avoided heavy libraries like Lottie, implementing animations via Reanimated + SVG to keep the bundle size small and performance high.

## 🎥 Project Structure

```text
src/
  ├── app/                 # Screens (Expo Router)
  ├── components/          # Reusable UI
  │   ├── inputs/          # Smart Inputs (Phone, Email)
  │   ├── feedback/        # Skeletons, Animations
  │   └── cards/           # Complex UI Blocks
  ├── constants/           # Themes, Colors
  └── hooks/               # Business Logic
```
