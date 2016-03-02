/**
 * Created by janhavi on 3/1/16.
 */
(function() {
    "use strict";
    angular.module("FormBuilderApp")
        .factory("FormService",FormService);

    function FormService() {
        var forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234}]

        var model={ createFormForUser:createFormForUser,
            findAllFormsForUser:findAllFormsForUser,
            deleteFormById:deleteFormById,
            updateFormById:updateFormById
        }
        return model;

        function createFormForUser(userId,form,callback){
            var form = {
                _id:(new Date).getTime(),
                title:form.title,
                userId:userId
            };
            forms.push(form);
            callback(form);
        }

        function findAllFormsForUser(userId,callback){
            var userForms = [];
            for(var u in forms) {
                if (forms[u].userId === userId) {
                    userForms.push(forms[u]);
                    console.log(userForms);
                }
            }
            callback(userForms);
        }

        function deleteFormById(formId,callback){
            for(var u in forms) {
                if (forms[u]._id === formId) {
                    forms.splice(u, 1);
                    break;
                }
            }

            callback(forms);
        }

        function updateFormById(formId, newForm, callback){
            for(var u in forms) {
                if (forms[u]._id === formId) {
                    forms[u].title  = newForm.title;
                    forms[u].userId = newForm.userId;
                    break;
                }
            }
            callback(forms[u]);
        }
    }
})();
