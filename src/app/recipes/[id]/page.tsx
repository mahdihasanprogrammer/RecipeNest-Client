

const RecipeDetailsPage =async ({params}) => {
    console.log(params)
    const {id} = await params as {id: string};


    return (
        <div>
            this is id {id}
        </div>
    );
};

export default RecipeDetailsPage;