# Metalysis - Medal Tally System

A comprehensive medal tally and scoring system for managing athletic competitions with role-based access control.

## Features

- **Role-Based Access Control**: Different access levels for Administrator, Tabulation Team, RSAC, and Social Media Team
- **Real-time Medal Tracking**: Track medals across different sports and categories
- **Athlete Management**: Maintain a database of athletes and their achievements
- **Modern UI**: Clean, responsive interface with sorting and filtering capabilities
- **Secure Authentication**: Firebase-based authentication system

## User Roles

1. **Administrator**
   - Full access to all features
   - Can manage users and roles
   - Can update medal tallies and athlete information

2. **Tabulation Team**
   - Can update medal tallies
   - Can view and manage athlete information

3. **RSAC**
   - Can view medal tallies and athlete information
   - Cannot make updates to the data

4. **Social Media Team**
   - Can view medal tallies
   - Limited access to athlete information

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Initialize the database with sample data:
   ```bash
   node scripts/init-db.js
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Access the application at http://localhost:8000

## Test Accounts

- Administrator:
  - Email: admin@metalysis.com
  - Password: admin123

- Tabulation Team:
  - Email: tabulation@metalysis.com
  - Password: tab123

- RSAC:
  - Email: rsac@metalysis.com
  - Password: rsac123

- Social Media Team:
  - Email: social@metalysis.com
  - Password: social123

## Technology Stack

- Next.js 13+ with App Router
- Firebase (Authentication & Firestore)
- Tailwind CSS
- TypeScript
- ShadcnUI Components

## Project Structure

```
metalysis/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── layout.tsx            # Root layout
│   │   ├── login/               
│   │   │   └── page.tsx          # Login page
│   │   ├── medal-tally/
│   │   │   └── page.tsx          # Medal tally page
│   │   └── athletes/
│   │       └── page.tsx          # Athletes page
│   ├── components/
│   │   ├── Header.tsx            # Navigation header
│   │   └── MedalUpdateForm.tsx   # Medal update form
│   ├── context/
│   │   └── AuthContext.tsx       # Authentication context
│   └── lib/
│       ├── firebase.ts           # Firebase configuration
│       └── types.ts              # TypeScript types
└── scripts/
    └── init-db.js                # Database initialization script
```

## Security Rules

Make sure to set up appropriate Firebase security rules to protect your data:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User profiles are readable by authenticated users, but only writeable by admin
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'Administrator';
    }
    
    // Medal counts are readable by all authenticated users
    // but only writeable by Admin and Tabulation Team
    match /medalCounts/{document=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        (get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['Administrator', 'Tabulation Team']);
    }
    
    // Athletes collection follows similar rules
    match /athletes/{document=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        (get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['Administrator', 'Tabulation Team']);
    }
    
    // Countries are readable by all authenticated users
    match /countries/{document=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'Administrator';
    }
  }
}
