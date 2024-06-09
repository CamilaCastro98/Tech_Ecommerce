const formatDate = (date:string) => {
    const formattedDate = new Date(date).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
})
    return formattedDate
}

export default formatDate