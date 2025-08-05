const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc, setDoc, doc } = require("firebase/firestore");
const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyDCflNGQb3U0Dz4Gpe1fgm91PmMIbtz-Hk",
  authDomain: "metalysis-6e7ad.firebaseapp.com",
  projectId: "metalysis-6e7ad",
  storageBucket: "metalysis-6e7ad.firebasestorage.app",
  messagingSenderId: "442064347480",
  appId: "1:442064347480:web:05eef3b93386fee2e6c52d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const users = [
  {
    email: "admin@metalysis.com",
    password: "admin123",
    role: "Administrator",
    name: "Admin User"
  },
  {
    email: "tabulation@metalysis.com",
    password: "tab123",
    role: "Tabulation Team",
    name: "Tabulation User"
  },
  {
    email: "rsac@metalysis.com",
    password: "rsac123",
    role: "RSAC",
    name: "RSAC User"
  },
  {
    email: "social@metalysis.com",
    password: "social123",
    role: "Social Media Team",
    name: "Social Media User"
  }
];

const countries = [
  { name: "United States" },
  { name: "China" },
  { name: "Japan" },
  { name: "Great Britain" },
  { name: "Australia" },
  { name: "Germany" },
  { name: "France" },
  { name: "Italy" },
  { name: "Canada" },
  { name: "South Korea" }
];

const athletes = [
  {
    name: "John Smith",
    country: "United States",
    sport: "Swimming",
    medals: { gold: 2, silver: 1, bronze: 0 }
  },
  {
    name: "Liu Wei",
    country: "China",
    sport: "Gymnastics",
    medals: { gold: 1, silver: 2, bronze: 0 }
  },
  {
    name: "Tanaka Yuki",
    country: "Japan",
    sport: "Judo",
    medals: { gold: 1, silver: 0, bronze: 1 }
  },
  {
    name: "Emma Wilson",
    country: "Great Britain",
    sport: "Athletics",
    medals: { gold: 0, silver: 2, bronze: 1 }
  }
];

const medalCounts = [
  {
    country: "United States",
    gold: 10,
    silver: 8,
    bronze: 7,
    updatedAt: new Date().toISOString(),
    updatedBy: "Administrator"
  },
  {
    country: "China",
    gold: 9,
    silver: 10,
    bronze: 5,
    updatedAt: new Date().toISOString(),
    updatedBy: "Administrator"
  },
  {
    country: "Japan",
    gold: 7,
    silver: 6,
    bronze: 8,
    updatedAt: new Date().toISOString(),
    updatedBy: "Administrator"
  },
  {
    country: "Great Britain",
    gold: 6,
    silver: 7,
    bronze: 9,
    updatedAt: new Date().toISOString(),
    updatedBy: "Administrator"
  }
];

async function initializeDatabase() {
  try {
    // Create users
    for (const userData of users) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        );
        
        await setDoc(doc(db, "users", userCredential.user.uid), {
          uid: userCredential.user.uid,
          email: userData.email,
          role: userData.role,
          name: userData.name
        });
        
        console.log(`Created user: ${userData.email}`);
      } catch (error) {
        console.error(`Error creating user ${userData.email}:`, error.message);
      }
    }

    // Add countries
    for (const country of countries) {
      await addDoc(collection(db, "countries"), country);
      console.log(`Added country: ${country.name}`);
    }

    // Add athletes
    for (const athlete of athletes) {
      await addDoc(collection(db, "athletes"), {
        ...athlete,
        createdAt: new Date().toISOString()
      });
      console.log(`Added athlete: ${athlete.name}`);
    }

    // Add medal counts
    for (const medalCount of medalCounts) {
      await addDoc(collection(db, "medalCounts"), medalCount);
      console.log(`Added medal count for: ${medalCount.country}`);
    }

    console.log("Database initialization completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error initializing database:", error);
    process.exit(1);
  }
}

initializeDatabase();
