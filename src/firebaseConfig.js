// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // para autenticación
import { getFirestore } from "firebase/firestore"; // para base de datos (si aun se usa)

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD3IhDKjcotjr9r-4Dfs-fUiOmiJhejf-Q",
  authDomain: "registro-software-web.firebaseapp.com",
  projectId: "registro-software-web",
  storageBucket: "registro-software-web.firebasestorage.app",
  messagingSenderId: "928300962258",
  appId: "1:928300962258:web:4ab87a738802338c8eb80b"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar para usar en otros archivos
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
