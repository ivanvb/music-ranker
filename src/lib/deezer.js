export function search(searchTerm) {
    return new Promise((resolve) => {
        window.DZ.api(`search?q=${searchTerm}`, (res) => {
            resolve(res.data);
        });
    });
}

export function searchAlbum(id) {
    return new Promise((resolve) => {
        window.DZ.api(`album/${id}`, (res) => {
            resolve(res.data);
        });
    });
}
