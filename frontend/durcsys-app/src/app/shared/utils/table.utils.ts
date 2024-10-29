export function getRows() {

    if (window.innerHeight <= 600) {
        return 9;
    }

    if (window.innerHeight <= 768) {
        return 11;
    }

    if (window.innerHeight <= 1024) {
        return 14;
    }

    return 25;
}



export function getRowsPerPageOptions() {
    return [9, 11, 14, 25, 50];
}

export function getRowsProdutos() {

    if (window.innerHeight <= 600) {
        return 4;
    }

    if (window.innerHeight <= 768) {
        return 6;
    }

    if (window.innerHeight <= 1024) {
        return 10;
    }

    if (window.innerHeight <= 1200) {
        return 20;
    }


    return 35;
}

export function getRowsProdutosPerPageOptions() {
    return [4, 6, 10, 15, 20, 35, 50];
}

