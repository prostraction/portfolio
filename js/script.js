const skills = {
    data: [{
        item: "C++",
        level: 100,
        iconPath: "img/skills/c++.svg",
    },
    {
        item: "Go",
        level: 80,
        iconPath: "img/skills/golang.svg",
    },
    {
        item: "JS",
        level: 50,
        iconPath: "img/skills/javascript.svg",
    },
    {
        item: "HTML",
        level: 100,
        iconPath: "img/skills/html.svg",
    },
    {
        item: "CSS",
        level: 40,
        iconPath: "img/skills/css.svg",
    }],
    generateList: function(parentElement) {
        this.data.forEach(element => {
            const dt = document.createElement('dt');
            dt.classList.add('skill-item');
            dt.textContent = element.item;
            dt.style.backgroundImage = `url(${element.iconPath})`;

            const dd = document.createElement('dd');
            dd.classList.add('skill-level');
            
            const div = document.createElement('div');
            div.style.width = `${element.level}%`;
            div.textContent = `${element.level}%`;

            dd.append(div);
            parentElement.append(dt, dd);
        });
    }
};

skills.generateList(document.querySelector('dl.skill-list'));