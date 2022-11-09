const isScroll = (): boolean => {
    console.log(window.innerHeight);
    console.log(document.documentElement.scrollHeight);

    if (document.documentElement.clientHeight > document.documentElement.scrollHeight) {
        return false;
    } else {
        return true;
    }
    
    /*
    if(-[1,]){
        if (document.body.offsetHeight > window.innerHeight) {
            alert("Скролл есть");
            // return true;
        } else {
            alert("Скролла нет");
            // return false;
        }
    
    } else {
        if (document.body.offsetHeight > document.documentElement.clientHeight) {
            alert("Скролл есть");
            // return true;
        } else {
            alert("Скролла нет");
            // return false;
        }
    }
    */
};

export default isScroll;