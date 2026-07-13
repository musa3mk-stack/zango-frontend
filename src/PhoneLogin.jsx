import { useState } from "react";

export default function PhoneLogin() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    setLoading(true);
    
    // Wannan yana sauya 070... zuwa 23470...
    let formattedPhone = phone;
    if(phone.startsWith("0")){
      formattedPhone = "234" + phone.substring(1);
    }

    try {
      const res = await fetch("https://zango-h9bw.onrender.com/api/send-otp", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ phone: formattedPhone }) // MUNA TURA PHONE KAWAI
      });
      
      const data = await res.json();
      console.log(data);
      
      if(data.pinId){
        alert("OTP An Aiko! Duba SMS dinka");
        // a nan zaka kai shi shafin verify
      } else {
        alert(data.message || "Kuskure: " + JSON.stringify(data));
      }
    } catch(err){
      console.log(err);
      alert("Network Error");
    }
    setLoading(false);
  }

  return (
    <div>
      <input 
        type="text" 
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="08031234567"
      />
      <button onClick={handleSendOTP} disabled={loading}>
        {loading ? "Ana Aikowa..." : "Send OTP"}
      </button>
    </div>
  )
}
