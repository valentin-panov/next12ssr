export function logout() {
  document.cookie = "access_token=; Max-Age=-99999999;";
  document.cookie = "role=; Max-Age=-99999999;";
  window.location.href = "/";
}
