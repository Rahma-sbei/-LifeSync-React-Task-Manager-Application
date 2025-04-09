import { jwtDecode } from "jwt-decode";

export function UserRole() {
  const token = localStorage.getItem("token"); //get token from localStorage
  if (token) {
    try {
      const decodedToken = jwtDecode(token); //decode token to get user info
      console.log(decodedToken);
      return decodedToken.role; //return the role found in the decoded token
    } catch (error) {
      console.error("Token decoding error:", error);
    }
  }
  return null;
}
