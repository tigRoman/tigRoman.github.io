function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {

    //tabs

    const tabs = document.querySelectorAll(tabsSelector),
            tabsContent = document.querySelectorAll(tabsContentSelector),
            tabsParent = document.querySelector(tabsParentSelector);

    function hideTabsContent() {

    tabsContent.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
    });

    tabs.forEach(tab => {
      tab.classList.remove(activeClass);

    });

    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    } 

    hideTabsContent();
    showTabContent();
            
    tabsParent.addEventListener('click', (e) => {
        const target = e.target;//если часто испольуется target
        //console.log(target);

        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target === item) {
                    hideTabsContent();
                    showTabContent(i);
                }
                console.log(item);
            });
        }
        
    });
    }

    export default tabs;