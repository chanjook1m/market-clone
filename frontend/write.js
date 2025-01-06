const handleSubmit = async (event) => {
  event.preventDefault();
  const body = new FormData(form);
  body.append("insertAt", new Date().getTime());
  try {
    const res = await fetch("/items", {
      method: "POST",
      body: body,
    });

    const data = await res.json();
    if (data === "200") window.location.pathname = "/";
  } catch (error) {
    console.log(error);
  }
};

const form = document.querySelector("#write-form");
form.addEventListener("submit", handleSubmit);
