// функция возвращает число страниц
export const getPagesCount = (totalPostsCount, postsLimit) => {
    return postsLimit !== 0 && Boolean(totalPostsCount)
        ? Math.ceil(totalPostsCount / postsLimit)
        : 1;
};



// функция для формирования массива страниц для последующей отрисовки кнопок перехода между страницами
// totalPages - общее количество страниц
export const getPagesArray = (totalPages) => {
    let result = [];
    for (let i = 0; i < totalPages; i++) {
        result.push(i + 1);
    }
    return result;
};
