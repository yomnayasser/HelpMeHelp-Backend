const campaign = require("./campaign");

class volunteerCampaign extends campaign{
    constructor(target,progress,quizLink,applicantsID,joinedApplicantsID){
        this.target=target;
        this.progress=progress;
        this.quizLink=quizLink;
        this.applicantsID=applicantsID; 
        this.joinedApplicantsID=joinedApplicantsID;
    };
    incrementProgress();
    approveApplicant(string);
    addQuiz();
}