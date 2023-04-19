import { Express, Request, Response } from 'express';
import { updateMethodDetails } from './services/admin.service';
import { addAdminFormData, addDesignPhaseHandler, addDesignTagHandler, addMethodCategoryHandler, deleteAllTagsHandler, deleteMethodHandler, getDesignTagsHandler, getMethodCategoryHandler, updateDetailsHandler } from './controllers/admin.controller';
import { getMethodDetailsForAdminHandler, getMethodDetailsHandler, getMethodsListHandler, getTagByKeywordHandler, searchtag } from './controllers/methods.controller';
import { addFeedbackToBinHandler, getFeedbacksHandler, sendFeedbackHandler, updateFeedbackStatusHandler, deleteFeedbackHandler, clearBinHandler, resolveFeedbackStatusHandler } from './controllers/feedback.controller';
import { sendQuerryHandler } from './controllers/queries.controller';
import { sendContributionHandler } from './controllers/contribution.controller';
import { registerUser } from './controllers/user.controller';
const fs=require('fs')



function routes(app: Express) {

    // admin routes
    app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

    app.post('/add-design-phase', addDesignPhaseHandler);

    app.post('/add-design-tag', addDesignTagHandler);

    app.get('/get-design-tags', getDesignTagsHandler);

    app.delete('/tags', deleteAllTagsHandler);

    app.post('/method-category', addMethodCategoryHandler);

    app.get('/method-category', getMethodCategoryHandler);

    app.post('/admin', addAdminFormData);

    app.put('/methods/:methodId', updateDetailsHandler);

    app.get('/admin/method/:methodId', getMethodDetailsForAdminHandler)

    app.delete('/method/:methodId', deleteMethodHandler);

    //feedbacks from admin form
    app.get('/feedback', getFeedbacksHandler);
    app.put('/feedback/add-to-bin/:feedbackId', addFeedbackToBinHandler);
    app.put('/feedback/update-status/:feedbackId', updateFeedbackStatusHandler);
    app.put('/feedback/resolve/:feedbackId', resolveFeedbackStatusHandler);
    app.delete('/feedback/delete/:feedbackId', deleteFeedbackHandler);
    app.delete('/feedback/clear-bin', clearBinHandler);
    

    //App API routes
    app.get('/methods', getMethodsListHandler);
    app.get('/method/:methodId', getMethodDetailsHandler);

    //feedbacks from app
    app.post('/feedback', sendFeedbackHandler);

    //Querry from app
    app.post('/communityquery', sendQuerryHandler);
    
    //contribution
    app.post('/communitycontribution', sendContributionHandler);


    //search api
    //app.get('/searchtag',getTagByKeywordHandler);

    app.get('/searchtag',searchtag);

    //user
    app.post('/register',registerUser)

    

}

export default routes;