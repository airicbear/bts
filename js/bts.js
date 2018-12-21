let btsMembers = [
  "V",
  "Suga",
  "Jungkook",
  "RM",
  "J-Hope",
  "Jimin",
  "Jin",
]

let btsInfo = {
  "V": {
    "name": "Kim Tae Hyung (김태형)",
    "role": "Dancer, Vocalist, Visual",
    "birthday": "1995-12-30",
  },
  "Suga": {
    "name": "Min Yoon Gi (민윤기)",
    "role": "Rapper",
    "birthday": "1993-03-09",
  },
  "Jungkook": {
    "name": "Jeon Jeong-guk (전정국)",
    "role": "Dancer, Vocalist, Visual",
    "birthday": "1997-09-01",
  },
  "RM": {
    "name": "Kim Nam Joon (김남준)",
    "role": "Leader, Rapper",
    "birthday": "1994-09-12",
  },
  "J-Hope": {
    "name": "Jung Ho Seok (정호석)",
    "role": "Dancer, Rapper",
    "birthday": "1994-02-18",
  },
  "Jimin": {
    "name": "Park Ji Min (박지민)",
    "role": "Dancer, Vocalist",
    "birthday": "1995-10-13",
  },
  "Jin": {
    "name": "Kim Seok Jin (김석진)",
    "role": "Visual, Vocalist",
    "birthday": "1992-12-04",
  },
}

function Button(id = "", className = "") {
  let button = document.createElement("button");
  button.id = id;
  button.className = className;
  return button;
}

function Div(id = "", className = "") {
  let div = document.createElement("div");
  div.id = id;
  div.className = className;
  return div;
}

function Text(text = "", className = "", id = "") {
  let p = document.createElement("p");
  p.textContent = text;
  p.className = className;
  p.id = id;
  return p;
}

// https://stackoverflow.com/questions/4060004/calculate-age-given-the-birth-date-in-the-format-yyyymmdd
function calculateAge(birthday) {
  let birthDate = new Date(birthday);
  let ageDifMs = Date.now() - birthDate.getTime();
  let ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function Info(memberName, infoList = btsInfo) {
  let memberInfo = infoList[memberName];
  memberInfo["age"] = calculateAge(memberInfo["birthday"]);
  let div = Div(memberName + "Info", "memberInfo");
  div.tabIndex = 0;
  for (let info in memberInfo) {
    let propertyText = info.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1").replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    let valueText = memberInfo[info];
    let propertyClass = "member" + info.replace(/([A-Z]+)/g, "$1").replace(/([A-Z][a-z])/g, "$1").replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    let p = Text(propertyText + ": " + valueText, propertyClass, memberName + info);

    div.appendChild(p);
  }
  return div;
}

function showMember(member) {
  member.style.height = "50vh";
  document.getElementById(member.id + "Label").style.display = "inline";
  document.getElementById(member.id + "Info").style.display = "inline";
  member.collapsed = false;
}

function collapseProfile(member, initHeight = (100 / btsMembers.length) + "vh") {
  member.style.height = initHeight;
  member.style.filter = "grayscale(100%) brightness(50%)";
  document.getElementById(member.id + "Label").style.display = "none";
  document.getElementById(member.id + "Info").style.display = "none";
  member.collapsed = true;
}

function collapseAllProfiles(profileClassName = "Profile") {
  let profiles = document.getElementsByClassName(profileClassName);
  for (let i = 0; i < profiles.length; i++) {
    collapseProfile(profiles[i]);
  }
}

function collapseAllProfilesExcept(member, members) {
  for (let i = 0; i < members.length; i++) {
    if (members[i].id !== member.id) {
      collapseProfile(members[i]);
    }
  }
}

function toggle(member, members) {
  collapseAllProfilesExcept(member, members);
  if (member.collapsed) {
    showMember(member);
  } else {
    collapseProfile(member);
  }
}

function Profile(memberName = "Jungkook") {
  let button = Button(memberName, "Profile");
  button.textContent = memberName + " Profile";
  button.collapsed = true;

  // Profile text
  let label = Text(memberName, "memberLabel", memberName + "Label");
  let info = Info(memberName);
  button.appendChild(label);
  button.appendChild(info);

  let bgImage = (fileExtension) => "url('./img/" + fileExtension + "/" + memberName + "." + fileExtension + "')";
  button.style.backgroundImage = bgImage("webp") + ", " + bgImage("png"); // + ", " + bgImage("jpg");

  let openProfile = () => {
    toggle(button, document.body.getElementsByClassName("Profile"));
    setTimeout(() => {
      button.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 100);
  }

  button.addEventListener("click", openProfile);

  return button;
}

function Profiles(memberList = btsMembers) {
  let div = Div("BTS", "wrapper");
  for (let i = 0; i < memberList.length; i++) {
    let member = Profile(memberList[i]);
    member.style.animation = "intro " + Math.log(i + 2) + "s";
    div.appendChild(member);
  }
  return div;
}