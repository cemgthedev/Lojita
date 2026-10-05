import { AuthContext, type AuthContextValue } from "@/providers/AuthProvider";
import { useContext } from "react";

export const useAuth = () => useContext(AuthContext) as AuthContextValue;
