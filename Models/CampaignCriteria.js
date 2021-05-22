class CampaignCriteria {
    meetsCriteria(organizationList)
    {
        throw new Error("Abstract Method has no implementation");
    }
}

class Address extends CampaignCriteria{
    meetsCriteria(campaign)
    {
    }
}

class Date extends CampaignCriteria{
    meetsCriteria(campaign)
    {
    }
}

class rating extends CampaignCriteria{
    meetsCriteria(campaign)
    {
    }
}
class AndCriteria extends CampaignCriteria{
    constructor(ratingCriteria,addressCriteria,dateCriteria) {
        this.ratingCriteria = ratingCriteria;
        this.addressCriteria = addressCriteria;
        this.dateCriteria = dateCriteria;
    }

    meetsCriteria(campaign)
    {
    }
}