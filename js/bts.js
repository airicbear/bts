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
    "birthday": "December 30, 1995",
  },
  "Suga": {
    "name": "Min Yoon Gi (민윤기)",
    "role": "Rapper",
    "birthday": "March 9, 1993",
  },
  "Jungkook": {
    "name": "Jeon Jeong-guk (전정국)",
    "role": "Dancer, Vocalist, Visual",
    "birthday": "September 1, 1997",
  },
  "RM": {
    "name": "Kim Nam Joon (김남준)",
    "role": "Leader, Rapper",
    "birthday": "September 12, 1994",
  },
  "J-Hope": {
    "name": "Jung Ho Seok (정호석)",
    "role": "Dancer, Rapper",
    "birthday": "February 18, 1994",
  },
  "Jimin": {
    "name": "Park Ji Min (박지민)",
    "role": "Dancer, Vocalist",
    "birthday": "October 13, 1995",
  },
  "Jin": {
    "name": "Kim Seok Jin (김석진)",
    "role": "Visual, Vocalist",
    "birthday": "December 4, 1992",
  },
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

function Info(memberName, infoList = btsInfo) {
  let memberInfo = infoList[memberName];
  let div = Div(memberName + "Info", "memberInfo");
  for (let info in memberInfo) {
    let p = Text(info.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1").replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }) + ": " + memberInfo[info], info, memberName + info);
    div.appendChild(p);
  }
  return div;
}

function toggle(member, members, initHeight = (100 / btsMembers.length) + "vh") {
  let hideMember = (member) => {
    member.style.height = initHeight;
    member.style.filter = "grayscale(100%) brightness(50%)";
    document.getElementById(member.id + "Label").style.display = "none";
    document.getElementById(member.id + "Info").style.display = "none";
  }
  for (let i = 0; i < members.length; i++) {
    if (members[i].id !== member.id) {
      hideMember(members[i]);
    }
  }
  if (member.style.height !== "50vh") {
    member.style.height = "50vh";
    member.style.filter = "grayscale(0%) brightness(100%)";
    document.getElementById(member.id + "Label").style.display = "inline";
    document.getElementById(member.id + "Info").style.display = "inline";
  } else {
    hideMember(member);
  }
}

function Profile(memberName = "Jungkook") {
  let div = Div(memberName, "Profile");

  // Profile text
  let label = Text(memberName, "memberLabel", memberName + "Label");
  let info = Info(memberName);
  div.appendChild(label);
  div.appendChild(info);

  // Profile image
  div.style.backgroundImage = "url('./img/" + memberName + ".png')";

  // Open profile
  let showMember = () => {
    toggle(div, document.body.getElementsByClassName("Profile"));
    setTimeout(() => {
      div.scrollIntoView({
        behavior: 'smooth',
        block:  'center',
      });
    }, 100);
  }

  div.addEventListener("click", showMember);

  // Make profiles focusable
  // div.addEventListener("focus", showMember);
  div.tabIndex = 0;

  return div;
}

function Profiles(memberList = btsMembers) {
  let div = Div("BTS", "wrapper");
  for (let i = 0; i < memberList.length; i++) {
    let member = Profile(memberList[i]);
    div.appendChild(member);
  }
  return div;
}