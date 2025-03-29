"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Badge } from "./components/ui/badge";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Loader2,
  Github,
  Twitter,
  Facebook,
  User2,
} from "lucide-react";
import { Label } from "./components/ui/label";
import { Checkbox } from "./components/ui/checkbox";
import { login, register, validateToken } from "./Api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("login");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await login({ username, password });
    setTimeout(() => {
      setLoading(false);
      console.log("Login attempt with:", { username, password });
    }, 1500);
    navigate("/clipsai");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await register({ username, password });
    setTimeout(() => {
      setLoading(false);
      console.log("Register attempt with:", { username, password });
    }, 1500);
  };

  useEffect(() => {
    const validate = async () => {
      const response = await validateToken();
      console.log(response);
      if (response === true) {
        navigate("/clipsai");
      }
    };
    validate();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            GetClipsAi
          </h1>
          <p className="mt-2 text-slate-600">
            Transform your videos into viral social media clips
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-indigo-600">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <Card className="bg-white border-none shadow-xl rounded-xl overflow-hidden">
            <TabsContent value="login">
              <CardHeader className="pb-2 pt-6">
                <Badge
                  variant="outline"
                  className="mb-2 bg-indigo-50 text-indigo-700 border-indigo-200 px-3 py-1 w-fit mx-auto"
                >
                  Welcome Back
                </Badge>
                <h2 className="text-2xl font-bold text-center text-slate-900">
                  Login to Your Account
                </h2>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label
                        htmlFor="username"
                        className="text-sm font-medium text-slate-700"
                      >
                        Username
                      </Label>
                    </div>
                    <div className="relative">
                      <User2
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-600"
                        size={18}
                      />
                      <Input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        className="pl-10 focus-visible:ring-2 focus-visible:ring-indigo-500 border-indigo-600"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label
                        htmlFor="password"
                        className="text-sm font-medium text-slate-700"
                      >
                        Password
                      </Label>
                    </div>
                    <div className="relative">
                      <Lock
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-600"
                        size={18}
                      />
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="pl-10 focus-visible:ring-2 focus-visible:ring-indigo-500 border-indigo-600"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 rounded-lg flex items-center justify-center gap-2 w-full text-lg font-medium"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" /> Logging in...
                      </>
                    ) : (
                      <>
                        Login <ArrowRight className="ml-2" size={18} />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>

            <TabsContent value="register">
              <CardHeader className="pb-2 pt-6">
                <Badge
                  variant="outline"
                  className="mb-2 bg-indigo-50 text-indigo-700 border-indigo-200 px-3 py-1 w-fit mx-auto"
                >
                  Get Started
                </Badge>
                <h2 className="text-2xl font-bold text-center text-slate-900">
                  Create an Account
                </h2>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="username"
                      className="text-sm font-medium text-slate-700"
                    >
                      Username
                    </Label>
                    <div className="relative">
                      <User
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-600"
                        size={18}
                      />
                      <Input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Choose a username"
                        className="pl-10 focus-visible:ring-2 focus-visible:ring-indigo-500 border-indigo-600"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="register-password"
                      className="text-sm font-medium text-slate-700"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Lock
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-600"
                        size={18}
                      />
                      <Input
                        id="register-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a password"
                        className="pl-10 focus-visible:ring-2 focus-visible:ring-indigo-500 border-indigo-600"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="confirm-password"
                      className="text-sm font-medium text-slate-700"
                    >
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-600"
                        size={18}
                      />
                      <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        className="pl-10 focus-visible:ring-2 focus-visible:ring-indigo-500 border-indigo-600"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <label
                      htmlFor="terms"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700"
                    >
                      I agree to the{" "}
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 rounded-lg flex items-center justify-center gap-2 w-full text-lg font-medium"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" /> Creating account...
                      </>
                    ) : (
                      <>
                        Create Account <ArrowRight className="ml-2" size={18} />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
          </Card>
        </Tabs>
      </div>
    </div>
  );
}
