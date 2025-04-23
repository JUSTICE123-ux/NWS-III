function signupBtn(event) {
  event.preventDefault();

  let url = "http://localhost:4000/sign-up";

  const firstname = document.getElementById("firstName").value;
  const lastname = document.getElementById("lastName").value;
  const email = document.getElementById("emailF").value;
  const password = document.getElementById("passwordF").value;

  const data = {
    firstname,
    lastname,
    email,
    password,
  };

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      alert("Registration successful")
      console.log(data);
      window.location.href = "login.html"
    })
    .catch((error) => {
      console.log(error);
    });
}
