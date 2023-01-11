export const get = async (url = "") => {
  let data = {};
  await fetch(`http://localhost:5000/` + url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((actualData) => (data = actualData))
    .catch((err) => {
      console.log(err.message);
    });
  return data;
};

export const post = async (url = "", requestBody = {}) => {
  return await fetch(`http://localhost:5000/` + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  // .then((response) => response.json())
  // .then((actualData) => (data = actualData))
  // .catch((err) => {
  //   console.log(err.message);
  // });
  //return data;
};
