export const animalTypes = [
  "cat",
  "dog",
  "bunny",
  "fox",
  "lizard",
  "shiba",
  "koala",
  "panda",
  "bird",
];

const getRequestJSONReponse = async (endpoint) => {
  try {
    let response = await fetch(endpoint);
    const json = await response.json();
    return json;
  } catch (e) {
    console.log("errore");
    return "";
  }
};

export const getAnimalPicture = async (animalType) => {
  switch (animalType) {
    case "dog":
      return (
        await getRequestJSONReponse("https://dog.ceo/api/breeds/image/random")
      ).message;
    case "cat":
      return (await getRequestJSONReponse("https://aws.random.cat/meow")).file;
    case "bunny":
      return (
        await getRequestJSONReponse(
          "https://api.bunnies.io/v2/loop/random/?media=gif,png"
        )
      ).media.poster;
    case "fox":
      return (await getRequestJSONReponse("https://randomfox.ca/floof/")).image;
    case "lizard":
      return (
        await getRequestJSONReponse("https://nekos.life/api/v2/img/lizard")
      ).url;
    case "shiba":
      return (await getRequestJSONReponse("http://shibe.online/api/shibes"))[0];
    case "koala":
      return (
        await getRequestJSONReponse("https://some-random-api.ml/img/koala")
      ).link;
    case "panda":
      return (
        await getRequestJSONReponse("https://some-random-api.ml/img/panda")
      ).link;
    default:
      return (
        await getRequestJSONReponse("https://dog.ceo/api/breeds/image/random")
      ).message;
  }
};
