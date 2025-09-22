import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../utils/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

export default function Auth() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleAuth = async () => {
    setLoading(true);
    setError("");

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      // 🔑 Save token & user details
      localStorage.setItem("jwt", token);
      localStorage.setItem("userPhoto", result.user.photoURL);
      localStorage.setItem("userName", result.user.displayName);
      localStorage.setItem("userEmail", result.user.email);

      console.log("👤 Saved User:", {
        uid: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });

      // 🔥 Firestore logic
      const userRef = doc(db, "users", result.user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          name: result.user.displayName || "",
          email: result.user.email,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
        });
        navigate("/register");
      } else {
        await setDoc(userRef, { lastLogin: serverTimestamp() }, { merge: true });
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#012A4A] via-[#01497C] to-[#2C7DA0] p-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-3xl rounded-3xl shadow-xl border border-white/20 p-8 flex flex-col items-center">
        <h2 className="text-white text-3xl font-bold mb-4">Welcome!</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          onClick={handleGoogleAuth}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-3 bg-white/90 text-black font-semibold rounded-full shadow-md hover:scale-105 transition-all"
        >
          <FcGoogle size={22} />
          {loading ? "Processing..." : "Continue with Google"}
        </button>
      </div>
    </div>
  );
}
