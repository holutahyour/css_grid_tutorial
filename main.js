const getUnsplashImages = async function () {
  const url =
    "https://api.unsplash.com/photos?client_id=2pbkYuSRoytkM3Kl6wuEf-1J8KjKkw8ErcsmVEPUvMk&per_page=20";

  try {
    const response = await fetch(url);
    const data = await response.json();
    const imageUrls = data.map((image) => image.urls.small);
    return imageUrls;
  } catch (error) {
    console.log(error);
  }
};

function displayImages(images) {
  const container = document.querySelector(".container");

  images.map((url, index) => {
    const imageDiv = document.createElement("div");
    imageDiv.classList.add("column");
    imageDiv.classList.add(`column-${index}`);

    const img = document.createElement("img");
    (img.src = url), imageDiv.appendChild(img);

    container.appendChild(imageDiv);
  });

  // const randIndex = Math.floor(Math.random() * images.length);
  // console.log(randIndex);
  // const randImg = document.querySelector(`.column-${randIndex}`);
  // randImg.classList.add('big')
  let indices = addClassToRandomElement(`.column-`, "big", images.length, 4);
  indices = addClassToRandomElement(`.column-`, "vertical", images.length, 2, indices);
  indices = addClassToRandomElement(`.column-`, "horizontal", images.length, 2, indices);
}

function addClassToRandomElement(
  querySelector,
  className,
  maxNumber,
  numofRepeat,
  selectedIndices
) {
  console.log(querySelector, className, maxNumber, selectedIndices);
  counter = 0;
  selectedIndices = selectedIndices || [];
  console.log(selectedIndices);
  while (counter < numofRepeat) {
    const randIndex = Math.floor(Math.random() * maxNumber);
    if (!selectedIndices.includes(randIndex)) {
      selectedIndices.push(randIndex);
      const randImg = document.querySelector(querySelector + randIndex);
      randImg.classList.add(className);
      counter++
    }
  }

  return selectedIndices;
}

getUnsplashImages().then((imageUrls) => displayImages(imageUrls));
