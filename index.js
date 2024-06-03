const skills = [
  { logo: "./assets/logo/html.png", width: "50", name: "HTML" },
  { logo: "./assets/logo/css.png", width: "50", name: "CSS" },
  { logo: "./assets/logo/js.png", width: "50", name: "JavaScript" },
  { logo: "./assets/logo/react.png", width: "50", name: "React JS" },
  { logo: "./assets/logo/next.png", width: "50", name: "Next JS" },
  { logo: "./assets/logo/ts.png", width: "50", name: "Typescript" },
  { logo: "./assets/logo/bootstrap.png", width: "50", name: "Bootstrap" },
  { logo: "./assets/logo/mui.png", width: "50", name: "Material UI" },
  { logo: "./assets/logo/redux.png", width: "50", name: "Redux" },
  { logo: "./assets/logo/github.png", width: "50", name: "Github" },
  { logo: "./assets/logo/electron.png", width: "50", name: "Electron JS" },
  { logo: "./assets/logo/firebase.png", width: "35", name: "Firebase" },
];

const skillList = document.querySelector(".skills-list");
for (let i = 0; i < skills.length; i++) {
  skillList.innerHTML += `<li><img src="${skills[i].logo}" width=${skills[i].width} /><span class="tooltiptext">${skills[i].name}</span></li>`;
}

console.log("124234");
