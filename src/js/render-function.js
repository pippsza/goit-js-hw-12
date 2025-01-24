export const createGalleryCardTemplate = imgInfo => {
  /*
    <li class="gallery-card">
      <img class="gallery-img" src="" alt="" />
    </li>
  */
  return `
    <li class="gallery-card"> <a class="gallery-link" href="${imgInfo.largeImageURL}">
      <img class="gallery-img" src="${imgInfo.webformatURL}" alt="${imgInfo.tags}" />
        </a><div class="info">
        <div>
        <h5>Likes</h5>
        <p>${imgInfo.likes}</p>
      </div>
      <div>
        <h5>Views</h5>
        <p>${imgInfo.views}</p>
      </div>
      <div>
        <h5>Comments</h5>
        <p>${imgInfo.comments} </p>
      </div>
      <div>
        <h5>Downloads</h5>
        <p>${imgInfo.downloads}</p>
      </div>
    </div>
    </li>
  `;
};
export const createWaitingCardTemplate = imgInfo => {
  return '<p>Loading images, please wait...</p>';
};
