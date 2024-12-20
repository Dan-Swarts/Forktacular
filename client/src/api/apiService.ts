import { authService } from "./authentication";

class apiService {

    async forignRecipeSearch(requestParams: any) {

        const jwtToken = authService.getToken();

        const response = await fetch('/api/search/recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            body: JSON.stringify(requestParams),
        });

        const recipes: any = await response.json();
        return recipes;
    };

    async forignRandomSearch() {

        const response = await fetch('/open/random');

        const recipes: any = await response.json();
        return recipes;
    };

    async forignInformationSearch(id: number) {
        const response = await fetch(`/open/information/${id}`);
        const information: any = await response.json();
        return information;
    };

    async getAccountInformation() {
        const jwtToken = authService.getToken();
        const response = await fetch('/api/users/account', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            },
        });

        const information: any = await response.json();
        return information;
    };

    async setAccountInformation(requestParams:any) {
        const jwtToken = authService.getToken();
        const response = await fetch('/api/users/account', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            body: JSON.stringify(requestParams),
        });

        const information: any = await response.json();
        return information;
    };
}

export default new apiService();