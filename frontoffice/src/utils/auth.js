export const signupObject = (formData) => {
    return {
        name: formData.name,
        surname: formData.surname,
        address: {
            city: formData.city || "Sconosciuto",
            via: formData.via || "Sconosciuto",
            postal_code: Number(formData.cap) || 777
        },
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        birth: formData.birth,
        isVip: formData.abbonamento === "vip"
    }
}

export const loginObject = (formData) => {
    return {
        email: formData.email,
        password: formData.password
    }
}