export const arrayInObjectSort = (array, key, method = 'asc', type = 'int') => {
    return array.sort((a, b) => {
        if (type === 'date') {
            if (method === 'asc') {
                if (new Date(a[key]) > new Date(b[key])) {
                    return 1;
                }
                if (new Date(a[key]) < new Date(b[key])) {
                    return -1;
                }
            } else {
                if (new Date(a[key]) > new Date(b[key])) {
                    return -1;
                }
                if (new Date(a[key]) < new Date(b[key])) {
                    return 1;
                }
            }
            return 0;
        } else {
            if (method === 'asc') {
                if (a[key] > b[key]) {
                    return 1;
                }
                if (a[key] < b[key]) {
                    return -1;
                }
            } else {
                if (a[key] > b[key]) {
                    return -1;
                }
                if (a[key] < b[key]) {
                    return 1;
                }
            }
            return 0;
        }
    });
};

export const isNumeric = (data) =>{
  return !isNaN(data);
}