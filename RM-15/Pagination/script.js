// Script content remains the same as in your original code
const apiUrl = 'https://gist.githubusercontent.com/rvsp/add40254aa126f045837fa5b51f47f1f/raw/4d724bfabf4cce7379a386e23bef6576ab99a2f9/pagination.json';
const itemsPerPage = 10;
let currentPage = 1;

const resultsContainer = document.getElementById('results');
const paginationContainer = document.getElementById('pagination');

async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

async function displayData() {
    const jsonData = await fetchData();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = jsonData.slice(startIndex, endIndex);

    resultsContainer.innerHTML = '';

    currentPageData.forEach((item) => {
        const listItem = document.createElement('div');
        listItem.textContent = `${item.id}. ${item.name} - ${item.email}`;
        resultsContainer.appendChild(listItem);
    });
}

async function generatePagination() {
    const jsonData = await fetchData();
    const totalPages = Math.ceil(jsonData.length / itemsPerPage);

    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', () => {
            currentPage = i;
            displayData();
            generatePagination();
        });

        if (i === currentPage) {
            button.classList.add('btn', 'btn-primary', 'active');
            button.disabled = true;
        } else {
            button.classList.add('btn', 'btn-primary');
        }

        paginationContainer.appendChild(button);
    }
}

// Initial display
displayData();
generatePagination();
