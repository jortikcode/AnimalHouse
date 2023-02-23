// Utility per leggere limit prodotti dal database
export const getShowcaseProducts = async (limit = 5) => {
    const response = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}/products?limit=${limit}`
    );
    const products = await response.json()
    return products
}

// Utility per leggere limit servizi dal database
export const getShowcaseServices = async (limit = 5) => {
    const response = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}/services?limit=${limit}`
    );
    const services = await response.json()
    return services
}