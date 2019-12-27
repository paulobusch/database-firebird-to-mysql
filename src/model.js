class Search {
    constructor(
        cpf_cnpj,
        name,
        birth_date,
        city_name,
        address_name,
        neighborhood_name,
        phone
    ) {
        this.cpf_cnpj = cpf_cnpj;
        this.name = name;
        this.birth_date = birth_date;
        this.city_name = city_name;
        this.address_name = address_name;
        this.neighborhood_name = neighborhood_name;
        this.phone = phone;
    }
}

module.exports = {
    Search
}