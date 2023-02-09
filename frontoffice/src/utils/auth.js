export const signupObject = (formData) => {
    return {
        name: formData.name,
        surname: formData.surname,
        address: {
            city: formData.city,
            via: formData.address,
            postal_code: formData.cap
        },
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        birth: formData.birth
    }
}

export const loginObject = (formData) => {
    return {
        email: formData.email,
        password: formData.password
    }
}