// src/components/Register.tsx
import React, { useState } from "react";
import { register } from "../api";

const Register = () => {
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, passwd);
      alert("Registro exitoso!");
    } catch (error) {
      alert("Error en el registro.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Correo electrónico"
        className="border p-2"
      />
      <input
        type="password"
        value={passwd}
        onChange={(e) => setPasswd(e.target.value)}
        placeholder="Contraseña"
        className="border p-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Registrar
      </button>
    </form>
  );
};

export default Register;
