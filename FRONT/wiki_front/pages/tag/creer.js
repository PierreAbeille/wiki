const CreerTag = () => {

    return (
        <form action="../api/tag/creer" method="POST">
            <input type="text" name="name" id="name"/>
            <input type="submit"/>
        </form>
    )
}

export default CreerTag;