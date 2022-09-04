export default function authHeader() {
  const b: string | null = localStorage.getItem("user");
  let user = b ? JSON.parse(b) : null;

  if (user && user.accessToken) {
    // for Node.js Express back-end
    return { "x-access-token": user.accessToken };
  } else {
    return {};
  }
}
