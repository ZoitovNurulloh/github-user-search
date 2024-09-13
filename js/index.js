document.addEventListener('DOMContentLoaded', function() {
  //toggle dark theme
  const btnToggle = document.getElementById("toggle-btn");
  const btnHeading = document.querySelector(".btn__heading")
  const toggleImg = document.getElementById("toggle__img");
  let text = true;

  let toggle = () => {
    document.body.classList.toggle("dark");
    if(text) {
      text = false;
      btnHeading.textContent = "Light";
      toggleImg.setAttribute("src", "./images/icon-sun.svg")
    }else {
      text = true;
      btnHeading.textContent = "Dark";
      toggleImg.setAttribute("src", "./images/icon-moon.svg");
    }
  }

  btnToggle.addEventListener("click", toggle)

  //API
  const cardUser = document.querySelector("user__content");
  const userName = document.getElementById("user-name-js");
  const userImage = document.getElementById("user-image");
  const userFullName = document.getElementById("user-full-name");
  const userJoined = document.getElementById("user-joined");
  const userBio = document.getElementById("user-bio");
  const userRepos = document.getElementById("user-repos");
  const userFollowers = document.getElementById("user-followers");
  const userFollowing = document.getElementById("user-following");
  const userLocation = document.getElementById("user-location");
  const userTwitter = document.getElementById("user-twitter");
  const userGithubProfile = document.getElementById("user-github-profile");
  const formBtn = document.getElementById("form-btn");
  const form = document.getElementById("form");
  const userMail = document.getElementById("user-mail");
  const userCompany = document.getElementById("user-company")


  formBtn.addEventListener('click', (e) => {

    e.preventDefault();
    const API = `https://api.github.com/users/${userName.value}`;

    const getData = (resourse) => {
      return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();


        request.addEventListener("readystatechange", () => {
          if (request.status === 200 && request.readyState === 4) {
            const data = JSON.parse(request.responseText);
            // console.log(data.created_at);
            resolve(data);
          }else if(request.readyState === 4) {
            reject('error');
          }
        })

        // request.open("GET", `https://api.github.com/users/yoksel`);
        request.open("GET", resourse);
        request.send();
      })
    }

    getData(API)
    .then((data) => {
      userFullName.textContent = data.name;
      userMail.textContent = `@${data.login}`;
      userRepos.textContent = data.public_repos;
      userFollowers.textContent = data.followers;
      userFollowing.textContent = data.following;
      userJoined.textContent = data.created_at.slice(0, data.created_at.length - 10);
      if(!data.location) {
        userLocation.textContent = "Not Available";
      }else {
        userLocation.textContent = data.location;
      }

      if (!data.twitter_username) {
        userTwitter.textContent = "Not Available";
      }else {
        userTwitter.textContent = data.twitter_username;
        userTwitter.setAttribute("href", `https://x.com/${data.twitter_username}`)
      }

      if (!data.blog) {
        userGithubProfile.textContent = "Not Available";
      }else {
        userGithubProfile.textContent = data.blog;
        userGithubProfile.setAttribute('href', data.blog)
      }

      if (!data.company) {
        userCompany.textContent = "Not Available";
      }else {
        userCompany.textContent = data.company;
      }

      if(data.avatar_url){
        userImage.setAttribute('src', data.avatar_url)
      }

      if (!data.bio === null) {
        userBio.textContent = data.bio;
      }else {
        userBio.textContent = "This profile has no bio";
      }
    })
    .catch((err) => {
    })
  })

})
