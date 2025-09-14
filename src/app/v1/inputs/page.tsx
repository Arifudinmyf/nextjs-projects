"use client";

import React, { useState } from "react";
import InputField from "@/components/features/input-field/InputField";

type FormData = {
  username: string;
  email: string;
  bio: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

// ✅ MAPPING REGEX DAN PESAN ERROR SECARA DINAMIS
const validationRules: Record<
  keyof FormData,
  { regex: RegExp; message: string; required?: boolean }
> = {
  username: {
    regex: /^[a-zA-Z0-9_]{3,20}$/,
    message: "Username hanya boleh huruf, angka, underscore (3-20 karakter)",
    required: true,
  },
  email: {
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Format email tidak valid",
    required: true,
  },
  bio: {
    regex: /^.{0,150}$/,
    message: "Bio maksimal 150 karakter",
    required: false,
  },
};

export default function page() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    bio: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // ✅ VALIDASI DINAMIS MENGGUNAKAN MAPPING
  const validateForm = (data: FormData): FormErrors => {
    const newErrors: FormErrors = {};

    (Object.keys(validationRules) as Array<keyof FormData>).forEach((field) => {
      const rule = validationRules[field];
      const value = data[field];

      if (rule.required && !value.trim()) {
        newErrors[field] = `${field} wajib diisi`;
      } else if (!rule.regex.test(value)) {
        newErrors[field] = rule.message;
      }
    });

    return newErrors;
  };

  const handleChange = <T extends HTMLInputElement | HTMLTextAreaElement>(
    e: React.ChangeEvent<T>
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormData;

    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    setErrors((prev) => {
      const updatedErrors = { ...prev };
      const validationResult = validateForm({
        ...formData,
        [fieldName]: value,
      });

      if (validationResult[fieldName]) {
        updatedErrors[fieldName] = validationResult[fieldName];
      } else {
        delete updatedErrors[fieldName];
      }

      return updatedErrors;
    });
  };

  const isFormValid = (data: FormData) =>
    Object.keys(validateForm(data)).length === 0;

  const handleSubmit = () => {
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    alert(JSON.stringify(formData, null, 2));
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h1 className="text-xl font-semibold text-gray-800">Edit Profile</h1>

      <InputField
        label="Username"
        name="username"
        placeholder="Masukkan username"
        value={formData.username}
        error={errors.username}
        onChange={handleChange}
        required
      />

      <InputField
        label="Email"
        name="email"
        type="email"
        placeholder="Masukkan email"
        value={formData.email}
        error={errors.email}
        onChange={handleChange}
        required
      />

      <InputField
        as="textarea"
        label="Bio"
        name="bio"
        placeholder="Tulis bio kamu..."
        value={formData.bio}
        onChange={handleChange}
      />

      <button
        className="w-full rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={!isFormValid(formData)}
        onClick={handleSubmit}
      >
        Simpan
      </button>
    </div>
  );
}
