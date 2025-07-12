# Secure Transaction History Module - Take-Home Assignment

A React Native fintech application built with Expo and TypeScript that provides secure transaction history management with biometric authentication.

## 📋 Project Overview

This application was developed as a take-home assignment. The project demonstrates the implementation of a secure transaction history module with the following core capabilities:

- **Secure Authentication**: Device biometric authentication (FaceID/Fingerprint)
- **Transaction Management**: View, filter, and manage financial transactions
- **Data Security**: Sensitive information masking with biometric unlock
- **Modern UI**: Responsive design with light/dark mode support
- **Error Handling**: Comprehensive error handling throughout the application

## 🚀 Features

### ✅ Implemented Features

- **Project Structure**: Complete React Native app with TypeScript
- **External API Integration**: Mock transaction records from hosted API endpoints
- **Navigation**: Tab-based navigation with Home and History screens
- **UI Components**: Modern component library with Gluestack UI and NativeWind
- **Responsive Design**: Cross-platform compatibility (iOS, Android, Web)
- **Error Handling**: Network simulation with random error generation
- **Data Fetching**: React Query for efficient data fetching with caching
- **Biometric Authentication**: Complete FaceID/Fingerprint authentication system
- **Transaction History Screen**: Full-featured transaction history with interactive charts
- **Transaction Detail Screen**: Modal-based detailed transaction views
- **Amount Masking**: Comprehensive sensitive data protection with biometric reveal
- **Pull-to-Refresh**: Transaction list refresh functionality
- **Date Filtering**: Month-based transaction filtering with calendar picker
- **Interactive Charts**: Pie charts showing debit/credit breakdown with data visualization
- **State Management**: Zustand store for authentication and app state
- **Session Management**: Automatic re-authentication when app returns to foreground
- **Biometric Toggle**: Eye icon toggles for revealing/hiding sensitive data
- **Loading States**: Skeleton loaders for better user experience
- **Secure Navigation**: Biometric authentication required for sensitive screens

### 🔄 In Progress Features

- **Advanced Search**: Text-based search across transaction descriptions
- **Category Filtering**: Filter transactions by specific categories
- **Notification System**: Push notifications for new transactions

## 🏗️ Architecture

### **Technology Stack**

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: Expo Router
- **UI Library**: Gluestack UI with NativeWind
- **Styling**: Tailwind CSS with NativeWind
- **State Management**: Zustand for authentication state
- **Data Fetching**: TanStack React Query for API calls and caching
- **Authentication**: Expo Local Authentication for biometric support
- **Charts**: React Native Gifted Charts for data visualization
- **Date Handling**: Day.js for date formatting and manipulation
- **Animations**: React Native Reanimated

### **Project Structure**

