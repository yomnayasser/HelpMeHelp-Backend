const campaign = require("./campaign");

class donationCampaign extends campaign{
    constructor(donationType,target,progress){
        this.donationType=donationType;
        this.target=target;
        this.progress=progress;
    }
    incrementProgress(double);
}