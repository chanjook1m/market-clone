const calcTime = (timestamp) => {
  const curTime = new Date().getTime() - 9 * 60 * 60 * 1000;
  const time = new Date(curTime - timestamp);

  const hour = time.getHours();
  const min = time.getMinutes();
  const sec = time.getSeconds();

  if (hour > 0) {
    return `${hour} hours ago`;
  } else if (min > 0) {
    return `${min} minutes ago`;
  } else {
    return `${sec || 0} seconds ago`;
  }
};

const renderData = (data) => {
  const mainItems = document.querySelector(".main-items");

  data.reverse().forEach(async (item) => {
    const itemListDiv = document.createElement("div");
    itemListDiv.classList.add("main-item");
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("main-item__img");

    const res = await fetch(`/images/${item.id}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const imgTag = document.createElement("img");
    imgTag.src = url;
    imgDiv.appendChild(imgTag);

    const itemListInfoDiv = document.createElement("div");
    itemListInfoDiv.classList.add("main-item__info");

    const itemListInfoTitleSpan = document.createElement("span");
    itemListInfoTitleSpan.classList.add("main-item__info--title");
    itemListInfoTitleSpan.innerText = item.title;

    const itemListInfoDescSpan = document.createElement("span");
    itemListInfoDescSpan.classList.add("main-item__info--desc");
    itemListInfoDescSpan.innerText = item.place + " " + calcTime(item.insertAt);

    const itemListInfoPriceSpan = document.createElement("span");
    itemListInfoPriceSpan.classList.add("main-item__info--price");
    itemListInfoPriceSpan.innerText = item.price;

    itemListInfoDiv.appendChild(itemListInfoTitleSpan);
    itemListInfoDiv.appendChild(itemListInfoDescSpan);
    itemListInfoDiv.appendChild(itemListInfoPriceSpan);

    // itemListDiv.innerText = item.title;
    itemListDiv.appendChild(imgDiv);
    itemListDiv.appendChild(itemListInfoDiv);
    mainItems.appendChild(itemListDiv);
  });
};

const fetchList = async () => {
  const res = await fetch("/items");
  const data = await res.json();
  renderData(data);
};

fetchList();
