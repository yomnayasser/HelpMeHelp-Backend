class OrganizationCriteria {
    meetsCriteria(organizationList)
    {
        throw new Error("Abstract Method has no implementation");
    }
}

class OrganizationType extends OrganizationCriteria{
    meetsCriteria(organizationList)
    {
    }
}

class SubCategory extends OrganizationCriteria{
    meetsCriteria(organizationList)
    {
    }
}

class Category extends OrganizationCriteria{
    meetsCriteria(organizationList)
    {
    }
}

class Rating extends OrganizationCriteria{
    meetsCriteria(organizationList)
    {
    }
}

class Location extends OrganizationCriteria{
    meetsCriteria(organizationList)
    {
    }
}

class AndCriteria extends OrganizationCriteria{
    constructor(locationCriteria,ratingCriteria,categoryCriteria,subCategoryCriteria,typeCriteria) {
        this.locationCriteria = locationCriteria;
        this.ratingCriteria = ratingCriteria;
        this.categoryCriteria = categoryCriteria;
        this.subCategoryCriteria = subCategoryCriteria;
        this.typeCriteria = typeCriteria;
    }

    meetsCriteria(organizationList)
    {
    }
}