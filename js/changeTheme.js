const changeTheme = () => {
    const page = document.querySelector('body');
    const listAboutNavA = document.querySelectorAll('.main-nav a');
    const listContact = document.querySelectorAll('.contact-link');
    const listSkill = document.querySelectorAll('.skill-level');
    page.classList.toggle('dark-theme-body');
    listContact.forEach(el => el.classList.toggle('dark-theme-contact-link'));
    listSkill.forEach(el => el.classList.toggle('dark-theme-skill-level'));
    listAboutNavA.forEach(el => el.classList.toggle('dark-theme-nav-a'));
}