class apiService {
    test() {
        console.log('hellow world');
    }

    async forignRecipeSearch(requestParams: any) {
        const response = await fetch('/api/search/recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestParams),
        });

        const recipes: any = await response.json();
        return recipes;
    };

    async forignRandomSearch() {
        const response = await fetch('/api/search/random', {
            method: 'GET',
        });

        const recipes: any = await response.json();
        return recipes;
    };

    async forignInformationSearch(id: number) {
        const response = await fetch('/api/search/information', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id:id }),
        });

        const information: any = await response.json();
        return information;
    };
}

export default new apiService();