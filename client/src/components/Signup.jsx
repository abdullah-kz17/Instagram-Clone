import axios from "axios";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { toast } from "sonner";

const Signup = () => {
  const defaultForm = {
    username: "",
    email: "",
    password: "",
  };

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(defaultForm);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status) {
        toast.success(response.data.message);
        setFormData(defaultForm);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="p-8 max-w-md w-full shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>

        <form onSubmit={handleSubmit}>
          <Input
            name="username"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?
          <a href="/login" className="text-blue-500 hover:underline">
            {" "}
            Log in
          </a>
        </p>
      </Card>
    </div>
  );
};

export default Signup;
