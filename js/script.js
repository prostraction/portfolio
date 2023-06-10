const skills = {
    data: [{
        item: 'C++',
        level: 90,
        iconPath: "img/skills/c++.svg",
    },
    {
        item: 'Go',
        level: 80,
        iconPath: "img/skills/golang.svg",
    },
    {
        item: 'JS',
        level: 50,
        iconPath: "img/skills/javascript.svg",
    },
    {
        item: 'HTML',
        level: 100,
        iconPath: "img/skills/html.svg",
    },
    {
        item: 'CSS',
        level: 40,
        iconPath: "img/skills/css.svg",
    }],
    isSorted: false,
    generateList: function(parentElement) {
        parentElement.innerHTML = '';
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
    },
    sortList: function(sortingType) {
        if (skills.isSorted !== sortingType) {
            switch (sortingType) {
                case 'name':
                    this.data.sort((a, b) => a.item.localeCompare(b.item)); break;
                case 'level':
                    this.data.sort((a, b) => b.level - a.level); break;
                default:
                    return;
            }
            console.log(`отсортировано по ${sortingType}`);
            this.isSorted = sortingType;
        } else {
            this.data.reverse();
            console.log('инвертирован порядок сортировки');
        }
        this.generateList(document.querySelector('dl.skill-list'));
    },
};

// Первое создание списка навыков
skills.generateList(document.querySelector('dl.skill-list'));

// Bind сортировки списка по кнопкам
sortBtnsBlock = document.querySelector('.skills-buttons');
sortBtnsBlock.addEventListener('click', (e) => {
    if (e.target.nodeName === "BUTTON") {
        skills.sortList(e.target.dataset.type);
    }
})