module.exports=class serverError extends Error{
    constructor(status=404,messagse){
        super();
        this.status=status;
        this.message=messagse;
    }
}