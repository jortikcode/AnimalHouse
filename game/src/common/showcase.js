const sortProducts = ["description", "name", "price", "imgName", "category"]
const sortServices = ["description", "serviceName", "price", "imgName"]

// Utility per leggere limit prodotti dal database
export const getShowcaseProducts = async (limit = 5) => {
    const randomSort = Math.floor(Math.random() * sortProducts.length)
    const response = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}/products?limit=${limit}&sort=${sortProducts[randomSort]}`
    );
    const products = await response.json()
    return products
}

// Utility per leggere limit servizi dal database
export const getShowcaseServices = async (limit = 5) => {
    const randomSort = Math.floor(Math.random() * sortServices.length)
    const response = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}/services?limit=${limit}&sort=${sortServices[randomSort]}`
    );
    const services = await response.json()
    return services
}