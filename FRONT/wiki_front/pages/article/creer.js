const CreerArticle = () => {

    return (
        <form action="../../api/article/creer" method="POST">
                <input type="text" name="title" id="title"/><br/>
                <textarea name="content" id="content"/>
                <input type="submit"/>
        </form>
    )
}


export default CreerArticle;
