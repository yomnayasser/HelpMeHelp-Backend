class launchingCampaignStrategy
{
    launch()
    {
        throw new Error("Abstract Method has no implementation");
    }
}
class launchDonation extends launchingCampaignStrategy
{
    launch()
    {

    }
}
class launchVolunteer extends launchingCampaignStrategy
{
    launch()
    {
        
    }
}