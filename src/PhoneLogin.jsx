import { useState } from "react";

const API_URL = "https://zango-h9bw.onrender.com"; // Backend din ka

export default function PhoneLogin() {
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [pinId, setPinId] = useState("");
  const [step, setStep] = useState("phone"); // phone, otp, success
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const sendOtp = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${API_URL}/api/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      
      if (data.pinId) {
        setPinId(data.pinId);
        setStep("otp");
        setMessage("An tura code zuwa wayarka");
      } else {
        setMessage(data.message || "Kuskure yayi. Gwada kuma");
      }
    } catch (e) {
      setMessage("Ba a iya haɗawa da server");
    }
    setLoading(false);
  };

  const verifyOtp = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${API_URL}/api/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin_id: pinId, pin }),
      });
      const data = await res.json();
      
      if (data.status === "verified") {
        setStep("success");
        setMessage("Login yayi nasara ✅");
      } else {
        setMessage("Code ba daidai ba ne");
      }
    } catch (e) {
      setMessage("Ba a iya haɗawa da server");
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#000", color: "#fff", fontFamily: "Arial" }}>
      <div style={{ width: 350, padding: 20, background: "#111", borderRadius: 10 }}>
        
        {step === "phone" && (
          <>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, marginBottom: 20 }}>What's your number?</div>
            <input 
              type="tel" 
              placeholder="08012345678" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 5, border: "1px solid #333", background: "#222", color: "#fff" }}
            />
            <button onClick={sendOtp} disabled={loading} style={{ width: "100%", padding: 10, background: "#FFD700", color: "#000", border: "none", borderRadius: 5, fontWeight: "bold" }}>
              {loading ? "Ana tura..." : "Send OTP"}
            </button>
          </>
        )}

        {step === "otp" && (
          <>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, marginBottom: 20 }}>Enter Code</div>
            <input 
              type="text" 
              placeholder="1234" 
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 5, border: "1px solid #333", background: "#222", color: "#fff" }}
            />
            <button onClick={verifyOtp} disabled={loading} style={{ width: "100%", padding: 10, background: "#FFD700", color: "#000", border: "none", borderRadius: 5, fontWeight: "bold" }}>
              {loading ? "Ana dubawa..." : "Verify"}
            </button>
          </>
        )}

        {step === "success" && (
          <div style={{ textAlign: "center", fontSize: 20 }}>Barka da zuwa Zango! ✅</div>
        )}

        {message && <p style={{ marginTop: 10, color: "#FFD700", textAlign: "center" }}>{message}</p>}
      </div>
    </div>
  );
}
