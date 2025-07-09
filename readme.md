# Secure Transaction History Module - Take-Home Assignment

A React Native fintech application built with Expo and TypeScript that provides secure transaction history management with biometric authentication.

## 📋 Project Overview

This application was developed as a take-home assignment for a Frontend Engineer position at a fintech company. The project demonstrates the implementation of a secure transaction history module with the following core capabilities:

- **Secure Authentication**: Device biometric authentication (FaceID/Fingerprint)
- **Transaction Management**: View, filter, and manage financial transactions
- **Data Security**: Sensitive information masking with biometric unlock
- **Modern UI**: Responsive design with light/dark mode support
- **Error Handling**: Comprehensive error handling throughout the application

## 🚀 Features

### ✅ Implemented Features

- **Project Structure**: Complete React Native app with TypeScript
- **External API Integration**: 40+ realistic transaction records from hosted API endpoint
- **Navigation**: Tab-based navigation with Home and History screens
- **UI Components**: Modern component library with Gluestack UI and NativeWind
- **Responsive Design**: Cross-platform compatibility (iOS, Android, Web)
- **Error Handling**: Network simulation with random error generation
- **Data Fetching**: Async functions with pagination support
- **Filtering**: Transaction filtering by month and category

### 🔄 In Progress Features

- **Biometric Authentication**: User login with FaceID/Fingerprint
- **Transaction History Screen**: Complete transaction list implementation
- **Transaction Detail Screen**: Individual transaction detail views
- **Amount Masking**: Sensitive data protection with biometric reveal
- **Pull-to-Refresh**: Transaction list refresh functionality
- **Search & Filter**: Advanced transaction search capabilities

## 🏗️ Architecture

### **Technology Stack**

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: Expo Router
- **UI Library**: Gluestack UI
- **Styling**: Tailwind
- **State Management**: React hooks and context
- **Animations**: React Native Reanimated

### **Project Structure**

```
rytbank-take-home-assignment/
├── app/                          # Main application screens
│   ├── (tabs)/                   # Tab navigation screens
│   │   ├── home.tsx             # Home screen with expense tracking
│   │   ├── history.tsx          # Transaction history screen
│   │   └── _layout.tsx          # Tab layout configuration
│   ├── _layout.tsx              # Root layout with providers
│   ├── modal.tsx                # Modal screen implementation
│   └── +not-found.tsx           # 404 error screen
├── components/                   # Reusable UI components
│   ├── ui/                      # Gluestack UI components
│   │   ├── gluestack-ui-provider/
│   │   ├── text/
│   │   ├── heading/
│   │   ├── center/
│   │   └── vstack/
│   ├── screen-container.tsx     # Screen wrapper component
│   └── Themed.tsx               # Theme-aware components
├── constants/                    # Application constants
│   ├── Colors.ts                # Color definitions
│   └── mock-data.ts             # API integration & transaction data
├── assets/                      # Static assets
│   ├── images/                  # App icons and images
│   └── fonts/                   # Custom fonts
└── types/                       # TypeScript type definitions
```

### **Data Model**

**Transaction Object Structure:**

```typescript
interface Transaction {
  id: number;
  transactionNumber: string;
  timestamp: number;
  date: string;
  month: string;
  amount: number;
  description: string;
  category: string;
  type: "debit" | "credit";
  balance: number;
}
```

**Account Data Structure:**

```typescript
interface AccountData {
  accountNumber: string;
  accountType: string;
  currentBalance: number;
  availableBalance: number;
  accountHolder: string;
}
```

### **API Data Source**

The transaction data is hosted and accessible via a RESTful API endpoint:

**API Endpoint:** [https://gist.githubusercontent.com/jia-wei-00/0a113cc8a47da804b4472bf41519fab2/raw/transaction_data.json](https://gist.githubusercontent.com/jia-wei-00/0a113cc8a47da804b4472bf41519fab2/raw/transaction_data.json)

## 🛠️ Setup & Installation

### **Prerequisites**

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### **Installation Steps**

1. **Clone the repository**

```bash
git clone [repository-url]
cd rytbank-take-home-assignment
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm start
```

4. **Run on specific platforms**

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

### **Available Scripts**

- `npm start` - Start the Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run in web browser
- `npm test` - Run Jest tests

## 🔒 Security Features

### **Biometric Authentication**

- **Implementation**: Device biometric authentication using Expo LocalAuthentication
- **Fallback**: PIN/Password authentication for devices without biometrics
- **Security**: Secure storage of authentication state

### **Data Protection**

- **Amount Masking**: Sensitive transaction amounts hidden by default
- **Biometric Unlock**: Requires biometric authentication to reveal sensitive data
- **Session Management**: Automatic session timeout for security

### **Error Handling**

- **Network Errors**: Simulated network failures with retry mechanisms
- **Authentication Errors**: Proper error messages for auth failures
- **Data Validation**: Input validation and sanitization
