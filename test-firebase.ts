import { app, db } from './src/lib/firebase/config';
import { collection, getDocs, addDoc } from 'firebase/firestore';

async function testConnection() {
    console.log("Testing connection to project:", app.options.projectId);
    try {
        const testRef = collection(db, 'system_tests');
        const docRef = await addDoc(testRef, {
            message: "Hello from OpportunityOS Backend Initialization",
            timestamp: new Date().toISOString()
        });
        console.log("✅ Successfully wrote test document with ID:", docRef.id);

        const snapshot = await getDocs(testRef);
        console.log("✅ Successfully read from Firestore Backend. Total test docs:", snapshot.size);
    } catch (error) {
        console.error("❌ Firestore Connection Error:", error);
    }
}

testConnection().then(() => process.exit(0)).catch(() => process.exit(1));
