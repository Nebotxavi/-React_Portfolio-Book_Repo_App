import http from "./httpService";

const apiEndpoint = "users/register/";

export async function register({
  username,
  email,
  emailConfirmation: email2,
  password
}) {
  await http.post(apiEndpoint, { username, email, email2, password });
}
