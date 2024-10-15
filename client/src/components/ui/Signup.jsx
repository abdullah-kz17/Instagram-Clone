import axios from "axios";
import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Alert } from "./alert";
import { Card } from "./card";

const Signup = () => {
  const defaultForm = {
    username: "",
    email: "",
    password: "",
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState(defaultForm);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        formData
      );

      if (response.status !== 200) {
        throw new Error("Failed to sign up");
      }

      setSuccess("Signup successful! Please check your email.");
      setFormData(defaultForm);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="p-6 max-w-md w-full">
        <h1 className="text-xl font-bold mb-4">Sign Up</h1>

        {error && <Alert variant="error">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <form onSubmit={handleSubmit}>
          <Input
            name="username"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="mb-4"
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mb-4"
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mb-4"
          />
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
