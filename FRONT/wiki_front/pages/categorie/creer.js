const CreerCategorie = () => {

    return (
        <form action="../api/categorie/creer" method="POST">
            <input type="text" name="name" id="name"/>
            <input type="submit"/>
        </form>
    )
}

export default CreerCategorie;