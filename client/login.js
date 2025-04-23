function Login() {
  let url = "https://nws-iii.onrender.com/login";

  const email = document.getElementById("emailF").value;
  const password = document.getElementById("passwordF").value;

  const data = {
    email,
    password,
  };

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      alert("Login successful");
      window.location.href = "dashboard.html";
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}
