class registerStrategy
{
    register()
    {
        throw new Error("Abstract Method has no implementation");
    }
}
class registerAsUser extends registerStrategy
{
    register()
    {

    }
}
class registerAsOrg extends registerStrategy
{
    register()
    {
        
    }
}