```
rytbank-take-home-assignment/
├── app/                          # Main application screens
│   ├── (auth)/                   # Authentication screens
│   │   └── local-authenticate.tsx # Biometric authentication screen
│   ├── (tabs)/                   # Tab navigation screens
│   │   ├── home.tsx             # Home screen with expense tracking
│   │   ├── history.tsx          # Transaction history with charts
│   │   └── _layout.tsx          # Tab layout with biometric guard
│   ├── _layout.tsx              # Root layout with providers
│   ├── modal.tsx                # Transaction detail modal
│   └── +not-found.tsx           # 404 error screen
├── components/                   # Reusable UI components
│   ├── ui/                      # Gluestack UI components
│   │   ├── gluestack-ui-provider/
│   │   ├── actionsheet/
│   │   ├── box/
│   │   ├── center/
│   │   ├── divider/
│   │   ├── heading/
│   │   ├── hstack/
│   │   ├── skeleton/
│   │   ├── text/
│   │   └── vstack/
│   ├── home/                    # Home screen components
│   │   ├── top-section.tsx      # User info and account balance
│   │   ├── transaction-section.tsx # Transaction list with totals
│   │   └── index.ts
│   ├── history/                 # History screen components
│   │   ├── history-chart.tsx    # Interactive pie chart
│   │   └── index.ts
│   ├── data-box.tsx             # Transaction item component
│   └── screen-container.tsx     # Screen wrapper component
├── hooks/                       # Custom React hooks
│   ├── useFetchTransaction.ts   # Transaction data fetching
│   ├── useFetchUser.ts          # User data fetching
│   ├── useLocalAuthentication.ts # Biometric authentication logic
│   ├── useMaskText.ts           # Sensitive data masking
│   └── index.ts
├── store/                       # State management
│   ├── useAuth.ts               # Authentication state store
│   └── index.ts
├── constants/                   # Application constants
│   ├── Colors.ts                # Color definitions
│   └── mock-data.ts             # API endpoints
├── utils/                       # Utility functions
│   └── handle-biometric-auth.tsx # Biometric authentication utilities
├── assets/                      # Static assets
│   ├── images/                  # App icons and images
│   └── fonts/                   # Custom fonts
└── android/                     # Android-specific configuration
    └── app/src/main/AndroidManifest.xml # Biometric permissions
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

**User Data Structure:**

```typescript
interface User {
  userId: string;
  fullName: string;
  dateOfBirth: string;
  nationalId: string;
  contact: {
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
  };
  kycStatus: "verified" | "pending" | "rejected";
  createdAt: string;
  lastLoginAt: string;
  security: {
    twoFactorEnabled: boolean;
    preferred2faMethod: "authenticator_app" | "sms" | "email";
  };
  accounts: Array<{
    accountId: string;
    type: "debit_card" | "credit_card" | "savings";
    accountNumber: string;
    currency: string;
    balance: number;
    openedAt: string;
    transactions: Array<{
      txnId: string;
      timestamp: number;
      date: string;
      amount: number;
      description: string;
      category: string;
      channel: string;
      status: string;
      balanceAfter: number;
    }>;
  }>;
  preferences: {
    language: string;
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
  };
}
```

### **API Data Sources**

The application fetches data from hosted API endpoints:

**Transaction Data:** [https://gist.githubusercontent.com/jia-wei-00/0a113cc8a47da804b4472bf41519fab2/raw/transaction_data.json](https://gist.githubusercontent.com/jia-wei-00/0a113cc8a47da804b4472bf41519fab2/raw/transaction_data.json)

**User Data:** [https://gist.githubusercontent.com/jia-wei-00/803f702526db15a0e2ac0c50ee03df61/raw/user_data.json](https://gist.githubusercontent.com/jia-wei-00/803f702526db15a0e2ac0c50ee03df61/raw/user_data.json)

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
git clone [[repository-url]](https://github.com/jia-wei-00/rytbank-take-home-assignment.git)
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
- `npm run ios` - Run on iOS simulator with dark mode support
- `npm run android` - Run on Android emulator
- `npm run web` - Run in web browser with dark mode support
- `npm test` - Run Jest tests

## 🔒 Security Features

### **Biometric Authentication**

- **Implementation**: Complete biometric authentication system using Expo LocalAuthentication
- **Hardware Detection**: Automatic detection of biometric hardware availability
- **Enrollment Check**: Verification of enrolled biometrics before authentication
- **App State Management**: Automatic re-authentication when app returns to foreground
- **Session Timeout**: Authentication state resets when app goes to background

### **Data Protection**

- **Sensitive Data Masking**: Transaction amounts, account numbers, and balances masked by default
- **Biometric Unlock**: Two-tier authentication system:
  - **Normal Authentication**: Initial app access
  - **Sensitive Authentication**: Accessing masked financial data
- **Visual Indicators**: Eye icons show authentication state and allow toggling
- **Secure Navigation**: Biometric authentication required for transaction details

### **Error Handling**

- **Network Errors**: Comprehensive error handling with messages
- **Authentication Errors**: Clear feedback for authentication failures
- **Loading States**: Skeleton loaders during data fetching

## 📱 Key User Flows

### **Authentication Flow**

1. App launches and checks biometric availability
2. If biometrics available, shows authentication prompt
3. If biometrics unavailable, automatically grants access
4. User can toggle sensitive data visibility with biometric authentication

### **Transaction Viewing**

1. Home screen shows current month's transactions with masked amounts
2. History screen allows date selection and shows interactive charts
3. Tapping transactions requires biometric authentication for details
4. Modal displays comprehensive transaction information

### **Data Visualization**

1. Interactive pie charts show debit/credit breakdown
2. Charts respect authentication state (masked when unauthenticated)
3. Real-time updates based on selected date range
4. Visual legends and percentage calculations

## 📈 Performance Optimizations

- **React Query**: Efficient data fetching with background updates and caching
- **Skeleton Loading**: Improved perceived performance during data loading
- **Memoization**: Optimized calculations for transaction totals and percentages
- **Lazy Loading**: Components loaded as needed
- **State Persistence**: Authentication state maintained across app sessions

## 🚀 Future Enhancements

- **Advanced Search**: Full-text search across transaction descriptions
- **Category Management**: Custom category creation and management
- **Export Features**: PDF and CSV export capabilities
- **Push Notifications**: Real-time transaction alerts
- **Spending Analytics**: Advanced spending pattern analysis
- **Budget Tracking**: Monthly budget setting and tracking
- **Multi-Account Support**: Support for multiple bank accounts

---

**Note**: This application demonstrates modern React Native development practices with a focus on security, user experience, and maintainable code architecture.
