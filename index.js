import{a as v,S as b,i as p}from"./assets/vendor-D0cagnvz.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();const m=r=>`
    <li class="gallery-card"> <a class="gallery-link" href="${r.largeImageURL}">
      <img class="gallery-img" src="${r.webformatURL}" alt="${r.tags}" />
        </a><div class="info">
        <div>
        <h5>Likes</h5>
        <p>${r.likes}</p>
      </div>
      <div>
        <h5>Views</h5>
        <p>${r.views}</p>
      </div>
      <div>
        <h5>Comments</h5>
        <p>${r.comments} </p>
      </div>
      <div>
        <h5>Downloads</h5>
        <p>${r.downloads}</p>
      </div>
    </div>
    </li>
  `,g=r=>"<p>Loading images, please wait...</p>",y=async(r,t)=>{const i={params:{q:r,key:"48288384-c73711b953ffb418f1a2cd50e",image_type:"photo",orientation:"horizontal",page:t,per_page:15,safesearch:"true"}};return(await v.get("https://pixabay.com/api/",i)).data};let c=1,d="";const h=document.querySelector(".js-search-form"),a=document.querySelector(".js-gallery"),f=new b(".js-gallery a",{captionsData:"alt",captionDelay:250}),n=document.querySelector(".js-load-more-btn"),w=async r=>{try{if(r.preventDefault(),n.classList.add("is-hidden"),a.innerHTML=g(),c=1,d=r.currentTarget.elements.user_query.value.trim(),d===""){p.show({color:"red",titleColor:"red",title:"Fields must be filled!",position:"topRight"}),a.innerHTML="",h.reset();return}const t=await y(d,c);if(t.total===0){a.innerHTML="",h.reset(),p.show({color:"red",titleColor:"red",title:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}n.classList.add("is-hidden"),Math.round(t.totalHits/15)>1&&(n.classList.remove("is-hidden"),n.addEventListener("click",L));const s=t.hits.map(e=>m(e)).join("");a.innerHTML=s,f.refresh()}catch(t){p.show({color:"red",titleColor:"red",title:`An error occurred: ${t.message}`,position:"topRight"}),console.error("Error:",t)}};h.addEventListener("submit",w);const L=async r=>{try{c++,a.insertAdjacentHTML("beforeend",g());const t=await y(d,c),i=Math.round(t.totalHits/15),s=document.querySelectorAll("p");s.length>0&&s[s.length-1].remove();const e=t.hits.map(u=>m(u)).join("");a.insertAdjacentHTML("beforeend",e),f.refresh();const l=a.querySelectorAll("li")[0].getBoundingClientRect().height;window.scrollBy({top:l*2,behavior:"smooth"}),c===i&&(n.classList.add("is-hidden"),n.removeEventListener("click",L))}catch(t){console.log(t)}};
//# sourceMappingURL=index.js.map
