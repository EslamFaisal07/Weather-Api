

// async function getCountry(){
//     let api = await fetch(`https://ipinfo.io/41.42.94.51?token=65eacc654fd0f6`)
//     let result = await api.json();


//     getNews(result.country)

// }

// getCountry()

async function getNews(country="us") {
    try {
    let response = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=a61d1dd21bf54a40a3ccf73add79d025`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let data = await response.json();
      displayNews(data);
    } catch (error) {
      console.error('Error fetching the news:', error);
      document.getElementById('allNews').innerHTML = '<p>Failed to load news.</p>';
    }
  }
  





  function displayNews(data) {
    let cartona = ``;
    for (let i = 0; i < data.articles.length; i++) {
      let article = data.articles[i];
      let publishedAt = new Date(article.publishedAt).toLocaleDateString();
      let imageUrl = article.urlToImage ? article.urlToImage : 'default-image.jpg'; 
  
      cartona += `
      
        <div class="col-md-3 mb-4">
        
          <img src="${imageUrl}" width="250" height="250" alt="News Image" class="img-fluid">
        </div>
        <div class="col-md-8 mb-4">
          <h4><a href="${article.url}">${article.title}</a></h4>
          <p>${publishedAt}</p>
          <p>${article.description}</p>
          <h6 class="float-end text-success">${article.author ? article.author : 'Unknown author'}</h6>
        </div>
     
      `;
    }
    document.getElementById('allNews').innerHTML = cartona;
  }
  
  getNews();


// async function getCountry(){
//     let api = await fetch(`https://ipinfo.io/197.60.82.178?token=61045c8c4abb43`)
//       let result = await api.json()
//   console.log(result.country);
//     getNews(result.country)
  
//   }
  
//   getCountry()
  
//   async function getNews(country) {
//     try {
//       let response = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=1f0b059d102543d89418c6a907c623e3`);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       let data = await response.json();
//       displayNews(data);
//     } catch (error) {
//       console.error('Error fetching the news:', error);
//       document.getElementById('allNews').innerHTML = '<p>Failed to load news.</p>';
//     }
//   }
  
//   function displayNews(data) {
//     let cartona = "";
//     for (let i = 0; i < data.articles.length; i++) {
//       let article = data.articles[i];
//       let publishedAt = new Date(article.publishedAt).toLocaleDateString();
//       let imageUrl = article.urlToImage ? article.urlToImage : 'default-image.jpg'; // وضع صورة افتراضية في حالة عدم وجود صورة
  
//       cartona += 
//         `<div class="col-md-3 bg-body-tertiary">
//           <img src="${imageUrl}" width="200" height="200" alt="News Image" class="img-fluid">
//         </div>
//         <div class="col-md-8">
//           <h4><a href="${article.url}" target="_blank">${article.title}</a></h4>
//           <p>${publishedAt}</p>
//           <p>${article.description}</p>
//           <h6 class="float-end text-success">${article.author ? article.author : 'Unknown author'}</h6>
//         </div>
//         <div class="w-100 mb-4"></div>
//       `;
//     }
//     document.getElementById('allNews').innerHTML = cartona;
// }
//   getNews();