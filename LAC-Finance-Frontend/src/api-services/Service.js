const baseUrl = 'http://localhost:5000';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjEsIlVzZXJOYW1lIjoiYWJoaWppdC5kQHZlYXJjLmNvbSIsIlBhc3N3b3JkIjoiYWJoaWppdCMyMDIzIiwiRmlyc3ROYW1lIjoiQWJoaWppdCIsIkxhc3ROYW1lIjoiRGhhcmFuZ3V0dGUiLCJFbWFpbElkIjoiYWJoaWppdC5kQHZlYXJjLmNvbSIsIkFjdGl2ZSI6dHJ1ZSwiRGF0ZU1vZGlmaWVkIjoiMjAyMy0wMS0xMFQxNjowNTozNS40OTBaIiwiaWF0IjoxNjczNDE1MTc1LCJleHAiOjE2NzM0MTYwNzV9.o5ZOuxj2Ec_ah2ZhZSbN7Z4U-IEY86Pptap6fD7w4GQ';

export async function get(url) {
    try {
        const response = await fetch(baseUrl + url, {
            method: 'GET',
            headers: {'Authorization': `Bearer ${token}`}
        });
        return await response.json();
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function searchById(url, id) {
    try {
        const response = await fetch(baseUrl + url + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function create(url, data) {
    try {
        const response = await fetch(baseUrl + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function update(url, data, id) {
    try {
        const response = await fetch(baseUrl + url + '/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function remove(url, id) {
    try {
        const response = await fetch(baseUrl + url + '/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (error) {
        console.log(error);
        return [];
    }
}