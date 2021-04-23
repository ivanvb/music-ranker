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

export function generateAlbumImage(id, size) {
    return `https://cdns-images.dzcdn.net/images/cover/${id}/${size}x${size}-000000-80-0-0.jpg`;
}
