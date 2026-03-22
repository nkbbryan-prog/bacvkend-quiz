const res = await fetch("http://localhost:3000/quiz", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ theme: "football" }),
});

const data = await res.json();
console.log(data);