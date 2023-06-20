// Блок со скиллами: .skill-list
const skills = {
    data: [],
    isSorted: false,
    isInErrorState: false,
    jsonPath: '',
    skillListSelector: null,
    sectionSkillsSelector: null,
    initList: function(jsonPath, skillListSelector, sectionSkillsSelector) {
        this.jsonPath = jsonPath;
        this.skillListSelector = skillListSelector;
        this.sectionSkillsSelector = sectionSkillsSelector;
        fetch(jsonPath)
            .then(data => data.json())
            .then(object => {
                if (this.isInErrorState) {
                    this.isInErrorState = false;
                    this.renderErrorToggle(skillListSelector, sectionSkillsSelector);
                    window.removeEventListener('resize', eventSkillListFailedListener);
                }
                this.data = object;
                this.generateList(skillListSelector);
            })
            .catch(() => {
                // Фейковые данные, для отображения при ошибке
                skills.data =  [
                    {"item": "Sample","level": 90, "iconPath": "img/skills/vue.svg"},
                    {"item": "Sample","level": 80, "iconPath": "img/skills/php.svg"},
                    {"item": "Sample","level": 70, "iconPath": "img/skills/nodejs.svg"},
                    {"item": "Sample","level": 60, "iconPath": "img/skills/1c.svg"},
                    {"item": "Sample","level": 50, "iconPath": "img/skills/python.svg"}]
                this.generateList(skillListSelector);
                this.isInErrorState = true;
                this.renderErrorToggle(skillListSelector, sectionSkillsSelector);
                window.addEventListener('resize', eventSkillListFailedListener);
            });
    },

    renderErrorToggle: function(skillListSelector, sectionSkillsSelector) {
        // Сообщение с ошибкой
        errorMsg = document.querySelector('#createdErrorMessage');
        // Если нет ошибки получения данных:
        if (!this.isInErrorState) {
            // Удаляем прошлое сообщение об ошибке
            if (errorMsg !== null) {
                errorMsg.remove();
            }
            // Старое сообщение уже удалено, достаточно просто убрать блюр
            skillListSelector.style.webkitFilter = '';
            // На этом этапе страница в нормальном состоянии
            return;
        }

        // Задний фон для "скиллов"
        skillListSelector.style.webkitFilter = 'blur(10px)';
        skillListSelector.style.zIndex = 0;

        // Создаем сообщение об ошибке, если его нет
        if (errorMsg === null) {
            errorMsg = document.createElement('div');
            errorMsg.textContent = 'При загрузке данных произошла ошибка.';
            errorMsg.style.zIndex = 1;
            errorMsg.style.border = '3px solid var(--green)';
            errorMsg.style.padding = '25px';
            errorMsg.style.position = 'absolute';
            errorMsg.style.backgroundColor = 'var(--white)';
            errorMsg.style.display = 'grid';
            errorMsg.style.gap = '10px';
            errorMsg.style.borderRadius = '10px';
            // Кнопка в сообщении
            errorBtn = document.createElement('button');
            errorBtn.innerHTML = 'Попробовать еще раз';
            errorMsg.appendChild(errorBtn);
            errorMsg.id = 'createdErrorMessage';
            // Для кнопки добавить ивент для повторной попытки
            errorBtn.addEventListener('click', () => {
                console.log('clicked')
                // Разумеется, при текущих условиях мы не выйдем из ошибки (другого пути json файла не будет)
                this.initList(this.jsonPath, this.skillListSelector, this.sectionSkillsSelector);
                // Можно проверить по валидному файлу :)
                //this.initList('db/skills.json', this.skillListSelector, this.sectionSkillsSelector);
            })
            // Вставить сообщение об ошибке в центр "скиллов"
            sectionSkillsSelector.insertBefore(errorMsg, skillListSelector);
        }
        
        // Темная тема для сообщения (всега проверяем ее верстку)
        const darkTheme = localStorage.getItem('dark-theme-disabled');
        if (darkTheme === null || darkTheme === "true") {
            errorMsg.classList.add('dark-theme');
        } else {
            errorMsg.classList.remove('dark-theme');
        }

        // Получить актуальные размеры
        const rect = skillListSelector.getBoundingClientRect();
        const browserWidth = Math.max(
            document.body.scrollWidth,
            document.documentElement.scrollWidth,
            document.body.offsetWidth,
            document.documentElement.offsetWidth,
            document.documentElement.clientWidth
        );

        errorMsg.style.top = window.scrollY + rect.top + (rect.height / 2) - errorMsg.getBoundingClientRect().height / 2 + 'px';
        errorMsg.style.left = (browserWidth / 2 - errorMsg.getBoundingClientRect().width / 2) + 'px';

    },
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
            this.isSorted = sortingType;
        } else {
            this.data.reverse();
        }
        this.generateList(skillListSelector);
    },
};

// К сожалению, вот так
const eventSkillListFailedListener = function (e) {
    skills.renderErrorToggle(skills.skillListSelector, skills.sectionSkillsSelector);
};

// Меню навигации: .main-header
const menu = {
    open: function() {
        nav.classList.remove('main-nav_closed');
        btn.classList.add('nav-btn_close');
        btn.classList.remove('nav-btn_open');
        btn.innerHTML = '<span class="visually-hidden">Закрыть меню</span>';
    },
    close: function() {
        nav.classList.add('main-nav_closed');
        btn.classList.remove('nav-btn_close');
        btn.classList.add('nav-btn_open');
        btn.innerHTML = '<span class="visually-hidden">Открыть меню</span>';
    },
};

// Первое создание списка навыков
const skillListSelector = document.querySelector('dl.skill-list');
const sectionSkillsSelector = document.querySelector('section.skills');
skills.initList('db/skills.json', skillListSelector, sectionSkillsSelector);

// Сортировки списка по кнопкам
const sortBtnsBlock = document.querySelector('.skills-buttons div');
sortBtnsBlock.addEventListener('click', (e) => {
    if (e.target.nodeName === "BUTTON") {
        skills.sortList(e.target.dataset.type);
    }
});

// Показ и скрытие меню (гамбургер)
const nav = document.querySelector('.main-nav');
const btn = document.querySelector('.nav-btn');
btn.addEventListener('click', (e) => {
    e.target.classList.contains('nav-btn_open') ? menu.open() : menu.close();
});
menu.close();

// Чекбокс темной темы
const changeToDarkTheme = (theme) => {
    theme
      ? document.body.classList.add('dark-theme')
      : document.body.classList.remove('dark-theme');
    localStorage.setItem('dark-theme-enabled', theme);
}
const checkbox = document.querySelector(".switch-checkbox");
checkbox.addEventListener("change", (e) => {
    changeToDarkTheme(!checkbox.checked);
    if (skills.isInErrorState) {
        skills.renderErrorToggle(skills.skillListSelector, skills.sectionSkillsSelector);
    }
});
// Загрузка сохраненной темы
const darkThemeOnLoad = localStorage.getItem('dark-theme-enabled');
if (darkThemeOnLoad === null) {
    changeToDarkTheme(true);
    checkbox.checked = false;
} else {
    changeToDarkTheme(darkThemeOnLoad === "true");
    checkbox.checked = (darkThemeOnLoad !== "true");
}